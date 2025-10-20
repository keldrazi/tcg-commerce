import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryBatchLoadJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.entity';
import { InventoryBatchLoadJobProductCardDTO, CreateInventoryBatchLoadJobsProductCardDTO, CreateInventoryBatchLoadJobProductCardDTO } from './dto/inventory.product.card.service.create.job.dto';
import { INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.contants';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { InventoryBatchLoadProductCardService } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.service';
import { InventoryBatchLoadProductPriceCardService } from 'src/tcgcommerce/modules/inventory/batch/load/price/card/inventory.batch.load.price.card.service';

@Injectable()
export class InventoryBatchLoadJobProductCardService {

    constructor(
        @InjectRepository(InventoryBatchLoadJobProductCard) private inventoryBatchLoadJobProductCardRepository: Repository<InventoryBatchLoadJobProductCard>, 
        private productSetService: ProductSetService,
        private inventoryBatchLoadProductCardService: InventoryBatchLoadProductCardService,
        private inventoryBatchLoadProductPriceCardService: InventoryBatchLoadProductPriceCardService,
    ) { }


    async getInventoryBatchLoadJobProductCardsByCommerceAccountId(commerceAccountId: string) {

        let inventoryBatchLoadJobProductCards = await this.inventoryBatchLoadJobProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });

        if(inventoryBatchLoadJobProductCards == null) {
            return [];
        }

        let inventoryBatchLoadJobProductCardDTOs: InventoryBatchLoadJobProductCardDTO[] = [];

        for(let i = 0; i < inventoryBatchLoadJobProductCards.length; i++) {
            let inventoryBatchLoadJobProductCard = inventoryBatchLoadJobProductCards[i];
            //MAP TO DTO;
            let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

            inventoryBatchLoadJobProductCardDTOs.push(inventoryBatchLoadJobProductCardDTO);
        }

        return inventoryBatchLoadJobProductCardDTOs;
    }

    async getInventoryBatchLoadJobProductCardsByCommerceLocationId(commerceLocationId: string) {

        let inventoryBatchLoadJobProductCards = await this.inventoryBatchLoadJobProductCardRepository.find({
            where: {
                commerceLocationId: commerceLocationId
            }
        });

        if(inventoryBatchLoadJobProductCards == null) {
            return [];
        }

        let inventoryBatchLoadJobProductCardDTOs: InventoryBatchLoadJobProductCardDTO[] = [];

        for(let i = 0; i < inventoryBatchLoadJobProductCards.length; i++) {
            let inventoryBatchLoadJobProductCard = inventoryBatchLoadJobProductCards[i];
            //MAP TO DTO;
            let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

            inventoryBatchLoadJobProductCardDTOs.push(inventoryBatchLoadJobProductCardDTO);
        }

        return inventoryBatchLoadJobProductCardDTOs;
    }

    async getInventoryBatchLoadJobProductCardsByCommerceAccountIdAndLineId(commerceAccountId: string, productLineId: string) {

        let inventoryBatchLoadJobProductCards = await this.inventoryBatchLoadJobProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                productLineId: productLineId
            }
        });

        if(inventoryBatchLoadJobProductCards == null) {
            return [];
        }

        let inventoryBatchLoadJobProductCardDTOs: InventoryBatchLoadJobProductCardDTO[] = [];

        for(let i = 0; i < inventoryBatchLoadJobProductCards.length; i++) {
            let inventoryBatchLoadJobProductCard = inventoryBatchLoadJobProductCards[i];
            //MAP TO DTO;
            let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

            inventoryBatchLoadJobProductCardDTOs.push(inventoryBatchLoadJobProductCardDTO);
        }

        return inventoryBatchLoadJobProductCardDTOs;
    }

    async getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.findOne({
            where: {
                inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId
            }
        });

        if(inventoryBatchLoadJobProductCard == null) {
            return null;
        }

        //MAP TO DTO;
        let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

        return inventoryBatchLoadJobProductCardDTO;

    }

    async getInventoryBatchLoadJobProductCardDetailsById(inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.findOne({
            where: {
                inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId
            }
        });

        if(inventoryBatchLoadJobProductCard == null) {
            //TO DOL: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return null;
        }

        //MAP TO DTO;
        let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});
        let inventoryBatchLoadProductCardDetails = await this.inventoryBatchLoadProductCardService.getInventoryBatchLoadProductCardDetailsByJob(inventoryBatchLoadJobProductCardDTO);

        if(inventoryBatchLoadProductCardDetails == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB DETAILS;
            return null;
        }

        let inventoryBatchLoadJobProductCardDetails = {
            inventoryBatchLoadJobProductCardDTO,
            inventoryBatchLoadProductCardDetails
        };

        return inventoryBatchLoadJobProductCardDetails;

    }

    async getInventoryBatchLoadJobProductCardByDTO(createInventoryBatchLoadJobProductCardDTO: CreateInventoryBatchLoadJobProductCardDTO) {
        let inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.findOne({
            where: {
                commerceAccountId: createInventoryBatchLoadJobProductCardDTO.commerceAccountId,
                commerceLocationId: createInventoryBatchLoadJobProductCardDTO.commerceLocationId,
                productVendorId: createInventoryBatchLoadJobProductCardDTO.productVendorId,
                productLineId: createInventoryBatchLoadJobProductCardDTO.productLineId,
                productTypeId: createInventoryBatchLoadJobProductCardDTO.productTypeId,
                productSetId: createInventoryBatchLoadJobProductCardDTO.productSetId,
                productLanguageId: createInventoryBatchLoadJobProductCardDTO.productLanguageId,
            }
        });

        if(inventoryBatchLoadJobProductCard == null) {
            return null;
        }

        //MAP TO DTO;
        let inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO = ({ ...inventoryBatchLoadJobProductCard});

        return inventoryBatchLoadJobProductCardDTO;
    }

    

    /* CREATE ALL PRODUCT CARD INVENTORY BATCH LOAD JOBS */
    async createInventoryBatchLoadJobProductCardAll(createInventoryBatchLoadJobsProductCardDTO: CreateInventoryBatchLoadJobsProductCardDTO) {

        //GET THE SETS OF THE PRODUCT LINE;
        let productVendorId = createInventoryBatchLoadJobsProductCardDTO.productVendorId;
        let productLineId = createInventoryBatchLoadJobsProductCardDTO.productLineId;
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);

        if(productSets == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT SETS;
            return null; //RETURN AN ERROR;
        }


        let inventoryBatchLoadJobProductCardDTOs: InventoryBatchLoadJobProductCardDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            console.log('Creating Inventory Batch Load Job for Product Set: ' + productSet.productSetCode);
            let createInventoryBatchLoadJobProductCardDTO: CreateInventoryBatchLoadJobProductCardDTO = {
                commerceAccountId: createInventoryBatchLoadJobsProductCardDTO.commerceAccountId,
                commerceLocationId: createInventoryBatchLoadJobsProductCardDTO.commerceLocationId,
                commerceLocationName: createInventoryBatchLoadJobsProductCardDTO.commerceLocationName,
                commerceUserId: createInventoryBatchLoadJobsProductCardDTO.commerceUserId,
                commerceUserName: createInventoryBatchLoadJobsProductCardDTO.commerceUserName,
                productVendorId: createInventoryBatchLoadJobsProductCardDTO.productVendorId,
                productVendorCode: createInventoryBatchLoadJobsProductCardDTO.productVendorCode,
                productLineId: createInventoryBatchLoadJobsProductCardDTO.productLineId,
                productLineCode: createInventoryBatchLoadJobsProductCardDTO.productLineCode,
                productTypeId: createInventoryBatchLoadJobsProductCardDTO.productTypeId,
                productTypeCode: createInventoryBatchLoadJobsProductCardDTO.productTypeCode,
                productLanguageId: createInventoryBatchLoadJobsProductCardDTO.productLanguageId,
                productLanguageCode: createInventoryBatchLoadJobsProductCardDTO.productLanguageCode,
                productSetId: productSet.productSetId,
                productSetCode: productSet.productSetCode
            }
            
            let inventoryBatchLoadJobProductCardDTO = await this.createInventoryBatchLoadJobProductCardSet(createInventoryBatchLoadJobProductCardDTO);

            if(inventoryBatchLoadJobProductCardDTO == null) {
                continue;
            }

            inventoryBatchLoadJobProductCardDTOs.push(inventoryBatchLoadJobProductCardDTO);

        }
            
        return inventoryBatchLoadJobProductCardDTOs;

    }
    
    /* CREATE PRODUCT CARD INVENTORY BATCH LOAD JOBS BY SET */
    async createInventoryBatchLoadJobProductCardSet(createInventoryBatchLoadJobProductCardDTO: CreateInventoryBatchLoadJobProductCardDTO) {

        //CHECK IF THE JOB ALREADY EXISTS;
        let existingInventoryBatchLoadJobProductCardDTO = await this.getInventoryBatchLoadJobProductCardByDTO(createInventoryBatchLoadJobProductCardDTO);

        if(existingInventoryBatchLoadJobProductCardDTO != null) {
            if(existingInventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardStatus != INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_CANCELLED ||
                existingInventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardStatus != INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_FAILED ||
                existingInventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardStatus != INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_COMPLETE) {
                
                console.log('Inventory Batch Load Job Product Card already exists or is in progress for Set: ' + createInventoryBatchLoadJobProductCardDTO.productSetCode);
                //TO DO THROW AN ERROR;
                return null;
            }
        }

        let inventoryBatchLoadJobProductCardCode = await this.createInventoryBatchLoadJobProductCardCode(createInventoryBatchLoadJobProductCardDTO.productLineCode, createInventoryBatchLoadJobProductCardDTO.productSetCode, createInventoryBatchLoadJobProductCardDTO.commerceLocationName);

        let inventoryBatchLoadJobProductCard = this.inventoryBatchLoadJobProductCardRepository.create({ ...createInventoryBatchLoadJobProductCardDTO });

        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardCode = inventoryBatchLoadJobProductCardCode;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardDate = new Date();
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardStatus = INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING;
        inventoryBatchLoadJobProductCard = await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);
        
        
        let inventoryBatchLoadJobProductCardDTO = await this.getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardId);``
        
        if(inventoryBatchLoadJobProductCardDTO == null) {
            //TO DO: HANDLE ERROR FOR FAILED CREATION OF IMPORT JOB;
            return null; //RETURN AN ERROR;
        }
        
        console.log('Created Inventory Batch Load Job Product Card: ' + inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId);
        console.log('Set: ' + inventoryBatchLoadJobProductCardDTO.productSetCode);

        //START THE PROCESS OF CREATING THE INVENTORY FOR THE SET;
        this.inventoryBatchLoadProductCardService.createInventoryBatchLoadProductCardsBySetId(inventoryBatchLoadJobProductCardDTO);
        
        return inventoryBatchLoadJobProductCardDTO;
        
    }

    /* UPDATE PRODUCT CARD INVENTORY BATCH LOAD JOBS WITH PRICING */
    async updateInventoryBatchLoadJobProductCardPricing(inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCardDTO == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        await this.updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId, INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARD_PRICES);

        this.inventoryBatchLoadProductPriceCardService.updateBatchInventoryLoadJobProductPricesByJob(inventoryBatchLoadJobProductCardDTO);

        return true;
        
    }


    
    async createInventoryBatchLoadJobProductCardCode(productLineCode: string, productSetCode: string, commerceLocationName:string) {

        let now = new Date();
        let dateCode = now.getFullYear().toString() + '-' + (now.getMonth() + 1).toString().padStart(2, '0') + '-' + now.getDate().toString().padStart(2, '0') + '-' + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0') + now.getSeconds().toString().padStart(2, '0');

        let inventoryBatchLoadJobProductCardCode = productLineCode.toUpperCase() + '-' + productSetCode.replace(/ /g, '-').toUpperCase() + '-' + commerceLocationName.replace(/ /g, '-').toUpperCase() + '-' + dateCode;

        return inventoryBatchLoadJobProductCardCode;
    }


    async updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId: string, inventoryBatchLoadJobProductCardStatus: string) {
        let inventoryBatchLoadJobProductCard = await this.getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardStatus = inventoryBatchLoadJobProductCardStatus;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardUpdateDate = new Date();

        await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);

        return true;
    }

    async updateInventoryBatchLoadJobProductCardCount(inventoryBatchLoadJobProductCardId: string, inventoryBatchLoadJobProductCardCount: number) {
        let inventoryBatchLoadJobProductCard = await this.getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCard == undefined) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardCount = inventoryBatchLoadJobProductCardCount;
        inventoryBatchLoadJobProductCard.inventoryBatchLoadJobProductCardUpdateDate = new Date();

        await this.inventoryBatchLoadJobProductCardRepository.save(inventoryBatchLoadJobProductCard);

        return true;
    }

    async approveInventoryBatchLoadJobProductCardDetailsById(inventoryBatchLoadJobProductCardId: string) {
        let inventoryBatchLoadJobProductCardDTO = await this.getInventoryBatchLoadJobProductCardById(inventoryBatchLoadJobProductCardId);

        if(inventoryBatchLoadJobProductCardDTO == null) {
            //TO DO: HANDLE ERROR FOR NON EXISTENT IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        if(inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardStatus != INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_READY_FOR_REVIEW) {
            //TO DO: HANDLE ERROR FOR INVALID STATUS TO APPROVE IMPORT JOB;
            return false; //RETURN AN ERROR;
        }

        await this.updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId, INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_ADDING_TO_INVENTORY);

        await this.inventoryBatchLoadProductCardService.approveInventoryBatchLoadProductCardsByJobId(inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId);

        return true;
    }
    
    
    /* EVENT LISTENERS */
    @OnEvent('inventory.batch.load.job.product.card.update.status')
    async handleInventoryBatchLoadJobProductCardStatusEvent(payload: any) {
        console.log('Received Event: inventory.batch.load.job.product.card.update.status');
        let inventoryBatchLoadJobProductCardId = payload.inventoryBatchLoadJobProductCardId;
        let inventoryBatchLoadJobProductCardStatus = payload.inventoryBatchLoadJobProductCardStatus;

        if(inventoryBatchLoadJobProductCardStatus == INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE) {
            let inventoryBatchLoadJobProductCardCount = payload.inventoryBatchLoadJobProductCardCount;
            await this.updateInventoryBatchLoadJobProductCardCount(inventoryBatchLoadJobProductCardId, inventoryBatchLoadJobProductCardCount);

            //TO DO: UPDATE PRICING;
            this.updateInventoryBatchLoadJobProductCardPricing(inventoryBatchLoadJobProductCardId);
        }


        await this.updateInventoryBatchLoadJobProductCardStatus(inventoryBatchLoadJobProductCardId, inventoryBatchLoadJobProductCardStatus);

    }


}