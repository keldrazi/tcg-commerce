import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportJobCard } from 'src/typeorm/entities/tcgcommerce/modules/import/job/card/import.job.card.entity';
import { ImportJobCardDTO, CreateImportJobCardDTO } from './dto/import.job.card.dto';
import { IMPORT_JOB_CARD_STATUS, IMPORT_SORT_CARD_TYPE_NAME, IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH } from 'src/system/constants/tcgcommerce/import/job/card/tcgcommerce.import.job.card.constants';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';
import { ImportProcessService } from 'src/tcgcommerce/modules/import/process/card/import.process.card.service';
import { OnEvent } from '@nestjs/event-emitter';
import { ImportSortCardDTO } from 'src/tcgcommerce/modules/import/sort/card/data/dto/import.sort.card.data.dto';

@Injectable()
export class ImportJobCardService {

    constructor(
        @InjectRepository(ImportJobCard) private importJobCardRepository: Repository<ImportJobCard>,
        private awsS3Service: AwsS3Service,
        private importProcessService: ImportProcessService
    ) { }

    async getImportJobCardsByCommerceAccountId(commerceAccountId: string, productLineId: string) {

        let importJobCards = await this.importJobCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineId: productLineId
            }
        });

        if(importJobCards == null) {
            return [];
        }

        let importJobCardDTOs: ImportJobCardDTO[] = [];

        for(let i = 0; i < importJobCards.length; i++) {
            let importJobCard = importJobCards[i];
            //MAP TO DTO;
            let importJobCardDTO: ImportJobCardDTO = ({ ...importJobCard });

            importJobCardDTOs.push(importJobCardDTO);
        }

        return importJobCardDTOs;
    }

    async getImportJobCardByImportJobCardId(importJobCardId: string) {
        let importJobCard = await this.importJobCardRepository.findOne({
            where: {
                importJobCardId: importJobCardId
            }
        });

        
        if(importJobCard == null) {
            return undefined;
        }

        //MAP TO DTO;
        let importJobCardDTO: ImportJobCardDTO = ({ ...importJobCard });
        
        return importJobCardDTO;
            
    }

    async getImportJobCardByOriginaFileName(commerceAccountId: string, importJobCardInputFileOriginalName: string) {
        return await this.importJobCardRepository.findOne({
            where: { 
                commerceAccountId: commerceAccountId,
                importJobCardInputFileOriginalName: importJobCardInputFileOriginalName }
        });
    }


    async createImportJob(importJobCardFile: Express.Multer.File, createImportJobCardDTO: CreateImportJobCardDTO) {

        //CHECK TO SEE IF A FILE WITH THE SAME NAME EXISTS;
        let existingImportJobCard = await this.getImportJobCardByOriginaFileName(createImportJobCardDTO.commerceAccountId, importJobCardFile.originalname);

        if(existingImportJobCard != null) {
            //HANDLE EXISTING FILE WITH THE SAME NAME;
            return null; //TO DO: RETURN AN ERROR;
        }

        let importJobCardCode= await this.createImportJobCardCode(createImportJobCardDTO.productLineCode, createImportJobCardDTO.importSortCardTypeName, createImportJobCardDTO.commerceLocationName);

        //UPLOAD THE FILE TO S3
        let importJobCardInputFileURL = await this.uploadImportJobCardFile(createImportJobCardDTO.commerceAccountId, importJobCardFile, importJobCardCode, createImportJobCardDTO.importSortCardTypeName);

        let importJobCard = this.importJobCardRepository.create({ ...createImportJobCardDTO });
        importJobCard.importJobCardCode = importJobCardCode;
        importJobCard.importJobCardStatus = IMPORT_JOB_CARD_STATUS.PROCESSING;
        importJobCard.importJobCardInputFileURL = importJobCardInputFileURL;
        importJobCard.importJobCardInputFileOriginalName = importJobCardFile.originalname;
        importJobCard.importJobCardDate = new Date();
        importJobCard.importJobCardSortData = JSON.stringify({}); //INITIALIZE SORT DATA AS EMPTY;
        importJobCard.importJobCardMetadata = JSON.stringify(createImportJobCardDTO.importJobCardMetadata); //INITIALIZE METADATA AS EMPTY;
        importJobCard = await this.importJobCardRepository.save(importJobCard);

        let importJobCardDTO = await this.getImportJobCardByImportJobCardId(importJobCard.importJobCardId);
        
        if(importJobCardDTO == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return null; //RETURN AN ERROR;
        }

        this.importProcessService.processImport(importJobCardDTO, importJobCardFile)

        return importJobCardDTO;

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

    async createImportJobCardCode(productLineCode: string, importSortCardTypeName: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let importJobCode = productLineCode.toUpperCase() + '-' + importSortCardTypeName.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return importJobCode;
    }

    async uploadImportJobCardFile(commerceAccountId: string, importJobCardFile: Express.Multer.File, importJobCardCode: string, importSortCardTypeName: string) {

        let importJobCardFileBuffer = importJobCardFile.buffer;
        let importJobCardBucketPath = '';
        let importJobCardFileURL = '';

        switch(importSortCardTypeName) {
            case IMPORT_SORT_CARD_TYPE_NAME.TCG_PLAYER:
                importJobCardBucketPath = commerceAccountId + '/' + IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH.TCG_PLAYER;
                importJobCardFileURL = await this.awsS3Service.uploadPDF(importJobCardFileBuffer, importJobCardBucketPath, importJobCardCode);
                break;
            case IMPORT_SORT_CARD_TYPE_NAME.ROCA:
                importJobCardBucketPath = commerceAccountId + '/' + IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH.ROCA;
                importJobCardFileURL = await this.awsS3Service.uploadCSV(importJobCardFileBuffer, importJobCardBucketPath, importJobCardCode);
                break;
            case IMPORT_SORT_CARD_TYPE_NAME.PHYZBATCH:
                importJobCardBucketPath = commerceAccountId + '/' + IMPORT_JOB_CARD_UPLOAD_FILE_BUCKET_PATH.PHYZBATCH;
                importJobCardFileURL = await this.awsS3Service.uploadCSV(importJobCardFileBuffer, importJobCardBucketPath, importJobCardCode);
                break;
        }

        return importJobCardFileURL;
        
    }


    async updateImportJobCardStatus(importJobCardId: string, importJobCardStatus: string) {
        let importJobCard = await this.getImportJobCardByImportJobCardId(importJobCardId);

        if(importJobCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        importJobCard.importJobCardStatus = importJobCardStatus;
        importJobCard.importJobCardUpdateDate = new Date();

        await this.importJobCardRepository.save(importJobCard);

        return true;
    }

    async updateImportJobSortData(importJobId: string, importSortCardDTO: ImportSortCardDTO) {
        let importJobCard = await this.getImportJobCardByImportJobCardId(importJobId);

        if(importJobCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        importJobCard.importJobCardSortData = JSON.stringify(importSortCardDTO);
        importJobCard.importJobCardUpdateDate = new Date();

        await this.importJobCardRepository.save(importJobCard);

        return true;
    }



    /* EVENT LISTENERS */
    @OnEvent('import.job.card.update.status')
    async handleImportJobCardStatusEvent(payload: any) {

        let importJobCardCode = payload.importJobCardCode;
        let importJobCardStatus = payload.importJobCardStatus;

        await this.updateImportJobCardStatus(importJobCardCode, importJobCardStatus);

    }

    @OnEvent('import.job.card.update.sort.data')
    async handleImportJobCardSortDataEvent(payload: any) {

        let importJobCardId = payload.importJobCardId;
        let importSortCardDTO = payload.importSortCardDTO;

        await this.updateImportJobSortData(importJobCardId, importSortCardDTO);

    }

}