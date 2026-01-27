import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardServiceCreateJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/create/job/inventory.product.card.service.create.job.entity';
import { InventoryProductCardServiceCreateJobDTO, CreateInventoryProductCardServiceCreateJobsDTO, CreateInventoryProductCardServiceCreateJobDTO } from './dto/inventory.product.card.service.create.job.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/create/job/inventory.product.card.service.create.job.constants';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardServiceCreateJobItemService } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/item/inventory.product.card.service.create.job.item.service';


@Injectable()
export class InventoryProductCardServiceCreateJobService {

    constructor(
        @InjectRepository(InventoryProductCardServiceCreateJob) private inventoryProductCardServiceCreateJobRepository: Repository<InventoryProductCardServiceCreateJob>,
        private productSetService: ProductSetService,
        private inventoryProductCardServiceCreateJobItemService: InventoryProductCardServiceCreateJobItemService,
    ) { }


    async getInventoryProductCardServiceCreateJobsByCommerceAccountId(commerceAccountId: string): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        let inventoryProductCardServiceCreateJobs = await this.inventoryProductCardServiceCreateJobRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });

        if(inventoryProductCardServiceCreateJobs == null) {
            return [];
        }

        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceCreateJobs.length; i++) {
            let inventoryProductCardServiceCreateJob = inventoryProductCardServiceCreateJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

            inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
        }

        return inventoryProductCardServiceCreateJobDTOs;
    }

    async getInventoryProductCardServiceCreateJobsByCommerceLocationId(commerceLocationId: string): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        let inventoryProductCardServiceCreateJobs = await this.inventoryProductCardServiceCreateJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId
            }
        });

        if(inventoryProductCardServiceCreateJobs == null) {
            return [];
        }

        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceCreateJobs.length; i++) {
            let inventoryProductCardServiceCreateJob = inventoryProductCardServiceCreateJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

            inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
        }

        return inventoryProductCardServiceCreateJobDTOs;
    }

    async getInventoryProductCardServiceCreateJobsByCommerceAccountIdAndProductLineCode(commerceAccountId: string, productLineCode: string): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        let inventoryProductCardServiceCreateJobs = await this.inventoryProductCardServiceCreateJobRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineCode: productLineCode
            }
        });

        if(inventoryProductCardServiceCreateJobs == null) {
            return [];
        }

        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceCreateJobs.length; i++) {
            let inventoryProductCardServiceCreateJob = inventoryProductCardServiceCreateJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

            inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
        }

        return inventoryProductCardServiceCreateJobDTOs;
    }

    async getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCode(commerceLocationId: string, productLineCode: string): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        let inventoryProductCardServiceCreateJobs = await this.inventoryProductCardServiceCreateJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode
            }
        });

        if(inventoryProductCardServiceCreateJobs == null) {
            return [];
        }

        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceCreateJobs.length; i++) {
            let inventoryProductCardServiceCreateJob = inventoryProductCardServiceCreateJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

            inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
        }

        return inventoryProductCardServiceCreateJobDTOs;
    }

    async getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCodeAndStatus(commerceLocationId: string, productLineCode: string, inventoryProductCardServiceCreateJobStatus: string): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        let inventoryProductCardServiceCreateJobs = await this.inventoryProductCardServiceCreateJobRepository.find({
            where: {
                commerceLocationId: commerceLocationId,
                productLineCode: productLineCode,
                inventoryProductCardServiceCreateJobStatus: inventoryProductCardServiceCreateJobStatus
            }
        });

        if(inventoryProductCardServiceCreateJobs == null) {
            return [];
        }

        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceCreateJobs.length; i++) {
            let inventoryProductCardServiceCreateJob = inventoryProductCardServiceCreateJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

            inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
        }

        return inventoryProductCardServiceCreateJobDTOs;
    }
    

    async getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId: string): Promise<InventoryProductCardServiceCreateJobDTO> {
        let inventoryProductCardServiceCreateJob = await this.inventoryProductCardServiceCreateJobRepository.findOneOrFail({
            where: {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId
            }
        });

        //MAP TO DTO;
        let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});

        return inventoryProductCardServiceCreateJobDTO;

    }

    async getInventoryProductCardServiceCreateJobDetailsById(inventoryProductCardServiceCreateJobId: string): Promise<{ inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO; inventoryProductCardServiceCreateJobItems: any[] }> {
        let inventoryProductCardServiceCreateJob = await this.inventoryProductCardServiceCreateJobRepository.findOneOrFail({
            where: {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId
            }
        });

        //MAP TO DTO;
        let inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO = ({ ...inventoryProductCardServiceCreateJob});
        let inventoryProductCardServiceCreateJobItems = await this.inventoryProductCardServiceCreateJobItemService.getInventoryProductCardServiceCreateJobItemDetailsByJob(inventoryProductCardServiceCreateJobDTO);

        if(inventoryProductCardServiceCreateJobItems == null) {
            inventoryProductCardServiceCreateJobItems = [];
        }

        let inventoryProductCardServiceCreateJobDetails = {
            inventoryProductCardServiceCreateJobDTO,
            inventoryProductCardServiceCreateJobItems
        };

        return inventoryProductCardServiceCreateJobDetails;

    }

    async getInventoryProductCardServiceCreateJobByDTO(createInventoryProductCardServiceCreateJobDTO: CreateInventoryProductCardServiceCreateJobDTO): Promise<InventoryProductCardServiceCreateJob | null> {
        let inventoryProductCardServiceCreateJob = await this.inventoryProductCardServiceCreateJobRepository.findOne({
            where: {
                commerceAccountId: createInventoryProductCardServiceCreateJobDTO.commerceAccountId,
                commerceLocationId: createInventoryProductCardServiceCreateJobDTO.commerceLocationId,
                productVendorId: createInventoryProductCardServiceCreateJobDTO.productVendorId,
                productLineId: createInventoryProductCardServiceCreateJobDTO.productLineId,
                productTypeId: createInventoryProductCardServiceCreateJobDTO.productTypeId,
                productSetId: createInventoryProductCardServiceCreateJobDTO.productSetId,
                productLanguageId: createInventoryProductCardServiceCreateJobDTO.productLanguageId,
            }
        });

        return inventoryProductCardServiceCreateJob;
    }

    

    /* CREATE ALL PRODUCT CARD INVENTORY BATCH LOAD JOBS */
    async createInventoryProductCardServiceCreateJobs(createInventoryProductCardServiceCreateJobsDTO: CreateInventoryProductCardServiceCreateJobsDTO): Promise<InventoryProductCardServiceCreateJobDTO[]> {

        //GET THE SETS OF THE PRODUCT LINE;
        let productVendorId = createInventoryProductCardServiceCreateJobsDTO.productVendorId;
        let productLineId = createInventoryProductCardServiceCreateJobsDTO.productLineId;
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);

        if(productSets == null || productSets.length === 0) {
            throw new BadRequestException('Product sets not found for the provided product vendor and product line.');
        }


        let inventoryProductCardServiceCreateJobDTOs: InventoryProductCardServiceCreateJobDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            
            let createInventoryProductCardServiceCreateJobDTO: CreateInventoryProductCardServiceCreateJobDTO = {
                commerceAccountId: createInventoryProductCardServiceCreateJobsDTO.commerceAccountId,
                commerceLocationId: createInventoryProductCardServiceCreateJobsDTO.commerceLocationId,
                commerceLocationName: createInventoryProductCardServiceCreateJobsDTO.commerceLocationName,
                commerceUserId: createInventoryProductCardServiceCreateJobsDTO.commerceUserId,
                commerceUserName: createInventoryProductCardServiceCreateJobsDTO.commerceUserName,
                productVendorId: createInventoryProductCardServiceCreateJobsDTO.productVendorId,
                productVendorCode: createInventoryProductCardServiceCreateJobsDTO.productVendorCode,
                productLineId: createInventoryProductCardServiceCreateJobsDTO.productLineId,
                productLineCode: createInventoryProductCardServiceCreateJobsDTO.productLineCode,
                productTypeId: createInventoryProductCardServiceCreateJobsDTO.productTypeId,
                productTypeCode: createInventoryProductCardServiceCreateJobsDTO.productTypeCode,
                productLanguageId: createInventoryProductCardServiceCreateJobsDTO.productLanguageId,
                productLanguageCode: createInventoryProductCardServiceCreateJobsDTO.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode
            }
            
            try {
                let inventoryProductCardServiceCreateJobDTO = await this.createInventoryProductCardServiceCreateJobSet(createInventoryProductCardServiceCreateJobDTO);
                inventoryProductCardServiceCreateJobDTOs.push(inventoryProductCardServiceCreateJobDTO);
            } catch (e) {
                // Skip this set if it already exists or fails
                continue;
            }

        }
            
        return inventoryProductCardServiceCreateJobDTOs;

    }
    

    async createInventoryProductCardServiceCreateJobSet(createInventoryProductCardServiceCreateJobDTO: CreateInventoryProductCardServiceCreateJobDTO): Promise<InventoryProductCardServiceCreateJobDTO> {

        let existingJob = await this.getInventoryProductCardServiceCreateJobByDTO(createInventoryProductCardServiceCreateJobDTO);

        if(existingJob != null) {
            throw new ConflictException('Inventory product card service create job already exists for the provided parameters.');
        }

        let inventoryProductCardServiceCreateJobCode = await this.createInventoryProductCardServiceCreateJobCode(createInventoryProductCardServiceCreateJobDTO.productLineCode, createInventoryProductCardServiceCreateJobDTO.productSetCode, createInventoryProductCardServiceCreateJobDTO.commerceLocationName);

        let inventoryProductCardServiceCreateJob = this.inventoryProductCardServiceCreateJobRepository.create({ ...createInventoryProductCardServiceCreateJobDTO });

        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobCode = inventoryProductCardServiceCreateJobCode;
        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobDate = new Date();
        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobStatus = INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_READY
        inventoryProductCardServiceCreateJob = await this.inventoryProductCardServiceCreateJobRepository.save(inventoryProductCardServiceCreateJob);
        
        
        let inventoryProductCardServiceCreateJobDTO = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobId);
    
        
        return inventoryProductCardServiceCreateJobDTO;
        
    }

    async processsInventoryProductCardServiceCreateJobs(commerceLocationId: string, productLineCode: string): Promise<number> {
        let inventoryProductCardServiceCreateJobsDTO = await this.getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCodeAndStatus(commerceLocationId, productLineCode, INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_READY);
        if(inventoryProductCardServiceCreateJobsDTO == null || inventoryProductCardServiceCreateJobsDTO.length === 0) {
            throw new NotFoundException('Inventory product card service create jobs not found for the provided parameters.');
        }

        this.processsInventoryProductCardServiceCreateJobsByIds(inventoryProductCardServiceCreateJobsDTO);

        return inventoryProductCardServiceCreateJobsDTO.length;

        
    }

    async processsInventoryProductCardServiceCreateJobsByIds(inventoryProductCardServiceCreateJobsDTO: InventoryProductCardServiceCreateJobDTO[]): Promise<void> {
        
        for(let i = 0; i < inventoryProductCardServiceCreateJobsDTO.length; i++) {
            let inventoryProductCardServiceCreateJobDTO = inventoryProductCardServiceCreateJobsDTO[i];
            await this.processsInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId);
        }

        
    }

    async processsInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId: string): Promise<InventoryProductCardServiceCreateJobDTO> {
        let inventoryProductCardServiceCreateJobDTO = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

        await this.inventoryProductCardServiceCreateJobItemService.createInventoryProductCardServiceCreateJobItemsBySetId(inventoryProductCardServiceCreateJobDTO);
    
        return inventoryProductCardServiceCreateJobDTO;
    }

    async approveInventoryProductCardServiceCreateJobs(commerceLocationId: string, productLineCode: string): Promise<number> {
        let inventoryProductCardServiceCreateJobsDTO = await this.getInventoryProductCardServiceCreateJobsByCommerceLocationIdAndProductLineCodeAndStatus(commerceLocationId, productLineCode, INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_READY_FOR_REVIEW);
        if(inventoryProductCardServiceCreateJobsDTO == null || inventoryProductCardServiceCreateJobsDTO.length === 0) {
            throw new NotFoundException('Inventory product card service create jobs not found for the provided parameters.');
        }

        this.approveInventoryProductCardServiceCreateJobsByIds(inventoryProductCardServiceCreateJobsDTO);

        return inventoryProductCardServiceCreateJobsDTO.length;

    }

    async approveInventoryProductCardServiceCreateJobsByIds(inventoryProductCardServiceCreateJobsDTO: InventoryProductCardServiceCreateJobDTO[]): Promise<void> {

        for(let i = 0; i < inventoryProductCardServiceCreateJobsDTO.length; i++) {
            let inventoryProductCardServiceCreateJobDTO = inventoryProductCardServiceCreateJobsDTO[i];
            await this.approveInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId);
        }

    }

    async approveInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId: string): Promise<InventoryProductCardServiceCreateJobDTO> {
        let inventoryProductCardServiceCreateJobDTO = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

        await this.updateInventoryProductCardServiceCreateJobStatus(inventoryProductCardServiceCreateJobId, INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY);

        await this.inventoryProductCardServiceCreateJobItemService.approveInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId);

        return inventoryProductCardServiceCreateJobDTO;
    }

    async deleteInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId: string): Promise<InventoryProductCardServiceCreateJobDTO> {
        let inventoryProductCardServiceCreateJobDTO = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

        if(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobStatus == INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_COMPLETE) {
            throw new ConflictException('Completed inventory product card service create jobs cannot be deleted.');
        }

        await this.inventoryProductCardServiceCreateJobItemService.deleteInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId);

        await this.inventoryProductCardServiceCreateJobRepository.delete({ 
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId 
            });

        return inventoryProductCardServiceCreateJobDTO;
    }



    //HELPER FUNCTIONS (REFACTOR TO UTIL SERVICE LATER);
    
    async createInventoryProductCardServiceCreateJobCode(productLineCode: string, productSetCode: string, commerceLocationName:string): Promise<string> {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryProductCardServiceCreateJobCode = productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryProductCardServiceCreateJobCode;
    }


    async updateInventoryProductCardServiceCreateJobStatus(inventoryProductCardServiceCreateJobId: string, inventoryProductCardServiceCreateJobStatus: string): Promise<boolean> {
        let inventoryProductCardServiceCreateJob = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobStatus = inventoryProductCardServiceCreateJobStatus;
        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobUpdateDate = new Date();

        await this.inventoryProductCardServiceCreateJobRepository.save(inventoryProductCardServiceCreateJob);

        return true;
    }

    async updateInventoryProductCardServiceCreateJobCount(inventoryProductCardServiceCreateJobId: string, inventoryProductCardServiceCreateJobCount: number): Promise<boolean> {
        let inventoryProductCardServiceCreateJob = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobCount = inventoryProductCardServiceCreateJobCount;
        inventoryProductCardServiceCreateJob.inventoryProductCardServiceCreateJobUpdateDate = new Date();

        await this.inventoryProductCardServiceCreateJobRepository.save(inventoryProductCardServiceCreateJob);

        return true;
    }

    
    
    
    /* EVENT LISTENERS */
    @OnEvent('inventory.product.card.service.create.job.update.status')
    async handleInventoryProductCardServiceCreateJobStatusEvent(payload: any): Promise<void> {
        
        let inventoryProductCardServiceCreateJobId = payload.inventoryProductCardServiceCreateJobId;
        let inventoryProductCardServiceCreateJobStatus = payload.inventoryProductCardServiceCreateJobStatus;

        if(inventoryProductCardServiceCreateJobStatus == INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE) {
            let inventoryProductCardServiceCreateJobCount = payload.inventoryProductCardServiceCreateJobCount;
            await this.updateInventoryProductCardServiceCreateJobCount(inventoryProductCardServiceCreateJobId, inventoryProductCardServiceCreateJobCount);

            let inventoryProductCardServiceCreateJobDTO = await this.getInventoryProductCardServiceCreateJobById(inventoryProductCardServiceCreateJobId);

            await this.updateInventoryProductCardServiceCreateJobStatus(inventoryProductCardServiceCreateJobId, INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_INVENTORY_CARD_PRICES);
            this.inventoryProductCardServiceCreateJobItemService.updateInventoryProductCardCreateJobItemPricesByJob(inventoryProductCardServiceCreateJobDTO);
        }
        else {
            await this.updateInventoryProductCardServiceCreateJobStatus(inventoryProductCardServiceCreateJobId, inventoryProductCardServiceCreateJobStatus);
        }
    }


}