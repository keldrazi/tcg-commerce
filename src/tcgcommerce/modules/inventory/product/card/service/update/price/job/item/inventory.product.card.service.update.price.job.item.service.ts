import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS } from 'src/system/constants/tcgcommerce/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.contants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardServiceUpdatePriceJobDTO } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/dto/inventory.product.card.service.update.price.job.dto';
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
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceChangeDailyDTO } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/dto/tcgdb.mtg.price.change.daily.dto';
import { PriceRuleProductCardBaseService } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.service';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';
import { CommerceLocationDTO } from 'src/tcgcommerce/modules/commerce/location/dto/commerce.location.dto';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';

@Injectable()
export class InventoryProductCardServiceUpdatePriceJobItemService {

    constructor(
        @InjectRepository(InventoryProductCardServiceUpdatePriceJobItem) private inventoryProductCardServiceUpdatePriceJobItemRepository: Repository<InventoryProductCardServiceUpdatePriceJobItem>,
        private productCardService: ProductCardService,
        private productCardConditionService: ProductCardConditionService,
        private productLanguageService: ProductLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private inventoryProductCardService: InventoryProductCardService,
        private eventEmitter: EventEmitter2,
        private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService,
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

    async getInventoryProductCardServiceUpdatePriceJobItemById(inventoryProductCardServiceUpdatePriceJobItemId: string) {
        let inventoryProductCardServiceUpdatePriceJobItem = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.findOne({
            where: {
                inventoryProductCardServiceUpdatePriceJobItemId: inventoryProductCardServiceUpdatePriceJobItemId
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
        inventoryProductCardServiceUpdatePriceJobItemDTO.productVendorId = inventoryProductCardServiceUpdatePriceJobItem.productVendorId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLineId = inventoryProductCardServiceUpdatePriceJobItem.productLineId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productTypeId = inventoryProductCardServiceUpdatePriceJobItem.productTypeId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLanguageId = inventoryProductCardServiceUpdatePriceJobItem.productLanguageId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productLanguageCode = inventoryProductCardServiceUpdatePriceJobItem.productLanguageCode;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productSetId = inventoryProductCardServiceUpdatePriceJobItem.productSetId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productSetCode = inventoryProductCardServiceUpdatePriceJobItem.productSetCode;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardPrintingId = inventoryProductCardServiceUpdatePriceJobItem.productCardPrintingId;
        inventoryProductCardServiceUpdatePriceJobItemDTO.productCardPrintingName = inventoryProductCardServiceUpdatePriceJobItem.productCardPrintingName;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails = JSON.parse(inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemDetails) as InventoryProductCardServiceUpdatePriceJobItemDetail;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemCreateDate = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemCreateDate;
        inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemUpdateDate = inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemUpdateDate;

        return inventoryProductCardServiceUpdatePriceJobItemDTO;

    }


    async createInventoryProductCardUpdatePriceJobItemsByJobs(inventoryProductCardServiceUpdatePriceJobDTOs: InventoryProductCardServiceUpdatePriceJobDTO[]) {

        for(let i = 0; i < inventoryProductCardServiceUpdatePriceJobDTOs.length; i++) {
            let inventoryProductCardServiceUpdatePriceJobDTO = await this.createInventoryProductCardUpdatePriceJobItemsByJob(inventoryProductCardServiceUpdatePriceJobDTOs[i]);
            
            if(inventoryProductCardServiceUpdatePriceJobDTO == null) {
                continue;
            }
            
            await this.updateInventoryProductCardUpdateInventoryPricesByJob(inventoryProductCardServiceUpdatePriceJobDTO);
        }

    }

    async createInventoryProductCardUpdatePriceJobItemsByJob(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {

        //GET THE BASE PRICE RULES;
        let priceRuleProductCardBaseDTO = await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId, inventoryProductCardServiceUpdatePriceJobDTO.productVendorId, inventoryProductCardServiceUpdatePriceJobDTO.productLineId, inventoryProductCardServiceUpdatePriceJobDTO.productTypeId);
        let productCardConditionDTOs = await this.productCardConditionService.getProductCardConditionsByProductLineId(inventoryProductCardServiceUpdatePriceJobDTO.productLineId);

        if(priceRuleProductCardBaseDTO == null || productCardConditionDTOs == null) {
            //TO DO: USE THE DEFAULTS;
            return;
        }

        let tcgdbPriceChangeDailyDTOs: TCGdbMTGPriceChangeDailyDTO[] = [];
        //GET THE PRICE CHANGES BASED ON THE RULE AND THE JOB SET;
        switch(priceRuleProductCardBaseDTO.priceRuleProductCardBaseOption) {
            case 'TCGPlayer Low':
                tcgdbPriceChangeDailyDTOs = await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyChangesLowBySet(inventoryProductCardServiceUpdatePriceJobDTO.productSetCode);
                break;
            case 'TCGPlayer Market':
                tcgdbPriceChangeDailyDTOs = await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyChangesMarketBySet(inventoryProductCardServiceUpdatePriceJobDTO.productSetCode);
                break;
        }

        if(tcgdbPriceChangeDailyDTOs == null) {
            return;
        }

        let inventoryProductCardServiceUpdatePriceJobItemRecordcount = 0;
        let inventoryProductCardServiceUpdatePriceJobItemIncreaseCount = 0;
        let inventoryProductCardServiceUpdatePriceJobItemDecreaseCount = 0;

        //LOOP OVER THE PRICES AND FIND THE CORRESPONDING PRODUCT CARD;
        for(let i = 0; i < tcgdbPriceChangeDailyDTOs.length; i++) {
            let tcgdbPriceChangeDailyDTO = tcgdbPriceChangeDailyDTOs[i];
            let productCardTCGdbId = tcgdbPriceChangeDailyDTO.tcgdbMTGCardId;
            let productCardDTO = await this.productCardService.getProductCardByTCGdbId(productCardTCGdbId);
            let productCardPrintingDTO = await this.productCardPrintingService.getProductCardPrintingByName(tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailySubTypeName);
            let productLanguageDTO = await this.productLanguageService.getProductLanguage(inventoryProductCardServiceUpdatePriceJobDTO.productLanguageId);
            
            if(productCardDTO == null || productCardPrintingDTO == null || productLanguageDTO == null) {
                continue;
            }

            let inventoryProductCardServiceUpdatePriceJobItem = {
                inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId,
                productCardId: productCardDTO.productCardId,
                productCardTCGdbId: productCardDTO.productCardTCGdbId,
                productCardTCGPlayerId: productCardDTO.productCardTCGPlayerId,
                commerceAccountId: inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId,
                productVendorId: inventoryProductCardServiceUpdatePriceJobDTO.productVendorId,
                productLineId: inventoryProductCardServiceUpdatePriceJobDTO.productLineId,
                productTypeId: inventoryProductCardServiceUpdatePriceJobDTO.productTypeId,
                productLanguageId: inventoryProductCardServiceUpdatePriceJobDTO.productLanguageId,
                productLanguageCode: inventoryProductCardServiceUpdatePriceJobDTO.productLanguageCode,
                productSetId: inventoryProductCardServiceUpdatePriceJobDTO.productSetId,
                productSetCode: inventoryProductCardServiceUpdatePriceJobDTO.productSetCode,
                productCardPrintingId: productCardPrintingDTO.productCardPrintingId,
                productCardPrintingName: productCardPrintingDTO.productCardPrintingName,
                inventoryProductCardServiceUpdatePriceJobItemDetails: '',
            }

            let inventoryProductCardServiceUpdatePriceJobItemDetail: InventoryProductCardServiceUpdatePriceJobItemDetail = {} as InventoryProductCardServiceUpdatePriceJobItemDetail;
            switch(priceRuleProductCardBaseDTO.priceRuleProductCardBaseOption) {
                case 'TCGPlayer Low':
                    inventoryProductCardServiceUpdatePriceJobItemDetail = {
                        inventoryProductCardItemPrice: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyCurrentLowPrice,
                        inventoryProductCardItemPreviousPrice: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyPreviousLowPrice,
                        inventoryProductCardItemPreviousDifference: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyLowPriceDifference,
                        inventoryProductCardItemPreviousPricePercentage: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyLowPricePercentage
                    };

                    if(tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyLowPriceDifference > 0) {
                        inventoryProductCardServiceUpdatePriceJobItemIncreaseCount++;
                    }
                    else {
                        inventoryProductCardServiceUpdatePriceJobItemDecreaseCount++;
                    }

                    break;
                case 'TCGPlayer Market':
                    inventoryProductCardServiceUpdatePriceJobItemDetail = {
                        inventoryProductCardItemPrice: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyCurrentMarketPrice,
                        inventoryProductCardItemPreviousPrice: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyPreviousMarketPrice,
                        inventoryProductCardItemPreviousDifference: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyMarketPriceDifference,
                        inventoryProductCardItemPreviousPricePercentage: tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyMarketPricePercentage
                    };

                    if(tcgdbPriceChangeDailyDTO.tcgdbMTGPriceChangeDailyMarketPriceDifference > 0) {
                        inventoryProductCardServiceUpdatePriceJobItemIncreaseCount++;
                    }
                    else {
                        inventoryProductCardServiceUpdatePriceJobItemDecreaseCount++;
                    }
                    break;
            }
            
            
            

            inventoryProductCardServiceUpdatePriceJobItem.inventoryProductCardServiceUpdatePriceJobItemDetails = JSON.stringify([inventoryProductCardServiceUpdatePriceJobItemDetail]);

            let newInventoryProductCardServiceUpdatePriceJobItem = this.inventoryProductCardServiceUpdatePriceJobItemRepository.create({ ...inventoryProductCardServiceUpdatePriceJobItem });
            newInventoryProductCardServiceUpdatePriceJobItem = await this.inventoryProductCardServiceUpdatePriceJobItemRepository.save(newInventoryProductCardServiceUpdatePriceJobItem);

            inventoryProductCardServiceUpdatePriceJobItemRecordcount++;

        }

        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.product.card.service.update.price.job.update.status', {
            inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId,
            inventoryProductCardServiceUpdatePriceJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING,
            inventoryProductCardServiceUpdatePriceJobCount: inventoryProductCardServiceUpdatePriceJobItemRecordcount,
            inventoryProductCardServiceUpdatePriceJobIncreaseCount: inventoryProductCardServiceUpdatePriceJobItemIncreaseCount,
            inventoryProductCardServiceUpdatePriceJobDecreaseCount: inventoryProductCardServiceUpdatePriceJobItemDecreaseCount,
        });

        return inventoryProductCardServiceUpdatePriceJobDTO;


    }  

    //INVENTORY PRICE UPDATES BASED ON PRICE RULES;
    async updateInventoryProductCardUpdateInventoryPricesByJob(inventoryProductCardServiceUpdatePriceJobDTO: InventoryProductCardServiceUpdatePriceJobDTO) {

        let commerceAccountId = inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId;
        let commerceLocationDTOs = JSON.parse(inventoryProductCardServiceUpdatePriceJobDTO.commerceLocations) as CommerceLocationDTO[];
        let productCardConditionDTOs = await this.productCardConditionService.getProductCardConditionsByProductLineId(inventoryProductCardServiceUpdatePriceJobDTO.productLineId);
        let priceRuleProductCardBaseDTO = await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(inventoryProductCardServiceUpdatePriceJobDTO.commerceAccountId, inventoryProductCardServiceUpdatePriceJobDTO.productVendorId, inventoryProductCardServiceUpdatePriceJobDTO.productLineId, inventoryProductCardServiceUpdatePriceJobDTO.productTypeId);
        
        if(priceRuleProductCardBaseDTO == null || productCardConditionDTOs == null) {
            return;
        }

        let inventoryProductCardServiceUpdatePriceJobItemDTOs = await this.getInventoryProductCardServiceUpdatePriceJobItemsByJobId(inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId);

        for(let i = 0; i < inventoryProductCardServiceUpdatePriceJobItemDTOs.length; i++) {
            let inventoryProductCardServiceUpdatePriceJobItemDTO = inventoryProductCardServiceUpdatePriceJobItemDTOs[i];
            let inventoryProductCardServiceUpdatePriceJobItemDetails = inventoryProductCardServiceUpdatePriceJobItemDTO.inventoryProductCardServiceUpdatePriceJobItemDetails;

            //UPDATE THE INVENTORY PRODUCT CARD PRICES FOR EACH LOCATION;
            for(let j = 0; j < commerceLocationDTOs.length; j++) {
                let commerceLocationDTO = commerceLocationDTOs[j];
                let inventoryProductCardDTO = await this.inventoryProductCardService.getInventoryProductCardByProductCardPrintingId(commerceAccountId, commerceLocationDTO.commerceLocationId, inventoryProductCardServiceUpdatePriceJobItemDTO.productCardId, inventoryProductCardServiceUpdatePriceJobItemDTO.productCardPrintingId,inventoryProductCardServiceUpdatePriceJobItemDTO.productLanguageId);
                
                if(inventoryProductCardDTO == null) {
                    continue;
                }

                for(let k = 0; k < inventoryProductCardDTO.inventoryProductCardItems.length; k++) {
                    let inventoryProductCardItem = inventoryProductCardDTO.inventoryProductCardItems[k];

                    if(inventoryProductCardItem == null) {
                        continue;
                    }
                    if(!inventoryProductCardItem.inventoryProductCardItemOverridePriceEnabled) {
                        switch(inventoryProductCardItem.productCardConditionCode) {
                            case 'NM':
                                let priceNM = inventoryProductCardServiceUpdatePriceJobItemDetails.inventoryProductCardItemPrice * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseNMPercentage / 100);
                                inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceNM.toFixed(2));
                                break;
                            case 'LP':
                                let priceLP = inventoryProductCardServiceUpdatePriceJobItemDetails.inventoryProductCardItemPrice * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseLPPercentage / 100);
                                inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceLP.toFixed(2));
                                break;
                            case 'MP':
                                let priceMP = inventoryProductCardServiceUpdatePriceJobItemDetails.inventoryProductCardItemPrice * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseMPPercentage / 100);
                                inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceMP.toFixed(2));
                                break;
                            case 'HP':
                                let priceHP = inventoryProductCardServiceUpdatePriceJobItemDetails.inventoryProductCardItemPrice * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseHPPercentage / 100);
                                inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceHP.toFixed(2));
                                break;
                            case 'DM':
                                let priceDM = inventoryProductCardServiceUpdatePriceJobItemDetails.inventoryProductCardItemPrice * (priceRuleProductCardBaseDTO.priceRuleProductCardBaseDMPercentage / 100);
                                inventoryProductCardItem.inventoryProductCardItemPrice = parseFloat(priceDM.toFixed(2));
                                break;
                        }
                        
                        inventoryProductCardDTO.inventoryProductCardItems[k] = inventoryProductCardItem;
                    }
                }

                await this.inventoryProductCardService.updateInventoryProductCard(inventoryProductCardDTO);

            }
        }

        //EMIT THE EVENT TO UPDATE THE JOB STATUS;
        this.eventEmitter.emit('inventory.product.card.service.update.price.job.update.status', {
            inventoryProductCardServiceUpdatePriceJobId: inventoryProductCardServiceUpdatePriceJobDTO.inventoryProductCardServiceUpdatePriceJobId,
            inventoryProductCardServiceUpdatePriceJobStatus: INVENTORY_PRODUCT_CARD_SERVICE_UPDATE_PRICE_JOB_STATUS.PROCESSING_COMPLETE,
        });

        return inventoryProductCardServiceUpdatePriceJobDTO;
    }
        
}