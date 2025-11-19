import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/create/job/inventory.product.card.service.create.job.constants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardServiceCreateJobDTO, CreateInventoryProductCardServiceCreateJobsDTO, CreateInventoryProductCardServiceCreateJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/dto/inventory.product.card.service.create.job.dto';
import { InventoryProductCardServiceCreateJobItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/item/dto/inventory.product.card.service.create.job.item.dto';
import { InventoryProductCardServiceCreateJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/create/job/item/inventory.product.card.service.create.job.item.entity';
import { InventoryProductCardServiceCreateJobItemDetail } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/item/interface/inventory.product.card.service.create.job.item.detail.interface';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { CommerceLocationService } from 'src/tcgcommerce/modules/commerce/location/commerce.location.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/dto/tcgdb.mtg.price.current.dto';
import { PriceRuleProductCardBaseService } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class InventoryProductCardServiceCreateJobItemService {

    constructor(
        @InjectRepository(InventoryProductCardServiceCreateJobItem) private inventoryProductCardServiceCreateJobItemRepository: Repository<InventoryProductCardServiceCreateJobItem>,
        private productCardService: ProductCardService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productLanguageService: ProductLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private commerceLocationService: CommerceLocationService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobId: string) {

        let inventoryProductCardServiceCreateJobItemDTOs: InventoryProductCardServiceCreateJobItemDTO[] = [];

        let inventoryProductCardServiceCreateJobItems = await this.inventoryProductCardServiceCreateJobItemRepository.find({
            where: {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId,
            }
        });

        for(let i = 0; i < inventoryProductCardServiceCreateJobItems.length; i++) {
            let inventoryProductCardServiceCreateJobItem = inventoryProductCardServiceCreateJobItems[i];
            let inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO = await this.createInventoryProductCardServiceCreateJobItemDTO(inventoryProductCardServiceCreateJobItem);
            
            inventoryProductCardServiceCreateJobItemDTOs.push(inventoryProductCardServiceCreateJobItemDTO);
        }

        return inventoryProductCardServiceCreateJobItemDTOs;

    }

    async getInventoryProductCardServiceCreateJobItemsBySetId(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO) {

        let inventoryProductCardServiceCreateJobItemDTOs: InventoryProductCardServiceCreateJobItemDTO[] = [];

        let inventoryProductCardServiceCreateJobItems = await this.inventoryProductCardServiceCreateJobItemRepository.find({
            where: {
                commerceAccountId: inventoryProductCardServiceCreateJobDTO.commerceAccountId,
                commerceLocationId: inventoryProductCardServiceCreateJobDTO.commerceLocationId,
                productSetId: inventoryProductCardServiceCreateJobDTO.productSetId,
                productVendorId: inventoryProductCardServiceCreateJobDTO.productVendorId,
                productLineId: inventoryProductCardServiceCreateJobDTO.productLineId,
                productTypeId: inventoryProductCardServiceCreateJobDTO.productTypeId,
                productLanguageId: inventoryProductCardServiceCreateJobDTO.productLanguageId,
            }
        });

        for(let i = 0; i < inventoryProductCardServiceCreateJobItems.length; i++) {
            let inventoryProductCardServiceCreateJobItem = inventoryProductCardServiceCreateJobItems[i];
            let inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO = await this.createInventoryProductCardServiceCreateJobItemDTO(inventoryProductCardServiceCreateJobItem);
            
            inventoryProductCardServiceCreateJobItemDTOs.push(inventoryProductCardServiceCreateJobItemDTO);
        }

        return inventoryProductCardServiceCreateJobItemDTOs;

    }

    async getInventoryProductCardServiceCreateJobItemByProductCardId(inventoryProductCardServiceCreateJobId: string, productCardId: string) {
        let inventoryProductCardServiceCreateJobItem = await this.inventoryProductCardServiceCreateJobItemRepository.findOne({
            where: {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId,
                productCardId: productCardId
            }
        });

        if(inventoryProductCardServiceCreateJobItem == null) {
           return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_ITEM_NOT_FOUND', 'Inventory product card service create job item not found for inventoryProductCardServiceCreateJobId: ' + inventoryProductCardServiceCreateJobId + ' and productCardId: ' + productCardId);
        }

        let inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO = await this.createInventoryProductCardServiceCreateJobItemDTO(inventoryProductCardServiceCreateJobItem);

        return inventoryProductCardServiceCreateJobItemDTO;
    }

    async getInventoryProductCardServiceCreateJobItemDetailsByJob(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO) {
        //GET THE PRODUCT CARDS FOR THE SET;
        let productCards = await this.productCardService.getProductCardsByProductSetId(inventoryProductCardServiceCreateJobDTO.productSetId);

        let inventoryProductCardServiceCreateJobItemDetails: any[] = [];

        if(productCards == null || productCards instanceof ErrorMessageDTO) {
            return inventoryProductCardServiceCreateJobItemDetails;
        }

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = { ...productCard };

            //GET THE INVENTORY FOR THE THE PRODUCT CARD;
            let inventoryProductCardServiceCreateJobItemDTO = await this.getInventoryProductCardServiceCreateJobItemByProductCardId(inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId, productCard.productCardId);

            if(inventoryProductCardServiceCreateJobItemDTO != null) {
                let inventoryProductCardServiceCreateJobItemDetail = {
                    productCardNumber: productCardDTO.productCardNumber,
                    productCardName: productCardDTO.productCardName,
                    productCardImage: productCardDTO.productCardImage,
                    inventoryProductCardServiceCreateJobItemDTO: inventoryProductCardServiceCreateJobItemDTO
                };

                inventoryProductCardServiceCreateJobItemDetails.push(inventoryProductCardServiceCreateJobItemDetail);
            }
        }

        return inventoryProductCardServiceCreateJobItemDetails;
 
    

    }

    async createInventoryProductCardServiceCreateJobItemDTO(inventoryProductCardServiceCreateJobItem: InventoryProductCardServiceCreateJobItem) {

        let inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO = new InventoryProductCardServiceCreateJobItemDTO();
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemId = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemId;
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobId = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobId;
        inventoryProductCardServiceCreateJobItemDTO.productCardId = inventoryProductCardServiceCreateJobItem.productCardId;
        inventoryProductCardServiceCreateJobItemDTO.productCardTCGdbId = inventoryProductCardServiceCreateJobItem.productCardTCGdbId;
        inventoryProductCardServiceCreateJobItemDTO.productCardTCGPlayerId = inventoryProductCardServiceCreateJobItem.productCardTCGPlayerId;
        inventoryProductCardServiceCreateJobItemDTO.commerceAccountId = inventoryProductCardServiceCreateJobItem.commerceAccountId;
        inventoryProductCardServiceCreateJobItemDTO.commerceLocationId = inventoryProductCardServiceCreateJobItem.commerceLocationId;
        inventoryProductCardServiceCreateJobItemDTO.productVendorId = inventoryProductCardServiceCreateJobItem.productVendorId;
        inventoryProductCardServiceCreateJobItemDTO.productLineId = inventoryProductCardServiceCreateJobItem.productLineId;
        inventoryProductCardServiceCreateJobItemDTO.productTypeId = inventoryProductCardServiceCreateJobItem.productTypeId;
        inventoryProductCardServiceCreateJobItemDTO.productLanguageId = inventoryProductCardServiceCreateJobItem.productLanguageId;
        inventoryProductCardServiceCreateJobItemDTO.productLanguageCode = inventoryProductCardServiceCreateJobItem.productLanguageCode;
        inventoryProductCardServiceCreateJobItemDTO.productSetId = inventoryProductCardServiceCreateJobItem.productSetId;
        inventoryProductCardServiceCreateJobItemDTO.productSetCode = inventoryProductCardServiceCreateJobItem.productSetCode;
        inventoryProductCardServiceCreateJobItemDTO.productCardPrintingId = inventoryProductCardServiceCreateJobItem.productCardPrintingId;
        inventoryProductCardServiceCreateJobItemDTO.productCardPrintingName = inventoryProductCardServiceCreateJobItem.productCardPrintingName;
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemDetails = JSON.parse(inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemDetails) as InventoryProductCardServiceCreateJobItemDetail[];
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemIsVerified = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemIsVerified;
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemIsActive = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemIsActive;
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemCreateDate = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemCreateDate;
        inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemUpdateDate = inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemUpdateDate;

        return inventoryProductCardServiceCreateJobItemDTO;

    }

    async createInventoryProductCardServiceCreateJobItemsBySetId(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO) {
        //GET THE PRODUCT SET BY CODE;
        let productSet = await this.productSetService.getProductSet(inventoryProductCardServiceCreateJobDTO.productSetId);
        
        if (productSet == null || productSet instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set not found for productSetId: ' + inventoryProductCardServiceCreateJobDTO.productSetId);
        }

        this.eventEmitter.emit(
            'inventory.product.card.service.create.job.update.status',
            {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId,
                inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_INVENTORY_CARDS
            }
        )


        //CREATE THE BATCH INVENTORY PRODUCT CARDS BY SET;
        let inventoryProductCardServiceCreateJobItemDTOs = await this.createInventoryProductCardServiceCreateJobItemsBySet(inventoryProductCardServiceCreateJobDTO);
        
        if(inventoryProductCardServiceCreateJobItemDTOs == null || inventoryProductCardServiceCreateJobItemDTOs instanceof ErrorMessageDTO) {
            this.eventEmitter.emit(
                'inventory.product.card.service.create.job.update.status',
                {
                    inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId,
                    inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_FAILED,
                }
            )            
        }
        else {
            this.eventEmitter.emit(
                'inventory.product.card.service.create.job.update.status',
                {
                    inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId,
                    inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE,
                    inventoryProductCardServiceCreateJobCount: inventoryProductCardServiceCreateJobItemDTOs.length
                }
            )            
        }

    }

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/COMMERCE LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    //TO DO: REFACTOR THIS METHOD TO BE MORE MODULAR;
    async createInventoryProductCardServiceCreateJobItemsBySet(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO) {

        //GET THE COMMERCE LOCATION;
        let commerceLocation = await this.commerceLocationService.getCommerceLocation(inventoryProductCardServiceCreateJobDTO.commerceLocationId);
        let productVendor = await this.productVendorService.getProductVendor(inventoryProductCardServiceCreateJobDTO.productVendorId);
        let productLine = await this.productLineService.getProductLine(inventoryProductCardServiceCreateJobDTO.productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if ((commerceLocation == null || commerceLocation instanceof ErrorMessageDTO) || (productVendor == null || productVendor instanceof ErrorMessageDTO) || (productLine == null || productLine instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_INVALID_PARAMETERS', 'Invalid parameters for creating inventory product card service create job items.');
        }


        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(inventoryProductCardServiceCreateJobDTO.productLineId);
        let productLanguage = await this.productLanguageService.getProductLanguage(inventoryProductCardServiceCreateJobDTO.productLanguageId);
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(inventoryProductCardServiceCreateJobDTO.productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if ((productCardConditions == null || productCardConditions instanceof ErrorMessageDTO) || (productLanguage == null || productLanguage instanceof ErrorMessageDTO) || (productCardPrintings == null || productCardPrintings instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_INVALID_PARAMETERS', 'Invalid parameters for creating inventory product card service create job items.');
        }

        let productSet = await this.productSetService.getProductSet(inventoryProductCardServiceCreateJobDTO.productSetId);
        if(productSet == null || productSet instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set not found for productSetId: ' + inventoryProductCardServiceCreateJobDTO.productSetId);
        }

        //GET THE PRODUCT CARDS FOR THE SET;
        let productCards = await this.productCardService.getProductCardsByProductSetId(productSet.productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productCards == null || productCards instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_INVALID_PARAMETERS', 'Invalid parameters for creating inventory product card service create job items.');
        }

        //CREATE THE ARRAY TO HOLD THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardServiceCreateJobItemDTOs: InventoryProductCardServiceCreateJobItemDTO[] = [];
        
        //LOOP OVER EACH PRODUCT CARD AND CREATE THE INVENTORY PRODUCT CARD;
        for (let i = 0; i < productCards.length; i++) {
            
            //TO DO: CHECK TO SEE IF THE INVENTORY PRODUCT CARD ALREADY EXISTS FOR THE COMMERCE ACCOUNT/COMMERCE LOCATION/PRODUCT CARD/PRODUCT CARD LANGUAGE;
            let existingInventoryProductCards = await this.inventoryProductCardService.getInventoryProductCardsByProductCardId(productCards[i].productCardId, inventoryProductCardServiceCreateJobDTO.commerceAccountId, inventoryProductCardServiceCreateJobDTO.commerceLocationId, productLanguage.productLanguageId);

            if(existingInventoryProductCards != null) {
                continue;
            }

            let productCard: ProductCardDTO = productCards[i];
            
            let inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO = new InventoryProductCardServiceCreateJobItemDTO();
            inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobId = inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId;
            inventoryProductCardServiceCreateJobItemDTO.productCardId = productCard.productCardId;
            inventoryProductCardServiceCreateJobItemDTO.productCardTCGdbId = productCard.productCardTCGdbId;
            inventoryProductCardServiceCreateJobItemDTO.productCardTCGPlayerId = productCard.productCardTCGPlayerId;
            inventoryProductCardServiceCreateJobItemDTO.commerceAccountId = inventoryProductCardServiceCreateJobDTO.commerceAccountId;
            inventoryProductCardServiceCreateJobItemDTO.commerceLocationId = inventoryProductCardServiceCreateJobDTO.commerceLocationId;
            inventoryProductCardServiceCreateJobItemDTO.productVendorId = inventoryProductCardServiceCreateJobDTO.productVendorId;
            inventoryProductCardServiceCreateJobItemDTO.productLineId = inventoryProductCardServiceCreateJobDTO.productLineId;
            inventoryProductCardServiceCreateJobItemDTO.productTypeId = inventoryProductCardServiceCreateJobDTO.productTypeId;
            inventoryProductCardServiceCreateJobItemDTO.productLanguageId = productLanguage.productLanguageId;
            inventoryProductCardServiceCreateJobItemDTO.productLanguageCode = productLanguage.productLanguageCode;
            inventoryProductCardServiceCreateJobItemDTO.productSetId = productSet.productSetId;
            inventoryProductCardServiceCreateJobItemDTO.productSetCode = productSet.productSetCode;
            inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemIsVerified = false;
            inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemIsActive = true;

            for(let j = 0; j < productCardPrintings.length; j++) {
                let productCardPrinting = productCardPrintings[j];
               
                let productCardSKUByPrinting = await this.getProductCardTCGPlayerSKUByPrinting(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId);
                //IF THE PRODUCT CARD SKU BY PRINTING IS NULL, THEN SKIP THIS PRINTING AS IT DOES NOT EXIST;
                if (productCardSKUByPrinting == null) {
                    continue;
                }
                inventoryProductCardServiceCreateJobItemDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
                inventoryProductCardServiceCreateJobItemDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;

                let inventoryProductCardServiceCreateJobItemDetails: InventoryProductCardServiceCreateJobItemDetail[] = [];
                for(let k = 0; k < productCardConditions.length; k++) {
                    
                    let productCardCondition = productCardConditions[k];
                    let inventoryProductCardItemTCGPlayerSKU = await this.getProductCardTCGPlayerSKUByCondition(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);
                    if(inventoryProductCardItemTCGPlayerSKU == null) {
                        continue;
                    }

                    let inventoryProductCardServiceCreateJobItemDetail: InventoryProductCardServiceCreateJobItemDetail = {
                        productCardConditionCode: productCardCondition.productCardConditionCode,
                        inventoryProductCardItemTCGPlayerSKU: inventoryProductCardItemTCGPlayerSKU,
                        inventoryProductCardItemSKU: '',
                        inventoryProductCardItemQty: 0,
                        inventoryProductCardItemMaxQty: 0,
                        inventoryProductCardItemReserveQty: 0,
                        inventoryProductCardItemPrice: 0,
                        inventoryProductCardItemCost: 0,
                        inventoryProductCardItemOverridePriceEnabled: false,
                        inventoryProductCardItemOverridePrice: 0,
                    };

                    inventoryProductCardServiceCreateJobItemDetails.push(inventoryProductCardServiceCreateJobItemDetail);
                }

                let newInventoryProductCardServiceCreateJobItem = this.inventoryProductCardServiceCreateJobItemRepository.create({
                    inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId,
                    productCardId: productCard.productCardId,
                    productCardTCGdbId: productCard.productCardTCGdbId,
                    productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                    commerceAccountId: inventoryProductCardServiceCreateJobDTO.commerceAccountId,
                    commerceLocationId: inventoryProductCardServiceCreateJobDTO.commerceLocationId,
                    productVendorId: inventoryProductCardServiceCreateJobDTO.productVendorId,
                    productLineId: inventoryProductCardServiceCreateJobDTO.productLineId,
                    productTypeId: inventoryProductCardServiceCreateJobDTO.productTypeId,
                    productLanguageId: inventoryProductCardServiceCreateJobDTO.productLanguageId,
                    productLanguageCode: productLanguage.productLanguageCode,
                    productSetId: productSet.productSetId,
                    productSetCode: productSet.productSetCode,
                    productCardPrintingId: productCardPrinting.productCardPrintingId,
                    productCardPrintingName: productCardPrinting.productCardPrintingName,
                    inventoryProductCardServiceCreateJobItemDetails: JSON.stringify(inventoryProductCardServiceCreateJobItemDetails),
                    inventoryProductCardServiceCreateJobItemIsVerified: false,
                    inventoryProductCardServiceCreateJobItemIsActive: true,
                });

                await this.inventoryProductCardServiceCreateJobItemRepository.save(newInventoryProductCardServiceCreateJobItem);
                inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemId = newInventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemId;
                inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemDetails = inventoryProductCardServiceCreateJobItemDetails;

                inventoryProductCardServiceCreateJobItemDTOs.push(inventoryProductCardServiceCreateJobItemDTO);
            
            }
        }

        return inventoryProductCardServiceCreateJobItemDTOs;
        
    }

    //PRICE UPDATES
    async updateInventoryProductCardCreateJobItemPricesByJob(inventoryProductCardServiceCreateJobDTO: InventoryProductCardServiceCreateJobDTO) {
        
        //GET THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardServiceCreateJobItemDTOs = await this.getInventoryProductCardServiceCreateJobItemsBySetId(inventoryProductCardServiceCreateJobDTO);
         //GET THE CURRENT PRICES FOR THE SET;
        let tcgdbMTGPriceCurrentDTOs = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(inventoryProductCardServiceCreateJobDTO.productSetCode);

        //GET THE BASE PRICE RULES;
        let priceRuleProductCardBaseDTO = await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(inventoryProductCardServiceCreateJobDTO.commerceAccountId, inventoryProductCardServiceCreateJobDTO.productVendorId, inventoryProductCardServiceCreateJobDTO.productLineId, inventoryProductCardServiceCreateJobDTO.productTypeId);
        
        if(priceRuleProductCardBaseDTO == null) {
            //TO DO: USE THE DEFAULTS;
            return;
        }
        
        //LOOP OVER THE PRICES AND FIND THE CORRESPONDING PRODUCT CARD;
        for(let i = 0; i < tcgdbMTGPriceCurrentDTOs.length; i++) {
            let tcgdbMTGPriceCurrentDTO = tcgdbMTGPriceCurrentDTOs[i];
            let productCardPrintingName = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentSubTypeName;
            let productCardTCGdbId = tcgdbMTGPriceCurrentDTO.tcgdbMTGCardId;

            let tcgdbPriceCurrent = await this.getTCGdbPriceCurrentByRule(tcgdbMTGPriceCurrentDTO, priceRuleProductCardBaseDTO);
            
            let inventoryProductCardServiceCreateJobItemDTO = inventoryProductCardServiceCreateJobItemDTOs.find(item => 
                item.productCardTCGdbId === productCardTCGdbId &&
                item.productCardPrintingName === productCardPrintingName
            );

            if(inventoryProductCardServiceCreateJobItemDTO != undefined) {

                if(inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemIsVerified == true) {
                    continue;
                }

                let inventoryProductCardServiceCreateJobItemDetails: InventoryProductCardServiceCreateJobItemDetail[] = inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemDetails;
                for(let j = 0; j < inventoryProductCardServiceCreateJobItemDetails.length; j++) {
                    let inventoryProductCardServiceCreateJobItemDetail = inventoryProductCardServiceCreateJobItemDetails[j];

                    switch(inventoryProductCardServiceCreateJobItemDetail.productCardConditionCode) {
                        case 'NM':
                            let price = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseNMPercentage / 100);
                            inventoryProductCardServiceCreateJobItemDetail.inventoryProductCardItemPrice = parseFloat(price.toFixed(2));
                            break;
                        case 'LP':
                            let priceLP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseLPPercentage / 100);
                            inventoryProductCardServiceCreateJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceLP.toFixed(2));
                            break;
                        case 'MP':
                            let priceMP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseMPPercentage / 100);
                            inventoryProductCardServiceCreateJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceMP.toFixed(2));
                            break;
                        case 'HP':
                            let priceHP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseHPPercentage / 100);
                            inventoryProductCardServiceCreateJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceHP.toFixed(2));
                            break;
                        case 'DM':
                            let priceDM = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseDMPercentage / 100);
                            inventoryProductCardServiceCreateJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceDM.toFixed(2));
                            break;
                    }

                    inventoryProductCardServiceCreateJobItemDetails[j] = inventoryProductCardServiceCreateJobItemDetail;
                    
                }
                inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemDetails = inventoryProductCardServiceCreateJobItemDetails;
                await this.updateInventoryProductCardServiceCreateJobItem(inventoryProductCardServiceCreateJobItemDTO);
            }

        }

        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.product.card.service.create.job.update.status', {
            inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobDTO.inventoryProductCardServiceCreateJobId,
            inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_READY_FOR_REVIEW,
        });
    }

    async approveInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobId: string) {
        
        this.eventEmitter.emit(
            'inventory.product.card.service.create.job.update.status',
            {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId,
                inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_ADDING_TO_INVENTORY,
            }
        )   

        let inventoryProductCardServiceCreateJobItemDTOs = await this.getInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobId);
        for(let i = 0; i < inventoryProductCardServiceCreateJobItemDTOs.length; i++) {
            let inventoryProductCardServiceCreateJobItemDTO = inventoryProductCardServiceCreateJobItemDTOs[i];
            await this.inventoryProductCardService.createInventoryProductCardFromCreateJob(inventoryProductCardServiceCreateJobItemDTO);
        }

        this.eventEmitter.emit(
            'inventory.product.card.service.create.job.update.status',
            {
                inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId,
                inventoryProductCardServiceCreateJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_CREATE_JOB_STATUS.PROCESSING_COMPLETE,
            }
        )
        
        return true;

    }

    async deleteInventoryProductCardServiceCreateJobItemsByJobId(inventoryProductCardServiceCreateJobId: string) {
        
        await this.inventoryProductCardServiceCreateJobItemRepository.delete({
            inventoryProductCardServiceCreateJobId: inventoryProductCardServiceCreateJobId
        });
        
        return true;

    }

    //UPDATE INVENTORY PRODUCT CARD SERVICE CREATE JOB ITEM WITH PRICES;
    async updateInventoryProductCardServiceCreateJobItem(inventoryProductCardServiceCreateJobItemDTO: InventoryProductCardServiceCreateJobItemDTO) {
        let inventoryProductCardServiceCreateJobItem = await this.inventoryProductCardServiceCreateJobItemRepository.findOne({
            where: {
                inventoryProductCardServiceCreateJobItemId: inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemId
            }
        });

        if(inventoryProductCardServiceCreateJobItem == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemDetails = JSON.stringify(inventoryProductCardServiceCreateJobItemDTO.inventoryProductCardServiceCreateJobItemDetails);
        inventoryProductCardServiceCreateJobItem.inventoryProductCardServiceCreateJobItemUpdateDate = new Date();
        inventoryProductCardServiceCreateJobItem = await this.inventoryProductCardServiceCreateJobItemRepository.save(inventoryProductCardServiceCreateJobItem);

    }

    //GET TCPLAYER SKU BY PRINTING/LANGUAGE;
    async getProductCardTCGPlayerSKUByPrinting(productCardTCGPlayerSKUs: any, productCardLanguageId: number, productCardPrintingId: number) {
        const productCardTCGPlayerSKUsJson = productCardTCGPlayerSKUs;
        const productCardTCGPlayerSKU = productCardTCGPlayerSKUsJson.find(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId
        );

        if(productCardTCGPlayerSKU == undefined) {
            return null;
        }
        else {
            return productCardTCGPlayerSKU;
        }

        
    }

    //GET TCPLAYER SKU BY CONDITION/PRINTING/LANGUAGE;
    async getProductCardTCGPlayerSKUByCondition(productCardTCGPlayerSKUs: any, productCardLanguageId: number, productCardPrintingId: number, productCardConditionId: number) {
        const productCardTCGPlayerSKUsJson = productCardTCGPlayerSKUs;
        const productCardTCGPlayerSKU = productCardTCGPlayerSKUsJson.find(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId &&
            item.conditionId === productCardConditionId
        );

        if(productCardTCGPlayerSKU == undefined) {
            return null;
        }
        else {
            return productCardTCGPlayerSKU.skuId;
        }

    }


    

    async getTCGdbPriceCurrentByRule(tcgdbMTGPriceCurrentDTO: TCGdbMTGPriceCurrentDTO, priceRuleProductCardBaseDTO: any) {
        let tcgdbCurrentPrice = 0;

        switch(priceRuleProductCardBaseDTO.priceRuleProductCardBaseOption) {
            case 'TCGPlayer Low':
                tcgdbCurrentPrice = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentLowPrice;
                break;
            case 'TCGPlayer Market':
                tcgdbCurrentPrice = tcgdbMTGPriceCurrentDTO.tcgdbMTGPriceCurrentMarketPrice;
                break;
        }

        return tcgdbCurrentPrice;
    }
    
}