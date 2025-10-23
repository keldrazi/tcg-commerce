import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryProductCardServiceUpdatePriceJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.entity';
import { InventoryProductCardServiceUpdatePriceJobDTO } from './dto/inventory.product.card.service.update.price.job.dto';
import { INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.contants';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryProductCardServiceUpdatePriceJobItemService } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.service';
import { CommerceAccountService } from 'src/tcgcommerce/modules/commerce/account/commerce.account.service';
import { CommerceLocationService } from 'src/tcgcommerce/modules/commerce/location/commerce.location.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductTypeService } from 'src/tcgcommerce/modules/product/type/product.type.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { CommerceAccountDTO } from 'src/tcgcommerce/modules/commerce/account/dto/commerce.account.dto';

@Injectable()
export class InventoryProductCardServiceUpdatePriceJobService {

    constructor(
        @InjectRepository(InventoryProductCardServiceUpdatePriceJob) private inventoryProductCardServiceUpdatePriceJobRepository: Repository<InventoryProductCardServiceUpdatePriceJob>,
        private productSetService: ProductSetService,
        private inventoryProductCardServiceUpdatePriceJobItemService: InventoryProductCardServiceUpdatePriceJobItemService,
        private commerceAccountService: CommerceAccountService,
        private commerceLocationService: CommerceLocationService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productTypeService: ProductTypeService,
        private productLanguageService: ProductLanguageService,
    ) { }


    async getInventoryProductCardServiceUpdatePriceJobsByCommerceAccountIdAndProductLineCode(commerceAccountId: string, productLineCode: string) {

        let inventoryProductCardServiceUpdatePriceJobs = await this.inventoryProductCardServiceUpdatePriceJobRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineCode: productLineCode
            }
        });

        if(inventoryProductCardServiceUpdatePriceJobs == null) {
            return [];
        }

        let inventoryProductCardServiceUpdatePriceJobDTOs: InventoryProductCardServiceUpdatePriceJobDTO[] = [];
        for(let i = 0; i < inventoryProductCardServiceUpdatePriceJobs.length; i++) {
            let inventoryProductCardServiceUpdatePriceJob = inventoryProductCardServiceUpdatePriceJobs[i];
            //MAP TO DTO;
            let inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO = ({ ...inventoryProductCardServiceUpdatePriceJob});

            inventoryProductCardServiceUpdatePriceJobDTOs.push(inventoryProductCardServiceUpdatePriceJobDTO);
        }

        return inventoryProductCardServiceUpdatePriceJobDTOs;
    }

    async getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJob = await this.inventoryProductCardServiceUpdatePriceJobRepository.findOne({
            where: {
                inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobId
            }
        });

        if(inventoryProductCardServiceUpdatePriceJob == null) {
            return null;
        }

        //MAP TO DTO;
        let inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO = ({ ...inventoryProductCardServiceUpdatePriceJob});

        return inventoryProductCardServiceUpdatePriceJobDTO;

    }

    async getInventoryProductCardServiceUpdatePriceJobDetailsById(inventoryProductCardServiceUpdatePriceJobId: string) {
        let inventoryProductCardServiceUpdatePriceJob = await this.inventoryProductCardServiceUpdatePriceJobRepository.findOne({
            where: {
                inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobId
            }
        });

        if(inventoryProductCardServiceUpdatePriceJob == null) {
            //TO DOL: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return null;
        }
        
        //MAP TO DTO;
        let inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO = ({ ...inventoryProductCardServiceUpdatePriceJob});
        let inventoryProductCardServiceUpdatePriceJobItems = await this.inventoryProductCardServiceUpdatePriceJobItemService.getInventoryProductCardServiceUpdatePriceJobItemDetailsByJob(inventoryProductCardServiceUpdatePriceJobDTO);

        if(inventoryProductCardServiceUpdatePriceJobItems == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB DETAILS;
            return null;
        }

        let inventoryProductCardServiceUpdatePriceJobDetails = {
            inventoryProductCardServiceUpdatePriceJobDTO,
            inventoryProductCardServiceUpdatePriceJobItems
        };

        return inventoryProductCardServiceUpdatePriceJobDetails;

    }

    async createInventoryProductCardServiceUpdatePriceJobs(productVendorCode:string, productLineCode:string, productTypeCode:string, productLanguageCode:string) {
        
        let productVendor = await this.productVendorService.getProductVendorByCode(productVendorCode);
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        let productType = await this.productTypeService.getProductTypeByCode(productTypeCode);
        
        if(productVendor == null || productLine == null || productType == null) {
            return null;
        }
        
        let productLanguage = await this.productLanguageService.getProductLanguageByCodeAndProductLineId(productLanguageCode, productLine.productLineId);
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);
        
        let commerceAccounts = await this.commerceAccountService.getActiveCommerceAccounts();

        if(commerceAccounts == null) {
            return null;
        }

        for(let i = 0; i < commerceAccounts.length; i++) {
            let commerceAccount = commerceAccounts[i];
            let commerceLocations = await this.commerceLocationService.getActiveCommerceLocations(commerceAccount.commerceAccountId);

            if(commerceLocations == null) {
                continue;
            }


        }
            
            
    }
    

    /* CREATE ALL INVENTORY PRODUCT CARD SERVICE UPDATE PRICE JOBS */
    /*
    async createInventoryProductCardServiceUpdatePriceJobs(createInventoryProductCardServiceUpdatePriceJobsDTO: CreateInventoryProductCardServiceUpdatePriceJobsDTO) {

        //GET THE SETS OF THE PRODUCT LINE;
        let productVendorId = createInventoryProductCardServiceUpdatePriceJobsDTO.productVendorId;
        let productLineId = createInventoryProductCardServiceUpdatePriceJobsDTO.productLineId;
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);

        if(productSets == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT SETS;
            return null; //RETURN AN ERROR;
        }


        let inventoryProductCardServiceUpdatePriceJobDTOs: InventoryProductCardServiceUpdatePriceJobDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            
            let createInventoryProductCardServiceUpdatePriceJobDTO: CreateInventoryProductCardServiceUpdatePriceJobDTO = {
                commerceAccountId: createInventoryProductCardServiceUpdatePriceJobsDTO.commerceAccountId,
                commerceLocationId: createInventoryProductCardServiceUpdatePriceJobsDTO.commerceLocationId,
                productVendorId: createInventoryProductCardServiceUpdatePriceJobsDTO.productVendorId,
                productVendorCode: createInventoryProductCardServiceUpdatePriceJobsDTO.productVendorCode,
                productLineId: createInventoryProductCardServiceUpdatePriceJobsDTO.productLineId,
                productLineCode: createInventoryProductCardServiceUpdatePriceJobsDTO.productLineCode,
                productTypeId: createInventoryProductCardServiceUpdatePriceJobsDTO.productTypeId,
                productTypeCode: createInventoryProductCardServiceUpdatePriceJobsDTO.productTypeCode,
                productLanguageId: createInventoryProductCardServiceUpdatePriceJobsDTO.productLanguageId,
                productLanguageCode: createInventoryProductCardServiceUpdatePriceJobsDTO.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode
            }
            
            let inventoryProductCardServiceUpdatePriceJobDTO = await this.createInventoryProductCardServiceUpdatePriceJobSet(createInventoryProductCardServiceUpdatePriceJobDTO);

            if(inventoryProductCardServiceUpdatePriceJobDTO == null) {
                continue;
            }

            inventoryProductCardServiceUpdatePriceJobDTOs.push(inventoryProductCardServiceUpdatePriceJobDTO);

        }
            
        return inventoryProductCardServiceUpdatePriceJobDTOs;

    }
    

    async createInventoryProductCardServiceUpdatePriceJobSet(createInventoryProductCardServiceUpdatePriceJobDTO: CreateInventoryProductCardServiceUpdatePriceJobDTO) {

        //CHECK IF THE JOB ALREADY EXISTS;
        let existingInventoryProductCardServiceUpdatePriceJobDTO = await this.getInventoryProductCardServiceUpdatePriceJobByDTO(createInventoryProductCardServiceUpdatePriceJobDTO);

        if(existingInventoryProductCardServiceUpdatePriceJobDTO != null) {
            return null;
        }
        

        let inventoryProductCardServiceUpdatePriceJobCode = await this.createInventoryProductCardServiceUpdatePriceJobCode(createInventoryProductCardServiceUpdatePriceJobDTO.productLineCode, createInventoryProductCardServiceUpdatePriceJobDTO.productSetCode);

        let inventoryProductCardServiceUpdatePriceJob = this.inventoryProductCardServiceUpdatePriceJobRepository.create({ ...createInventoryProductCardServiceUpdatePriceJobDTO });

        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobCode = inventoryProductCardServiceUpdatePriceJobCode;
        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobDate = new Date();
        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobStatus = INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING_READY
        inventoryProductCardServiceUpdatePriceJob = await this.inventoryProductCardServiceUpdatePriceJobRepository.save(inventoryProductCardServiceUpdatePriceJob);
        
        
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobId);
        
        if(inventoryProductCardServiceUpdatePriceJobDTO == null) {
            //TO DO: HANDLE ERROR FOR FAILED CREATION OF IMPORT JOB;
            return null; //RETURN AN ERROR;
        }
    
        
        return inventoryProductCardServiceUpdatePriceJobDTO;
        
    }


    async processsInventoryProductCardServiceUpdatePriceJobs(commerceAccount: string) {
        let inventoryProductCardServiceUpdatePriceJobDTO = await this.getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);
        if(inventoryProductCardServiceUpdatePriceJobDTO == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return null; //RETURN AN ERROR;
        }

        //this.inventoryProductCardServiceUpdatePriceJobItemService.createInventoryProductCardServiceUpdatePriceJobItemsBySetId(inventoryProductCardServiceUpdatePriceJobDTO);
    
        return inventoryProductCardServiceUpdatePriceJobDTO;
    }
    */
    //HELPER FUNCTIONS (REFACTOR TO UTIL SERVICE LATER);
    
    async createInventoryProductCardServiceUpdatePriceJobCode(productLineCode: string, productSetCode: string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryProductCardServiceUpdatePriceJobCode = productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryProductCardServiceUpdatePriceJobCode;
    }


    async updateInventoryProductCardServiceUpdatePriceJobStatus(inventoryProductCardServiceUpdatePriceJobId: string, inventoryProductCardServiceUpdatePriceJobStatus: string) {
        let inventoryProductCardServiceUpdatePriceJob = await this.getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);

        if(inventoryProductCardServiceUpdatePriceJob == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobStatus = inventoryProductCardServiceUpdatePriceJobStatus;
        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobUpdateDate = new Date();

        await this.inventoryProductCardServiceUpdatePriceJobRepository.save(inventoryProductCardServiceUpdatePriceJob);

        return true;
    }

    async updateInventoryProductCardServiceUpdatePriceJobCount(inventoryProductCardServiceUpdatePriceJobId: string, inventoryProductCardServiceUpdatePriceJobCount: number) {
        let inventoryProductCardServiceUpdatePriceJob = await this.getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);

        if(inventoryProductCardServiceUpdatePriceJob == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobCount = inventoryProductCardServiceUpdatePriceJobCount;
        inventoryProductCardServiceUpdatePriceJob.inventoryProductCardServiceUpdatePriceJobUpdateDate = new Date();

        await this.inventoryProductCardServiceUpdatePriceJobRepository.save(inventoryProductCardServiceUpdatePriceJob);

        return true;
    }

    
    
    
    /* EVENT LISTENERS */
    @OnEvent('inventory.product.card.service.update.price.job.update.status')
    async handleInventoryProductCardServiceUpdatePriceJobStatusEvent(payload: any) {
        
        let inventoryProductCardServiceUpdatePriceJobId = payload.inventoryProductCardServiceUpdatePriceJobId;
        let inventoryProductCardServiceUpdatePriceJobStatus = payload.inventoryProductCardServiceUpdatePriceJobStatus;

        await this.updateInventoryProductCardServiceUpdatePriceJobStatus(inventoryProductCardServiceUpdatePriceJobId, inventoryProductCardServiceUpdatePriceJobStatus);
        /*
        if(inventoryProductCardServiceUpdatePriceJobStatus == INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE) {
            let inventoryProductCardServiceUpdatePriceJobCount = payload.inventoryProductCardServiceUpdatePriceJobCount;
            await this.updateInventoryProductCardServiceUpdatePriceJobCount(inventoryProductCardServiceUpdatePriceJobId, inventoryProductCardServiceUpdatePriceJobCount);

            //TO DO: UPDATE PRICING;
            let inventoryProductCardServiceUpdatePriceJobDTO = await this.getInventoryProductCardServiceUpdatePriceJobById(inventoryProductCardServiceUpdatePriceJobId);

            if(inventoryProductCardServiceUpdatePriceJobDTO == null) {
                //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
                return null; //RETURN AN ERROR;
            }
            await this.updateInventoryProductCardServiceUpdatePriceJobStatus(inventoryProductCardServiceUpdatePriceJobId, INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING_INVENTORY_CARD_PRICES);
            this.inventoryProductCardServiceUpdatePriceJobItemService.updateInventoryProductCardUpdatePriceJobItemPricesByJob(inventoryProductCardServiceUpdatePriceJobDTO);
        }
        else {
            await this.updateInventoryProductCardServiceUpdatePriceJobStatus(inventoryProductCardServiceUpdatePriceJobId, inventoryProductCardServiceUpdatePriceJobStatus);
        }
        */
    }


}