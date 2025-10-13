import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.contants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { CommerceLocationService } from 'src/tcgcommerce/modules/commerce/location/commerce.location.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductSetDTO } from 'src/tcgcommerce/modules/product/set/dto/product.set.dto';

@Injectable()
export class InventoryBatchLoadProductCardService {

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
        private productCardService: ProductCardService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productLanguageService: ProductLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private commerceLocationService: CommerceLocationService,
        private eventEmitter: EventEmitter2,
    ) { }



    async getBatchInventoryProductCardsBySetId(commerceAccountId: string, commerceLocationId: string,productSetId: string, productVendorId: string, productLineId: string, productTypeId: string, productLanguageId: string) {

        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        
        let inventoryProductCards = await this.inventoryProductCardRepository.find({
            where: {
                commerceAccountId: commerceAccountId,
                commerceLocationId: commerceLocationId,
                productSetId: productSetId,
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId,
                productLanguageId: productLanguageId,
            }
        });

        for(let i = 0; i < inventoryProductCards.length; i++) {
            let inventoryProductCard = inventoryProductCards[i];
            let inventoryProductCardDTO: InventoryProductCardDTO = new InventoryProductCardDTO();
            inventoryProductCardDTO.inventoryProductCardId = inventoryProductCard.inventoryProductCardId;
            inventoryProductCardDTO.productCardId = inventoryProductCard.productCardId;
            inventoryProductCardDTO.productCardTCGdbId = inventoryProductCard.productCardTCGdbId;
            inventoryProductCardDTO.productCardTCGPlayerId = inventoryProductCard.productCardTCGPlayerId;
            inventoryProductCardDTO.commerceAccountId = inventoryProductCard.commerceAccountId;
            inventoryProductCardDTO.commerceLocationId = inventoryProductCard.commerceLocationId;
            inventoryProductCardDTO.productVendorId = inventoryProductCard.productVendorId;
            inventoryProductCardDTO.productLineId = inventoryProductCard.productLineId;
            inventoryProductCardDTO.productTypeId = inventoryProductCard.productTypeId;
            inventoryProductCardDTO.productLanguageId = inventoryProductCard.productLanguageId;
            inventoryProductCardDTO.productLanguageCode = inventoryProductCard.productLanguageCode;
            inventoryProductCardDTO.productSetId = inventoryProductCard.productSetId;
            inventoryProductCardDTO.productSetCode = inventoryProductCard.productSetCode;
            inventoryProductCardDTO.productCardPrintingId = inventoryProductCard.productCardPrintingId;
            inventoryProductCardDTO.productCardPrintingName = inventoryProductCard.productCardPrintingName;
            inventoryProductCardDTO.inventoryProductCardItems = JSON.parse(inventoryProductCard.inventoryProductCardItems) as InventoryProductCardItem[];
            inventoryProductCardDTO.inventoryProductCardCreateDate = inventoryProductCard.inventoryProductCardCreateDate;
            inventoryProductCardDTO.inventoryProductCardUpdateDate = inventoryProductCard.inventoryProductCardUpdateDate;
            
            inventoryProductCardDTOs.push(inventoryProductCardDTO);
        }

        return inventoryProductCardDTOs;

    }


    async createBatchInventoryProductCardsBySetId(inventoryBatchLoadJobProductCardId:string, commerceAccountId: string, commerceLocationId: string,productSetId: string, productVendorId: string, productLineId: string, productTypeId: string, productLanguageId: string) {
        //GET THE PRODUCT SET BY CODE;
        let productSet = await this.productSetService.getProductSet(productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productSet == null) {
            return null;
        }

        this.eventEmitter.emit(
            'inventory.batch.load.job.card.update.status',
            {
                inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId,
                inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARDS
            }
        )


        //CREATE THE BATCH INVENTORY PRODUCT CARDS BY SET;
        let inventoryProductCardDTOs = await this.createBatchInventoryProductCardsBySet(inventoryBatchLoadJobProductCardId, commerceAccountId, commerceLocationId, productSetId, productVendorId, productLineId, productTypeId, productLanguageId);
        
        if(inventoryProductCardDTOs == null) {
            this.eventEmitter.emit(
                'inventory.batch.load.job.card.update.status',
                {
                    inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId,
                    inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_FAILED,
                }
            )            
        }
        else {
            this.eventEmitter.emit(
                'inventory.batch.load.job.card.update.status',
                {
                    inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardId,
                    inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE,
                    inventoryBatchLoadJobProductCardCount: inventoryProductCardDTOs.length
                }
            )            
        }

    }

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/COMMERCE LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createBatchInventoryProductCardsBySet(inventoryBatchLoadJobProductCardId:string, commerceAccountId: string, commerceLocationId: string, productSetId: string, productVendorId: string, productLineId: string, productTypeId:string, productLanguageId: string) {

        //GET THE COMMERCE LOCATION;
        let commerceLocation = await this.commerceLocationService.getCommerceLocation(commerceLocationId);
        let productVendor = await this.productVendorService.getProductVendor(productVendorId);
        let productLine = await this.productLineService.getProductLine(productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (commerceLocation == null || productVendor == null || productLine == null) {
            return null;
        }


        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(productLineId);
        let productLanguage = await this.productLanguageService.getProductLanguage(productLanguageId);
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productLanguage == null || productCardPrintings == null) {
            return null;
        }

        let productSet = await this.productSetService.getProductSet(productSetId);
        if(productSet == null) {
            return null;
        }

        //GET THE PRODUCT CARDS FOR THE SET;
        let productCards = await this.productCardService.getProductCardsByProductSetId(productSet.productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productCards == null) {
            return null;
        }

        //CREATE THE ARRAY TO HOLD THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        
        //LOOP OVER EACH PRODUCT CARD AND CREATE THE INVENTORY PRODUCT CARD;
        for (let i = 0; i < productCards.length; i++) {
            console.log('Creating Inventory Product Card for: ' + productCards[i].productCardName);
            //TO DO: CHECK TO SEE IF THE INVENTORY PRODUCT CARD ALREADY EXISTS FOR THE COMMERCE ACCOUNT/COMMERCE LOCATION/PRODUCT CARD/PRODUCT CARD LANGUAGE;

            let productCard: ProductCardDTO = productCards[i];
            
            let inventoryProductCardDTO: InventoryProductCardDTO = new InventoryProductCardDTO();
            inventoryProductCardDTO.productCardId = productCard.productCardId;
            inventoryProductCardDTO.productCardTCGdbId = productCard.productCardTCGdbId;
            inventoryProductCardDTO.productCardTCGPlayerId = productCard.productCardTCGPlayerId;
            inventoryProductCardDTO.commerceAccountId = commerceAccountId;
            inventoryProductCardDTO.commerceLocationId = commerceLocationId;
            inventoryProductCardDTO.productVendorId = productVendorId;
            inventoryProductCardDTO.productLineId = productLineId;
            inventoryProductCardDTO.productTypeId = productTypeId;
            inventoryProductCardDTO.productLanguageId = productLanguage.productLanguageId;
            inventoryProductCardDTO.productLanguageCode = productLanguage.productLanguageCode;
            inventoryProductCardDTO.productSetId = productSet.productSetId;
            inventoryProductCardDTO.productSetCode = productSet.productSetCode;
            
            for(let j = 0; j < productCardPrintings.length; j++) {
                let productCardPrinting = productCardPrintings[j];
               
                let productCardSKUByPrinting = await this.getProductCardTCGPlayerSKUByPrinting(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId);
                //IF THE PRODUCT CARD SKU BY PRINTING IS NULL, THEN SKIP THIS PRINTING AS IT DOES NOT EXIST;
                if (productCardSKUByPrinting == null) {
                    continue;
                }
                inventoryProductCardDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
                inventoryProductCardDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;

                let inventoryProductCardItems: InventoryProductCardItem[] = [];
                for(let k = 0; k < productCardConditions.length; k++) {
                    
                    let productCardCondition = productCardConditions[k];
                    let inventoryProductCardItemTCGPlayerSKU = await this.getProductCardTCGPlayerSKUByCondition(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);
                    if(inventoryProductCardItemTCGPlayerSKU == null) {
                        continue;
                    }

                    let inventoryProductCardItem: InventoryProductCardItem = {
                        productCardConditionCode: productCardCondition.productCardConditionCode,
                        inventoryProductCardItemTCGPlayerSKU: inventoryProductCardItemTCGPlayerSKU,
                        inventoryProductCardItemSKU: '',
                        inventoryProductCardItemQty: 0,
                        inventoryProductCardItemMaxQty: 0,
                        inventoryProductCardItemReserveQty: 0,
                        inventoryProductCardItemPrice: 0,
                        inventoryProductCardItemOverridePriceEnabled: false,
                        inventoryProductCardItemOverridePrice: 0,
                    };
                    
                    inventoryProductCardItems.push(inventoryProductCardItem);
                }

                let newInventoryProductCard = this.inventoryProductCardRepository.create({
                    productCardId: productCard.productCardId,
                    productCardTCGdbId: productCard.productCardTCGdbId,
                    productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                    commerceAccountId: commerceAccountId,
                    commerceLocationId: commerceLocationId,
                    productVendorId: productVendorId,
                    productLineId: productLineId,
                    productTypeId: productTypeId,
                    productLanguageId: productLanguage.productLanguageId,
                    productLanguageCode: productLanguage.productLanguageCode,
                    productSetId: productSet.productSetId,
                    productSetCode: productSet.productSetCode,
                    productCardPrintingId: productCardPrinting.productCardPrintingId,
                    productCardPrintingName: productCardPrinting.productCardPrintingName,
                    inventoryProductCardItems: JSON.stringify(inventoryProductCardItems)
                });

                await this.inventoryProductCardRepository.save(newInventoryProductCard);
                inventoryProductCardDTO.inventoryProductCardId = newInventoryProductCard.inventoryProductCardId;
                inventoryProductCardDTO.inventoryProductCardItems = inventoryProductCardItems;

                inventoryProductCardDTOs.push(inventoryProductCardDTO);
            
            }
        }

        return inventoryProductCardDTOs;
        
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
    
    
}