import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardServiceImportJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/inventory.product.card.service.import.job.entity';
import { CreateInventoryProductCardServiceImportJobDTO, InventoryProductCardServiceImportJobDTO } from './dto/inventory.product.card.service.import.job.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS, INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NAME } from 'src/system/constants/tcgcommerce/inventory/product/card/service/import/job/inventory.product.card.service.import.job.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { InventoryProductCardServiceImportJobItemService } from 'src/tcgcommerce/modules/inventory/product/card/service/import/job/item/inventory.product.card.service.import.job.item.service';
import { AwsS3Service } from 'src/system/modules/aws/s3/aws.s3.service';
import { InventoryProductCardServiceImportJobProviderTypeService } from './provider/type/inventory.product.card.service.import.job.provider.type.service';
import { InventoryProductCardServiceImportJobProviderTypeDTO } from './provider/type/dto/inventory.product.card.service.import.job.provider.type.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class InventoryProductCardServiceImportJobService {

    constructor(
        @InjectRepository(InventoryProductCardServiceImportJob) private inventoryProductCardServiceImportJobRepository: Repository<InventoryProductCardServiceImportJob>,
        private inventoryProductCardServiceImportJobItemService: InventoryProductCardServiceImportJobItemService,
        private awsS3Service: AwsS3Service,
        private inventoryProductCardServiceImportJobProviderTypeService: InventoryProductCardServiceImportJobProviderTypeService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId: string) {
            let inventoryProductCardServiceImportJob = await this.inventoryProductCardServiceImportJobRepository.findOne({
                where: {
                    inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId
                }
            });
    
            if(inventoryProductCardServiceImportJob == null) {
               return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
            }
    
            //MAP TO DTO;
            let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob });

            return inventoryProductCardServiceImportJobDTO;

        }

    async getInventoryProductCardServiceImportJobsByCommerceAccountId(commerceAccountId: string) {
    
            let inventoryProductCardServiceImportJobs = await this.inventoryProductCardServiceImportJobRepository.find({
                where: {
                    commerceAccountId: commerceAccountId
                }
            });
    
            if(inventoryProductCardServiceImportJobs == null) {
                return [];
            }
    
            let inventoryProductCardServiceImportJobDTOs: InventoryProductCardServiceImportJobDTO[] = [];
            for(let i = 0; i < inventoryProductCardServiceImportJobs.length; i++) {
                let inventoryProductCardServiceImportJob = inventoryProductCardServiceImportJobs[i];
                //MAP TO DTO;
                let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});
    
                inventoryProductCardServiceImportJobDTOs.push(inventoryProductCardServiceImportJobDTO);
            }
    
            return inventoryProductCardServiceImportJobDTOs;
        }
    
    async getInventoryProductCardServiceImportJobsByCommerceLocationId(commerceLocationId: string) {

        let inventoryProductCardServiceImportJobs = await this.inventoryProductCardServiceImportJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId
            }
        });

        if(inventoryProductCardServiceImportJobs == null) {
            return [];
        }

        let inventoryProductCardServiceImportJobDTOs: InventoryProductCardServiceImportJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceImportJobs.length; i++) {
            let inventoryProductCardServiceImportJob = inventoryProductCardServiceImportJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});

            inventoryProductCardServiceImportJobDTOs.push(inventoryProductCardServiceImportJobDTO);
        }

        return inventoryProductCardServiceImportJobDTOs;
    }

    async getInventoryProductCardServiceImportJobsByCommerceAccountIdAndProductLineCode(commerceAccountId: string, productLineCode: string) {

        let inventoryProductCardServiceImportJobs = await this.inventoryProductCardServiceImportJobRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineCode: productLineCode
            }
        });

        if(inventoryProductCardServiceImportJobs == null) {
            return [];
        }

        let inventoryProductCardServiceImportJobDTOs: InventoryProductCardServiceImportJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceImportJobs.length; i++) {
            let inventoryProductCardServiceImportJob = inventoryProductCardServiceImportJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});

            inventoryProductCardServiceImportJobDTOs.push(inventoryProductCardServiceImportJobDTO);
        }

        return inventoryProductCardServiceImportJobDTOs;
    }

    async getInventoryProductCardServiceImportJobsByCommerceLocationIdAndProductLineCode(commerceLocationId: string, productLineCode: string) {

        let inventoryProductCardServiceImportJobs = await this.inventoryProductCardServiceImportJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode
            }
        });

        if(inventoryProductCardServiceImportJobs == null) {
            return [];
        }

        let inventoryProductCardServiceImportJobDTOs: InventoryProductCardServiceImportJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceImportJobs.length; i++) {
            let inventoryProductCardServiceImportJob = inventoryProductCardServiceImportJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});

            inventoryProductCardServiceImportJobDTOs.push(inventoryProductCardServiceImportJobDTO);
        }

        return inventoryProductCardServiceImportJobDTOs;
    }

    async getInventoryProductCardServiceImportJobsByCommerceLocationIdAndProductLineCodeAndStatus(commerceLocationId: string, productLineCode: string, inventoryProductCardServiceImportJobStatus: string) {

        let inventoryProductCardServiceImportJobs = await this.inventoryProductCardServiceImportJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode,
                inventoryProductCardServiceImportJobStatus: inventoryProductCardServiceImportJobStatus
            }
        });

        if(inventoryProductCardServiceImportJobs == null) {
            return [];
        }

        let inventoryProductCardServiceImportJobDTOs: InventoryProductCardServiceImportJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceImportJobs.length; i++) {
            let inventoryProductCardServiceImportJob = inventoryProductCardServiceImportJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});

            inventoryProductCardServiceImportJobDTOs.push(inventoryProductCardServiceImportJobDTO);
        }

        return inventoryProductCardServiceImportJobDTOs;
    }


    async getInventoryProductCardServiceImportJobDetailsById(inventoryProductCardServiceImportJobId: string) {
        let inventoryProductCardServiceImportJob = await this.inventoryProductCardServiceImportJobRepository.findOne({
            where: {
                inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId
            }
        });

        if(inventoryProductCardServiceImportJob == null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
        }

        //MAP TO DTO;
        let inventoryProductCardServiceImportJobDTO: InventoryProductCardServiceImportJobDTO = ({ ...inventoryProductCardServiceImportJob});
        let inventoryProductCardServiceImportJobItemDTOs = await this.inventoryProductCardServiceImportJobItemService.getInventoryProductCardServiceImportJobItemDetailsByJob(inventoryProductCardServiceImportJobDTO);

        if(inventoryProductCardServiceImportJobItemDTOs == null || inventoryProductCardServiceImportJobItemDTOs instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_DETAILS_NOT_FOUND', 'Inventory product card service import job details not found for job ID: ' + inventoryProductCardServiceImportJobId);
        }

        let inventoryProductCardServiceImportJobDetails = {
            inventoryProductCardServiceImportJobDTO,
            inventoryProductCardServiceImportJobItemDTOs
        };

        return inventoryProductCardServiceImportJobDetails;

    }
    
    async getInventoryProductCardServiceImportJobByOriginalFileName(commerceAccountId: string, commerceLocationId: string, inventoryProductCardServiceImportJobFileOriginalName: string) {
        return await this.inventoryProductCardServiceImportJobRepository.findOne({
            where: { 
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                inventoryProductCardServiceImportJobFileOriginalName: inventoryProductCardServiceImportJobFileOriginalName 
            }
        });
    }

    async createInventoryProductCardServiceImportJob(inventoryProductCardServiceImportJobFile: Express.Multer.File, createInventoryProductCardServiceImportJobDTO: CreateInventoryProductCardServiceImportJobDTO) {

        //CHECK TO SEE IF A FILE WITH THE SAME NAME EXISTS;
        let existingImportJobCard = await this.getInventoryProductCardServiceImportJobByOriginalFileName(createInventoryProductCardServiceImportJobDTO.commerceAccountId, createInventoryProductCardServiceImportJobDTO.commerceLocationId, inventoryProductCardServiceImportJobFile.originalname);

        if(existingImportJobCard != null) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_FILE_EXISTS', 'An import job with the same file name already exists. Please rename the file and try again.');
        }

        let inventoryProductCardServiceImportJobProviderTypeDTO = await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypeByName(createInventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobProviderTypeName);

        if(inventoryProductCardServiceImportJobProviderTypeDTO == null || inventoryProductCardServiceImportJobProviderTypeDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_PROVIDER_TYPE_NOT_FOUND', 'Inventory product card service import job provider type not found for name: ' + createInventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobProviderTypeName);
        }

        let inventoryProductCardServiceImportJobCode = await this.createInventoryProductCardServiceImportJobCode(createInventoryProductCardServiceImportJobDTO.productLineCode, createInventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobProviderTypeName, createInventoryProductCardServiceImportJobDTO.commerceLocationName);

        //UPLOAD THE FILE TO S3
        let inventoryProductCardServiceImportJobFileURL = await this.uploadInventoryProductCardServiceImportJobFile(createInventoryProductCardServiceImportJobDTO.commerceAccountId, inventoryProductCardServiceImportJobFile, inventoryProductCardServiceImportJobCode, inventoryProductCardServiceImportJobProviderTypeDTO);

        let inventoryProductCardServiceImportJob = this.inventoryProductCardServiceImportJobRepository.create({ ...createInventoryProductCardServiceImportJobDTO });
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobCode = inventoryProductCardServiceImportJobCode;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobStatus = INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobFileURL = inventoryProductCardServiceImportJobFileURL;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobFileOriginalName = inventoryProductCardServiceImportJobFile.originalname;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobDate = new Date();

        inventoryProductCardServiceImportJob = await this.inventoryProductCardServiceImportJobRepository.save(inventoryProductCardServiceImportJob);

        let inventoryProductCardServiceImportJobDTO = await this.getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobId);

        if(inventoryProductCardServiceImportJobDTO == undefined) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_CREATION_FAILED', 'Failed to create inventory product card service import job.');
        }

        return inventoryProductCardServiceImportJobCode;

    }

    async createInventoryProductCardServiceImportJobCode(productLineCode: string, inventoryProductCardServiceImportJobProviderTypeName: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryProductCardServiceImportJobCode = productLineCode.toUpperCase() + '-' + inventoryProductCardServiceImportJobProviderTypeName.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryProductCardServiceImportJobCode;
    
    }

    async uploadInventoryProductCardServiceImportJobFile(commerceAccountId: string, inventoryProductCardServiceImportJobFile: Express.Multer.File, inventoryProductCardServiceImportJobCode: string, inventoryProductCardServiceImportJobProviderTypeDTO: InventoryProductCardServiceImportJobProviderTypeDTO) {

        let inventoryProductCardImportJobFileBuffer = inventoryProductCardServiceImportJobFile.buffer;
        let inventoryProductCardImportJobBucketPath = commerceAccountId + '/' + inventoryProductCardServiceImportJobProviderTypeDTO.inventoryProductCardServiceImportJobProviderTypeFileUploadPath;
        let inventoryProductCardImportJobFileURL = '';

        inventoryProductCardImportJobFileURL = await this.awsS3Service.uploadCSV(inventoryProductCardImportJobFileBuffer, inventoryProductCardImportJobBucketPath, inventoryProductCardServiceImportJobCode);

        return inventoryProductCardImportJobFileURL;

    }

    async updateInventoryProductCardServiceImportJobStatus(inventoryProductCardServiceImportJobId: string, inventoryProductCardServiceImportJobStatus: string) {
        let inventoryProductCardServiceImportJob = await this.getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);

        if(inventoryProductCardServiceImportJob == null || inventoryProductCardServiceImportJob instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
        }

        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobStatus = inventoryProductCardServiceImportJobStatus;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobUpdateDate = new Date();

        await this.inventoryProductCardServiceImportJobRepository.save(inventoryProductCardServiceImportJob);

        return true;
    }

    async updateInventoryProductCardServiceImportJobCount(inventoryProductCardServiceImportJobId: string, inventoryProductCardServiceImportJobCount: number, inventoryProductCardServiceImportJobQtyCount: number) {
        let inventoryProductCardServiceImportJob = await this.getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);

        if(inventoryProductCardServiceImportJob == null || inventoryProductCardServiceImportJob instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
        }

        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobCount = inventoryProductCardServiceImportJobCount;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobQtyCount = inventoryProductCardServiceImportJobQtyCount;
        inventoryProductCardServiceImportJob.inventoryProductCardServiceImportJobUpdateDate = new Date();

        await this.inventoryProductCardServiceImportJobRepository.save(inventoryProductCardServiceImportJob);

        return true;
    }

    async approveInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId: string) {
        let inventoryProductCardServiceImportJobDTO = await this.getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);

        if(inventoryProductCardServiceImportJobDTO == null || inventoryProductCardServiceImportJobDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
        }

        await this.updateInventoryProductCardServiceImportJobStatus(inventoryProductCardServiceImportJobId, INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY);

        await this.inventoryProductCardServiceImportJobItemService.approveInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId);

        return inventoryProductCardServiceImportJobDTO;
    }

    async deleteInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId: string) {
        let inventoryProductCardServiceImportJobDTO = await this.getInventoryProductCardServiceImportJobById(inventoryProductCardServiceImportJobId);

        if(inventoryProductCardServiceImportJobDTO == null || inventoryProductCardServiceImportJobDTO instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_NOT_FOUND', 'Inventory product card service import job not found for ID: ' + inventoryProductCardServiceImportJobId);
        }

        if(inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobStatus == INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_COMPLETE) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_CANNOT_DELETE_COMPLETED', 'Cannot delete inventory product card service import job that is completed.');
        }

        await this.inventoryProductCardServiceImportJobItemService.deleteInventoryProductCardServiceImportJobItemsByJobId(inventoryProductCardServiceImportJobDTO.inventoryProductCardServiceImportJobId);

        await this.inventoryProductCardServiceImportJobRepository.delete({ 
            inventoryProductCardServiceImportJobId: inventoryProductCardServiceImportJobId 
        });

        return inventoryProductCardServiceImportJobDTO;
    }

    /* EVENT LISTENERS */
    @OnEvent('inventory.product.card.service.import.job.update.status')
    async handleInventoryProductCardServiceImportJobStatusEvent(payload: any) {

        let inventoryProductCardServiceImportJobId = payload.inventoryProductCardServiceImportJobId;
        let inventoryProductCardServiceImportJobStatus = payload.inventoryProductCardServiceImportJobStatus;

        if(inventoryProductCardServiceImportJobStatus == INVENTORY_PRODUCT_CARD_SERVICE_IMPORT_JOB_STATUS.PROCESSING_UPDATE_JOB_COUNT) {
            let inventoryProductCardServiceImportJobCount = payload.inventoryProductCardServiceImportJobCount;
            let inventoryProductCardServiceImportJobQtyCount = payload.inventoryProductCardServiceImportJobQtyCount;
            await this.updateInventoryProductCardServiceImportJobCount(inventoryProductCardServiceImportJobId, inventoryProductCardServiceImportJobCount, inventoryProductCardServiceImportJobQtyCount);
        }
        else {
            await this.updateInventoryProductCardServiceImportJobStatus(inventoryProductCardServiceImportJobId, inventoryProductCardServiceImportJobStatus);
        }
    }

}