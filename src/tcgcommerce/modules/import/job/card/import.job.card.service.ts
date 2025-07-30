import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportJob } from 'src/typeorm/entities/tcgcommerce/modules/import/job/import.job.entity';
import { ImportJobDTO, CreateImportJobDTO, UpdateImportJobDTO } from './card/dto/import.job.dto';
import { IMPORT_JOB_STATUS, IMPORT_SORT_TYPE_NAME, IMPORT_JOB_UPLOAD_FILE_BUCKET_PATH } from 'src/system/constants/tcgcommerce/import/constants.tcgcommerce.import';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';
import { ImportProcessService } from 'src/tcgcommerce/modules/import/process/card/import.process.card.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ImportSortDTO } from 'src/tcgcommerce/modules/import/sort/card/data/dto/import.sort.card.data.dto';

@Injectable()
export class ImportJobService {

    constructor(
        @InjectRepository(ImportJob) private importJobRepository: Repository<ImportJob>,
        private awsS3Service: AwsS3Service,
        private importProcessService: ImportProcessService
    ) { }

    async getImportJobsByCommerceAccountId(commerceAccountId: string) {

        let importJobs = await this.importJobRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });

        if(importJobs == null) {
            return [];
        }

        let importJobDTOs: ImportJobDTO[] = [];

        for(let i = 0; i < importJobs.length; i++) {
            let importJob = importJobs[i];
            //MAP TO DTO;
            let importJobDTO: ImportJobDTO = ({ ...importJob});
            
            importJobDTOs.push(importJobDTO);
        }

        return importJobDTOs;
    }

    async getImportJobByImportJobId(importJobId: string) {
        let importJob = await this.importJobRepository.findOne({
            where: {
                importJobId: importJobId
            }
        });

        
        if(importJob == null) {
            return undefined;
        }

        //MAP TO DTO;
        let importJobDTO: ImportJobDTO = ({ ...importJob});
        
        return importJobDTO;
            
    }

    async getImportJobByImportJobCode(importJobCode: string) {
        let importJob = await this.importJobRepository.findOne({
            where: {
                importJobCode: importJobCode
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importJob == null) {
            return undefined;
        }

        //MAP TO DTO;
        let importJobDTO: ImportJobDTO = ({ ...importJob});

        return importJobDTO;
            
    }

    async getImportJobByOriginaFileName(commerceAccountId: string, importJobInputFileOriginalName: string) {
        return await this.importJobRepository.findOne({
            where: { 
                commerceAccountId: commerceAccountId,
                importJobInputFileOriginalName: importJobInputFileOriginalName }
        });
    }


    async createImportJob(importJobFile: Express.Multer.File, createImportJobDTO: CreateImportJobDTO) {

        //CHECK TO SEE IF A FILE WITH THE SAME NAME EXISTS;
        let existingImportJob = await this.getImportJobByOriginaFileName(createImportJobDTO.commerceAccountId, importJobFile.originalname);
        
        if(existingImportJob != null) {
            //HANDLE EXISTING FILE WITH THE SAME NAME;
            return null; //TO DO: RETURN AN ERROR;
        }

        let importJobCode = await this.createImportJobCode(createImportJobDTO.productLineAbbreviation, createImportJobDTO.importSortTypeName, createImportJobDTO.commerceLocationName);
        
        //UPLOAD THE FILE TO S3
        let importJobInputFileURL = await this.uploadImportJobFile(createImportJobDTO.commerceAccountId, importJobFile, importJobCode, createImportJobDTO.importSortTypeName);

        let newImportJob = this.importJobRepository.create({ ...createImportJobDTO });
        newImportJob.importJobCode = importJobCode;
        newImportJob.importJobStatus = IMPORT_JOB_STATUS.PROCESSING;
        newImportJob.importJobInputFileURL = importJobInputFileURL;
        newImportJob.importJobInputFileOriginalName = importJobFile.originalname;
        newImportJob.importJobDate = new Date();
        newImportJob.importJobSortData = JSON.stringify({}); //INITIALIZE SORT DATA AS EMPTY;
        newImportJob.importJobMetadata = JSON.stringify(createImportJobDTO.importJobMetadata); //INITIALIZE METADATA AS EMPTY;
        newImportJob = await this.importJobRepository.save(newImportJob);

        let importJobDTO = await this.getImportJobByImportJobId(newImportJob.importJobId);
        
        if(importJobDTO == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return null; //RETURN AN ERROR;
        }

        this.importProcessService.processImport(importJobDTO, importJobFile)

        return importJobDTO;
        
    }

    /*
    async updateImportJob(updateImportJobDTO: UpdateImportJobDTO) {

        //CHECK TO SEE IF THE IMPORT JOB EXISTS;
        let importJob = await this.importJobRepository.findOne({
            where: {
                importJobId: updateImportJobDTO.importJobId
            }
        });

        //TO DO: RETURN AN ERROR FOR NON EXISTENT IMPORT JOB;
        if(importJob == null) {
            return null;
        }

        importJob.importJobStatus = updateImportJobDTO.importJobStatus;

        importJob = await this.importJobRepository.save(importJob);

        let importJobDTO = this.getImportJobByImportJobId(importJob.importJobId);

        return importJobDTO;
    }
    */

    async createImportJobCode(productLineAbbreviation: string, importSortTypeName: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');
        
        let importJobCode = productLineAbbreviation.toUpperCase() + '-' + importSortTypeName.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return importJobCode;
    }

    async uploadImportJobFile(commerceAccountId: string, importJobFile: Express.Multer.File, importJobCode: string, importSortTypeName: string) {

        let importJobFileBuffer = importJobFile.buffer;
        let importJobBucketPath = '';
        let importJobFileURL = '';

        switch(importSortTypeName) {
            case IMPORT_SORT_TYPE_NAME.TCG_PLAYER:
                importJobBucketPath = commerceAccountId + '/' + IMPORT_JOB_UPLOAD_FILE_BUCKET_PATH.TCG_PLAYER;
                importJobFileURL = await this.awsS3Service.uploadPDF(importJobFileBuffer, importJobBucketPath, importJobCode);
                break;
            case IMPORT_SORT_TYPE_NAME.ROCA:
                importJobBucketPath = commerceAccountId + '/' + IMPORT_JOB_UPLOAD_FILE_BUCKET_PATH.ROCA;
                importJobFileURL = await this.awsS3Service.uploadCSV(importJobFileBuffer, importJobBucketPath, importJobCode);
                break;
            case IMPORT_SORT_TYPE_NAME.PHYZBATCH:
                importJobBucketPath = commerceAccountId + '/' + IMPORT_JOB_UPLOAD_FILE_BUCKET_PATH.PHYZBATCH;
                importJobFileURL = await this.awsS3Service.uploadCSV(importJobFileBuffer, importJobBucketPath, importJobCode);
                break;
        }

        return importJobFileURL;
        
    }


    async updateImportJobStatus(importJobId: string, importJobStatus: string) {
        let importJob = await this.getImportJobByImportJobId(importJobId);
        
        if(importJob == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        importJob.importJobStatus = importJobStatus;
        importJob.importJobUpdateDate = new Date();

        await this.importJobRepository.save(importJob);

        return true;
    }

    async updateImportJobSortData(importJobId: string, importSortDTO: ImportSortDTO) {
        let importJob = await this.getImportJobByImportJobId(importJobId);
        
        if(importJob == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        importJob.importJobSortData = JSON.stringify(importSortDTO);
        importJob.importJobUpdateDate = new Date();

        await this.importJobRepository.save(importJob);

        return true;
    }



    /* EVENT LISTENERS */
    @OnEvent('import.job.update.status')
    async handleImportJobStatusEvent(payload: any) {

        let importJobCode = payload.importJobCode;
        let importJobStatus = payload.importJobStatus;

        await this.updateImportJobStatus(importJobCode, importJobStatus);

    }

    @OnEvent('import.job.update.sort.data')
    async handleImportJobSortDataEvent(payload: any) {

        let importJobId = payload.importJobId;
        let importSortDTO = payload.importSortDTO;

        await this.updateImportJobSortData(importJobId, importSortDTO);

    }

}