import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportJob } from 'src/typeorm/entities/tcgcommerce/modules/import/job/import.job.entity';
import { ImportJobDTO, CreateImportJobDTO, UpdateImportJobDTO } from './dto/import.job.dto';
import { get } from 'axios';

@Injectable()
export class ImportJobService {

    constructor(
        @InjectRepository(ImportJob) private importJobRepository: Repository<ImportJob>,
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
            let importJobDTO = new ImportJobDTO();
            importJobDTO.importJobId = importJob.importJobId;
            importJobDTO.commerceAccountId = importJob.commerceAccountId;
            importJobDTO.importJobType = importJob.importJobType;
            importJobDTO.importJobStatus = importJob.importJobStatus;
            importJobDTO.importJobCode = importJob.importJobCode;
            importJobDTO.importJobSortType = importJob.importJobSortType;
            importJobDTO.importJobInputFileName = importJob.importJobInputFileName;
            importJobDTO.importJobInputFileOriginalName = importJob.importJobInputFileOriginalName;
            importJobDTO.importJobOutputFileName = importJob.importJobOutputFileName;
            importJobDTO.importJobMetadata = importJob.importJobMetadata;
            importJobDTO.importJobIsPublished = importJob.importJobIsPublished;
            
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

        //TO DO: CREATE AN ERROR TO RETURN;
        if(importJob == null) {
            return null;
        }

        let importJobDTO = new ImportJobDTO();
        importJobDTO.importJobId = importJob.importJobId;
        importJobDTO.commerceAccountId = importJob.commerceAccountId;
        importJobDTO.importJobType = importJob.importJobType;
        importJobDTO.importJobStatus = importJob.importJobStatus;
        importJobDTO.importJobCode = importJob.importJobCode;
        importJobDTO.importJobSortType = importJob.importJobSortType;
        importJobDTO.importJobInputFileName = importJob.importJobInputFileName;
        importJobDTO.importJobInputFileOriginalName = importJob.importJobInputFileOriginalName;
        importJobDTO.importJobOutputFileName = importJob.importJobOutputFileName;
        importJobDTO.importJobMetadata = importJob.importJobMetadata;
        importJobDTO.importJobIsPublished = importJob.importJobIsPublished;

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
            return null;
        }

        let importJobDTO = new ImportJobDTO();
        importJobDTO.importJobId = importJob.importJobId;
        importJobDTO.commerceAccountId = importJob.commerceAccountId;
        importJobDTO.importJobType = importJob.importJobType;
        importJobDTO.importJobStatus = importJob.importJobStatus;
        importJobDTO.importJobCode = importJob.importJobCode;
        importJobDTO.importJobSortType = importJob.importJobSortType;
        importJobDTO.importJobInputFileName = importJob.importJobInputFileName;
        importJobDTO.importJobInputFileOriginalName = importJob.importJobInputFileOriginalName;
        importJobDTO.importJobOutputFileName = importJob.importJobOutputFileName;
        importJobDTO.importJobMetadata = importJob.importJobMetadata;
        importJobDTO.importJobIsPublished = importJob.importJobIsPublished;

        return importJobDTO;
            
    }

    async createImportJob(createImportJobDTO: CreateImportJobDTO) {
        
        //CHECK TO SEE IF THE IMPORT JOB EXISTS;
        let importJob = await this.getImportJobByImportJobCode(createImportJobDTO.importJobCode);
                
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (importJob != null) {
            return null;
        }
        
        let newImportJob = this.importJobRepository.create({ ...createImportJobDTO });
        newImportJob = await this.importJobRepository.save(newImportJob);

        let importJobDTO = new ImportJobDTO();
        importJobDTO.importJobId = newImportJob.importJobId;
        importJobDTO.commerceAccountId = newImportJob.commerceAccountId;
        importJobDTO.importJobType = newImportJob.importJobType;
        importJobDTO.importJobStatus = newImportJob.importJobStatus;
        importJobDTO.importJobCode = newImportJob.importJobCode;
        importJobDTO.importJobSortType = newImportJob.importJobSortType;
        importJobDTO.importJobInputFileName = newImportJob.importJobInputFileName;
        importJobDTO.importJobInputFileOriginalName = newImportJob.importJobInputFileOriginalName;
        importJobDTO.importJobOutputFileName = newImportJob.importJobOutputFileName;
        importJobDTO.importJobMetadata = newImportJob.importJobMetadata;
        importJobDTO.importJobIsPublished = newImportJob.importJobIsPublished;

        return importJobDTO;
        
    }

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
        importJob.importJobOutputFileName = updateImportJobDTO.importJobOutputFileName;
        importJob.importJobMetadata = updateImportJobDTO.importJobMetadata;

        importJob = await this.importJobRepository.save(importJob);

        let importJobDTO = this.getImportJobByImportJobId(importJob.importJobId);

        return importJobDTO;
    }
    
}