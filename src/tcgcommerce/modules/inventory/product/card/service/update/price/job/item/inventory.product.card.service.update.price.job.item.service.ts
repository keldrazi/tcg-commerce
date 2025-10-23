import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.contants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardServiceUpdatePriceJobDTO, CreateInventoryProductCardServiceUpdatePriceJobsDTO, CreateInventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';
import { InventoryProductCardServiceUpdatePriceJobItemDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/dto/inventory.product.card.service.update.price.job.item.dto';
import { InventoryProductCardServiceUpdatePriceJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.entity';
import { InventoryProductCardServiceUpdatePriceJobItemDetail } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/interface/inventory.product.card.service.update.price.job.item.detail.interface';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { InventoryProductCardService } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/dto/tcgdb.mtg.price.current.dto';
import { PriceRuleProductCardBaseService } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.service';

@Injectable()
export class InventoryProductCardServiceUpdatePriceJobItemService {

    constructor(
        @InjectRepository(InventoryProductCardServiceUpdatePriceJobItem) private inventoryProductCardServiceUpdatePriceJobItemRepository: Repository<InventoryProductCardServiceUpdatePriceJobItem>,
        private productCardService: ProductCardService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productLanguageService: ProductLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
    ) { }

    async getInventoryProductCardServiceUpdatePriceJobItemsByJobId(inventoryProductCardServiceUpdatePriceJobId: string) {

        let inventoryProductCardServiceUpdatePriceJobItemDTOs: InventoryProductCardServiceUpdatePriceJobItemDTO[] = [];

        let inventoryProductCardServiceUpdatePriceJobItems = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.find({
            where: {
                inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobId,
            }
        });

        for(let i = 0; i < inventoryProductCardServiceUpdatePriceJobItems.length; i++) {
            let inventoryProductCardServiceUpdatePriceJobItem = inventoryProductCardServiceUpdatePriceJobItems[i];
            let inventoryProductCardServiceUpdatePriceJobItemDTO: InventoryProductCardServiceUpdatePriceJobItemDTO = await this.createInventoryProductCardServiceUpdatePriceJobItemDTO(inventoryProductCardServiceUpdatePriceJobItem);
            
            inventoryProductCardServiceUpdatePriceJobItemDTOs.push(inventoryProductCardServiceUpdatePriceJobItemDTO);
        }

        return inventoryProductCardServiceUpdatePriceJobItemDTOs;

    }

    async getInventoryProductCardServiceUpdatePriceJobItemsBySetId(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {

        let inventoryProductCardServiceUpdatePriceJobItemDTOs: InventoryProductCardServiceUpdatePriceJobItemDTO[] = [];

        let inventoryProductCardServiceUpdatePriceJobItems = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.find({
            where: {
                commerceAccountId: inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId,
                commerceLocationId: inventoryProductCardServiceUpdatePriceJobDTO.commerceLocationId,
                productSetId: inventoryProductCardServiceUpdatePriceJobDTO.productSetId,
                productVendorId: inventoryProductCardServiceUpdatePriceJobDTO.productVendorId,
                productLineId: inventoryProductCardServiceUpdatePriceJobDTO.productLineId,
                productTypeId: inventoryProductCardServiceUpdatePriceJobDTO.productTypeId,
                productLanguageId: inventoryProductCardServiceUpdatePriceJobDTO.productLanguageId,
            }
        });

        for(let i = 0; i < inventoryProductCardServiceUpdatePriceJobItems.length; i++) {
            let inventoryProductCardServiceUpdatePriceJobItem = inventoryProductCardServiceUpdatePriceJobItems[i];
            let inventoryProductCardServiceUpdatePriceJobItemDTO: InventoryProductCardServiceUpdatePriceJobItemDTO = await this.createInventoryProductCardServiceUpdatePriceJobItemDTO(inventoryProductCardServiceUpdatePriceJobItem);
            
            inventoryProductCardServiceUpdatePriceJobItemDTOs.push(inventoryProductCardServiceUpdatePriceJobItemDTO);
        }

        return inventoryProductCardServiceUpdatePriceJobItemDTOs;

    }

    async getInventoryProductCardServiceUpdatePriceJobItemByProductCardId(inventoryProductCardServiceUpdatePriceJobId: string, productCardId: string) {
        let inventoryProductCardServiceUpdatePriceJobItem = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.findOne({
            where: {
                inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobId,
                productCardId: productCardId
            }
        });

        if(inventoryProductCardServiceUpdatePriceJobItem == null) {
            //TO DO: THROW AN ERROR;
            return null;
        }

        let inventoryProductCardServiceUpdatePriceJobItemDTO: InventoryProductCardServiceUpdatePriceJobItemDTO = await this.createInventoryProductCardServiceUpdatePriceJobItemDTO(inventoryProductCardServiceUpdatePriceJobItem);

        return inventoryProductCardServiceUpdatePriceJobItemDTO;
    }

    async getInventoryProductCardServiceUpdatePriceJobItemDetailsByJob(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {
        //GET THE PRODUCT CARDS FOR THE SET;
        let productCards = await this.productCardService.getProductCardsByProductSetId(inventoryProductCardServiceUpdatePriceJobDTO.productSetId);

        if(productCards == null) {
            //TO DO HANDLE ERROR FOR NON EXISTENT SET;
            return null;
        }

        let inventoryProductCardServiceUpdatePriceJobItemDetails: any[] = [];

        for(let i = 0; i < productCards.length; i++) {
            let productCard = productCards[i];
            let productCardDTO: ProductCardDTO = { ...productCard };

            //GET THE INVENTORY FOR THE THE PRODUCT CARD;
            let inventoryProductCardServiceUpdatePriceJobItemDTO = await this.getInventoryProductCardServiceUpdatePriceJobItemByProductCardId(inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId, productCard.productCardId);

            if(inventoryProductCardServiceUpdatePriceJobItemDTO != null) {
                let inventoryProductCardServiceUpdatePriceJobItemDetail = {
                    productCardNumber: productCardDTO.productCardNumber,
                    productCardName: productCardDTO.productCardName,
                    productCardImage: productCardDTO.productCardImage,
                    inventoryProductCardServiceUpdatePriceJobItemDTO: inventoryProductCardServiceUpdatePriceJobItemDTO
                };

                inventoryProductCardServiceUpdatePriceJobItemDetails.push(inventoryProductCardServiceUpdatePriceJobItemDetail);
            }
        }

        return inventoryProductCardServiceUpdatePriceJobItemDetails;

    }

    async createInventoryProductCardServiceUpdatePriceJobItemDTO(inventoryProductCardServiceUpdatePriceJobItem: InventoryProductCardServiceUpdatePriceJobItem) {

        let inventoryProductCardServiceUpdatePriceJobItemDTO: InventoryProductCardServiceUpdatePriceJobItemDTO = new InventoryProductCardServiceUpdatePriceJobItemDTO();
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemId = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobId = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardId = inventoryProductCardServiceUpdatePriceJobItem.productCardId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardTCGdbId = inventoryProductCardServiceUpdatePriceJobItem.productCardTCGdbId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardTCGPlayerId = inventoryProductCardServiceUpdatePriceJobItem.productCardTCGPlayerId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.commerceAccountId = inventoryProductCardServiceUpdatePriceJobItem.commerceAccountId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.commerceLocationId = inventoryProductCardServiceUpdatePriceJobItem.commerceLocationId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productVendorId = inventoryProductCardServiceUpdatePriceJobItem.productVendorId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLineId = inventoryProductCardServiceUpdatePriceJobItem.productLineId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productTypeId = inventoryProductCardServiceUpdatePriceJobItem.productTypeId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLanguageId = inventoryProductCardServiceUpdatePriceJobItem.productLanguageId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLanguageCode = inventoryProductCardServiceUpdatePriceJobItem.productLanguageCode;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productSetId = inventoryProductCardServiceUpdatePriceJobItem.productSetId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productSetCode = inventoryProductCardServiceUpdatePriceJobItem.productSetCode;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardPrintingId = inventoryProductCardServiceUpdatePriceJobItem.productCardPrintingId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardPrintingName = inventoryProductCardServiceUpdatePriceJobItem.productCardPrintingName;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails = JSON.parse(inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemDetails) as InventoryProductCardServiceUpdatePriceJobItemDetail[];
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemIsVerified = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemIsVerified;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemIsActive = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemIsActive;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemCreateDate = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemCreateDate;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemUpdateDate = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemUpdateDate;

        return inventoryProductCardServiceUpdatePriceJobItemDTO;

    }


     async createInventoryProductCardUpdatePriceJobItemPricesByJob(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {
        


    /*
    //PRICE UPDATES
    async createInventoryProductCardUpdatePriceJobItemPricesByJob(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {
        
        //GET THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardServiceUpdatePriceJobItemDTOs = await this.getInventoryProductCardServiceUpdatePriceJobItemsBySetId(inventoryProductCardServiceUpdatePriceJobDTO);
         //GET THE CURRENT PRICES FOR THE SET;
        let tcgdbMTGPriceCurrentDTOs = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentBySetCode(inventoryProductCardServiceUpdatePriceJobDTO.productSetCode);

        //GET THE BASE PRICE RULES;
        let priceRuleProductCardBaseDTO = await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId, inventoryProductCardServiceUpdatePriceJobDTO.productVendorId, inventoryProductCardServiceUpdatePriceJobDTO.productLineId, inventoryProductCardServiceUpdatePriceJobDTO.productTypeId);
        
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
            
            let inventoryProductCardServiceUpdatePriceJobItemDTO = inventoryProductCardServiceUpdatePriceJobItemDTOs.find(item => 
                item.productCardTCGdbId === productCardTCGdbId &&
                item.productCardPrintingName === productCardPrintingName
            );

            if(inventoryProductCardServiceUpdatePriceJobItemDTO != undefined) {

                if(inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemIsVerified == true) {
                    continue;
                }

                let inventoryProductCardServiceUpdatePriceJobItemDetails: InventoryProductCardServiceUpdatePriceJobItemDetail[] = inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails;
                for(let j = 0; j < inventoryProductCardServiceUpdatePriceJobItemDetails.length; j++) {
                    let inventoryProductCardServiceUpdatePriceJobItemDetail = inventoryProductCardServiceUpdatePriceJobItemDetails[j];

                    switch(inventoryProductCardServiceUpdatePriceJobItemDetail.productCardConditionCode) {
                        case 'NM':
                            let price = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseNMPercentage / 100);
                            inventoryProductCardServiceUpdatePriceJobItemDetail.inventoryProductCardItemPrice = parseFloat(price.toFixed(2));
                            break;
                        case 'LP':
                            let priceLP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseLPPercentage / 100);
                            inventoryProductCardServiceUpdatePriceJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceLP.toFixed(2));
                            break;
                        case 'MP':
                            let priceMP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseMPPercentage / 100);
                            inventoryProductCardServiceUpdatePriceJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceMP.toFixed(2));
                            break;
                        case 'HP':
                            let priceHP = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseHPPercentage / 100);
                            inventoryProductCardServiceUpdatePriceJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceHP.toFixed(2));
                            break;
                        case 'DM':
                            let priceDM = tcgdbPriceCurrent * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseDMPercentage / 100);
                            inventoryProductCardServiceUpdatePriceJobItemDetail.inventoryProductCardItemPrice = parseFloat(priceDM.toFixed(2));
                            break;
                    }

                    inventoryProductCardServiceUpdatePriceJobItemDetails[j] = inventoryProductCardServiceUpdatePriceJobItemDetail;
                    
                }
                inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails = inventoryProductCardServiceUpdatePriceJobItemDetails;
                await this.updateInventoryProductCardServiceUpdatePriceJobItem(inventoryProductCardServiceUpdatePriceJobItemDTO);
            }

        }

        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.product.card.service.update.price.job.update.status', {
            inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId,
            inventoryProductCardServiceUpdatePriceJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING_READY_FOR_REVIEW,
        });
    }
    */        

    //UPDATE INVENTORY PRODUCT CARD SERVICE CREATE JOB ITEM WITH PRICES;
    async updateInventoryProductCardServiceUpdatePriceJobItem(inventoryProductCardServiceUpdatePriceJobItemDTO: InventoryProductCardServiceUpdatePriceJobItemDTO) {
        let inventoryProductCardServiceUpdatePriceJobItem = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.findOne({
            where: {
                inventoryProductCardServiceUpdatePriceJobItemId: inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemId
            }
        });

        if(inventoryProductCardServiceUpdatePriceJobItem == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemDetails = JSON.stringify(inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails);
        inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemUpdateDate = new Date();
        inventoryProductCardServiceUpdatePriceJobItem = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.save(inventoryProductCardServiceUpdatePriceJobItem);

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

    //GET TCGDB PRICE CURRENT BY RULE;
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