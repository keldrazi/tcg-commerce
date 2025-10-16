import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS } from 'src/system/constants/tcgcommerce/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.contants';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryBatchLoadJobProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/job/product/card/dto/inventory.batch.load.job.product.card.dto';
import { InventoryBatchLoadProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/dto/inventory.batch.load.product.card.dto';
import { InventoryBatchLoadProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.entity';
import { InventoryBatchLoadProductCardItem } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/interface/inventory.batch.load.product.card.item.interface';
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

@Injectable()
export class InventoryBatchLoadProductCardService {

    constructor(
        @InjectRepository(InventoryBatchLoadProductCard) private inventoryBatchLoadProductCardRepository: Repository<InventoryBatchLoadProductCard>,
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
    ) { }



    async getInventoryBatchLoadProductCardsBySetId(inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO) {

        let inventoryBatchLoadProductCardDTOs: InventoryBatchLoadProductCardDTO[] = [];

        let inventoryBatchLoadProductCards = await this.inventoryBatchLoadProductCardRepository.find({
            where: {
                commerceAccountId: inventoryBatchLoadJobProductCardDTO.commerceAccountId,
                commerceLocationId: inventoryBatchLoadJobProductCardDTO.commerceLocationId,
                productSetId: inventoryBatchLoadJobProductCardDTO.productSetId,
                productVendorId: inventoryBatchLoadJobProductCardDTO.productVendorId,
                productLineId: inventoryBatchLoadJobProductCardDTO.productLineId,
                productTypeId: inventoryBatchLoadJobProductCardDTO.productTypeId,
                productLanguageId: inventoryBatchLoadJobProductCardDTO.productLanguageId,
            }
        });

        for(let i = 0; i < inventoryBatchLoadProductCards.length; i++) {
            let inventoryBatchLoadProductCard = inventoryBatchLoadProductCards[i];
            let inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO = await this.createInventoryBatchLoadProductCardDTO(inventoryBatchLoadProductCard);
            
            inventoryBatchLoadProductCardDTOs.push(inventoryBatchLoadProductCardDTO);
        }

        return inventoryBatchLoadProductCardDTOs;

    }

    async getInventoryBatchLoadProductCardByProductCardId(productCardId: string) {
        let inventoryBatchLoadProductCard = await this.inventoryBatchLoadProductCardRepository.findOne({
            where: {
                productCardId: productCardId
            }
        });

        if(inventoryBatchLoadProductCard == null) {
            //TO DO: THROW AN ERROR;
            return null;
        }

        let inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO = await this.createInventoryBatchLoadProductCardDTO(inventoryBatchLoadProductCard);

        return inventoryBatchLoadProductCardDTO;
    }

    async getUnverifiedInventoryBatchLoadProductCardByProductCardId(productCardId: string) {
        let inventoryBatchLoadProductCard = await this.inventoryBatchLoadProductCardRepository.findOne({
            where: {
                productCardId: productCardId,
                inventoryBatchLoadProductCardIsActive: false
            }
        });

        if(inventoryBatchLoadProductCard == null) {
            //TO DO: THROW AN ERROR;
            return null;
        }

        let inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO = await this.createInventoryBatchLoadProductCardDTO(inventoryBatchLoadProductCard);

        return inventoryBatchLoadProductCardDTO;
    }

    async createInventoryBatchLoadProductCardDTO(inventoryBatchLoadProductCard: InventoryBatchLoadProductCard) {

        let inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO = new InventoryBatchLoadProductCardDTO();
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardId = inventoryBatchLoadProductCard.inventoryBatchLoadProductCardId;
        inventoryBatchLoadProductCardDTO.productCardId = inventoryBatchLoadProductCard.productCardId;
        inventoryBatchLoadProductCardDTO.productCardTCGdbId = inventoryBatchLoadProductCard.productCardTCGdbId;
        inventoryBatchLoadProductCardDTO.productCardTCGPlayerId = inventoryBatchLoadProductCard.productCardTCGPlayerId;
        inventoryBatchLoadProductCardDTO.commerceAccountId = inventoryBatchLoadProductCard.commerceAccountId;
        inventoryBatchLoadProductCardDTO.commerceLocationId = inventoryBatchLoadProductCard.commerceLocationId;
        inventoryBatchLoadProductCardDTO.productVendorId = inventoryBatchLoadProductCard.productVendorId;
        inventoryBatchLoadProductCardDTO.productLineId = inventoryBatchLoadProductCard.productLineId;
        inventoryBatchLoadProductCardDTO.productTypeId = inventoryBatchLoadProductCard.productTypeId;
        inventoryBatchLoadProductCardDTO.productLanguageId = inventoryBatchLoadProductCard.productLanguageId;
        inventoryBatchLoadProductCardDTO.productLanguageCode = inventoryBatchLoadProductCard.productLanguageCode;
        inventoryBatchLoadProductCardDTO.productSetId = inventoryBatchLoadProductCard.productSetId;
        inventoryBatchLoadProductCardDTO.productSetCode = inventoryBatchLoadProductCard.productSetCode;
        inventoryBatchLoadProductCardDTO.productCardPrintingId = inventoryBatchLoadProductCard.productCardPrintingId;
        inventoryBatchLoadProductCardDTO.productCardPrintingName = inventoryBatchLoadProductCard.productCardPrintingName;
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardItems = JSON.parse(inventoryBatchLoadProductCard.inventoryBatchLoadProductCardItems) as InventoryBatchLoadProductCardItem[];
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardIsVerified = inventoryBatchLoadProductCard.inventoryBatchLoadProductCardIsVerified;
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardIsActive = inventoryBatchLoadProductCard.inventoryBatchLoadProductCardIsActive;
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardCreateDate = inventoryBatchLoadProductCard.inventoryBatchLoadProductCardCreateDate;
        inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardUpdateDate = inventoryBatchLoadProductCard.inventoryBatchLoadProductCardUpdateDate;

        return inventoryBatchLoadProductCardDTO;

    }

    async createInventoryBatchLoadProductCardsBySetId(inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO) {
        //GET THE PRODUCT SET BY CODE;
        let productSet = await this.productSetService.getProductSet(inventoryBatchLoadJobProductCardDTO.productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productSet == null) {
            return null;
        }

        this.eventEmitter.emit(
            'inventory.batch.load.job.product.card.update.status',
            {
                inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId,
                inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARDS
            }
        )


        //CREATE THE BATCH INVENTORY PRODUCT CARDS BY SET;
        let inventoryBatchLoadProductCardDTOs = await this.createInventoryBatchLoadProductCardsBySet(inventoryBatchLoadJobProductCardDTO);
        
        if(inventoryBatchLoadProductCardDTOs == null) {
            this.eventEmitter.emit(
                'inventory.batch.load.job.product.card.update.status',
                {
                    inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId,
                    inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_FAILED,
                }
            )            
        }
        else {
            this.eventEmitter.emit(
                'inventory.batch.load.job.product.card.update.status',
                {
                    inventoryBatchLoadJobProductCardId: inventoryBatchLoadJobProductCardDTO.inventoryBatchLoadJobProductCardId,
                    inventoryBatchLoadJobProductCardStatus: INVENTORY_BATCH_LOAD_JOB_PRODUCT_CARD_STATUS.PROCESSING_INVENTORY_CARDS_COMPLETE,
                    inventoryBatchLoadJobProductCardCount: inventoryBatchLoadProductCardDTOs.length
                }
            )            
        }

    }

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/COMMERCE LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createInventoryBatchLoadProductCardsBySet(inventoryBatchLoadJobProductCardDTO: InventoryBatchLoadJobProductCardDTO) {

        //GET THE COMMERCE LOCATION;
        let commerceLocation = await this.commerceLocationService.getCommerceLocation(inventoryBatchLoadJobProductCardDTO.commerceLocationId);
        let productVendor = await this.productVendorService.getProductVendor(inventoryBatchLoadJobProductCardDTO.productVendorId);
        let productLine = await this.productLineService.getProductLine(inventoryBatchLoadJobProductCardDTO.productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (commerceLocation == null || productVendor == null || productLine == null) {
            return null;
        }


        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(inventoryBatchLoadJobProductCardDTO.productLineId);
        let productLanguage = await this.productLanguageService.getProductLanguage(inventoryBatchLoadJobProductCardDTO.productLanguageId);
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(inventoryBatchLoadJobProductCardDTO.productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productLanguage == null || productCardPrintings == null) {
            return null;
        }

        let productSet = await this.productSetService.getProductSet(inventoryBatchLoadJobProductCardDTO.productSetId);
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
        let inventoryBatchLoadProductCardDTOs: InventoryBatchLoadProductCardDTO[] = [];
        
        //LOOP OVER EACH PRODUCT CARD AND CREATE THE INVENTORY PRODUCT CARD;
        for (let i = 0; i < productCards.length; i++) {
            console.log('Creating Inventory Product Card for: ' + productCards[i].productCardName);
            //TO DO: CHECK TO SEE IF THE INVENTORY PRODUCT CARD ALREADY EXISTS FOR THE COMMERCE ACCOUNT/COMMERCE LOCATION/PRODUCT CARD/PRODUCT CARD LANGUAGE;
            let existingInventoryProductCard = await this.inventoryProductCardService.getInventoryProductCardByCardId(productCards[i].productCardId, inventoryBatchLoadJobProductCardDTO.commerceAccountId, inventoryBatchLoadJobProductCardDTO.commerceLocationId, productLanguage.productLanguageId);

            if(existingInventoryProductCard != null) {
                console.log('Inventory Product Card already exists for: ' + productCards[i].productCardName + ' - Skipping Creation');
                continue;
            }

            let productCard: ProductCardDTO = productCards[i];
            
            let inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO = new InventoryBatchLoadProductCardDTO();
            inventoryBatchLoadProductCardDTO.productCardId = productCard.productCardId;
            inventoryBatchLoadProductCardDTO.productCardTCGdbId = productCard.productCardTCGdbId;
            inventoryBatchLoadProductCardDTO.productCardTCGPlayerId = productCard.productCardTCGPlayerId;
            inventoryBatchLoadProductCardDTO.commerceAccountId = inventoryBatchLoadJobProductCardDTO.commerceAccountId;
            inventoryBatchLoadProductCardDTO.commerceLocationId = inventoryBatchLoadJobProductCardDTO.commerceLocationId;
            inventoryBatchLoadProductCardDTO.productVendorId = inventoryBatchLoadJobProductCardDTO.productVendorId;
            inventoryBatchLoadProductCardDTO.productLineId = inventoryBatchLoadJobProductCardDTO.productLineId;
            inventoryBatchLoadProductCardDTO.productTypeId = inventoryBatchLoadJobProductCardDTO.productTypeId;
            inventoryBatchLoadProductCardDTO.productLanguageId = productLanguage.productLanguageId;
            inventoryBatchLoadProductCardDTO.productLanguageCode = productLanguage.productLanguageCode;
            inventoryBatchLoadProductCardDTO.productSetId = productSet.productSetId;
            inventoryBatchLoadProductCardDTO.productSetCode = productSet.productSetCode;
            inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardIsVerified = false;
            inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardIsActive = true;

            for(let j = 0; j < productCardPrintings.length; j++) {
                let productCardPrinting = productCardPrintings[j];
               
                let productCardSKUByPrinting = await this.getProductCardTCGPlayerSKUByPrinting(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId);
                //IF THE PRODUCT CARD SKU BY PRINTING IS NULL, THEN SKIP THIS PRINTING AS IT DOES NOT EXIST;
                if (productCardSKUByPrinting == null) {
                    continue;
                }
                inventoryBatchLoadProductCardDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
                inventoryBatchLoadProductCardDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;

                let inventoryBatchLoadProductCardItems: InventoryBatchLoadProductCardItem[] = [];
                for(let k = 0; k < productCardConditions.length; k++) {
                    
                    let productCardCondition = productCardConditions[k];
                    let inventoryProductCardItemTCGPlayerSKU = await this.getProductCardTCGPlayerSKUByCondition(productCard.productCardSKUs, productLanguage.productLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);
                    if(inventoryProductCardItemTCGPlayerSKU == null) {
                        continue;
                    }

                    let inventoryBatchLoadProductCardItem: InventoryBatchLoadProductCardItem = {
                        productCardConditionCode: productCardCondition.productCardConditionCode,
                        inventoryBatchLoadProductCardItemTCGPlayerSKU: inventoryProductCardItemTCGPlayerSKU,
                        inventoryBatchLoadProductCardItemSKU: '',
                        inventoryBatchLoadProductCardItemQty: 0,
                        inventoryBatchLoadProductCardItemMaxQty: 0,
                        inventoryBatchLoadProductCardItemReserveQty: 0,
                        inventoryBatchLoadProductCardItemPrice: 0,
                        inventoryBatchLoadProductCardItemOverridePriceEnabled: false,
                        inventoryBatchLoadProductCardItemOverridePrice: 0,
                    };

                    inventoryBatchLoadProductCardItems.push(inventoryBatchLoadProductCardItem);
                }

                let newInventoryBatchLoadProductCard = this.inventoryBatchLoadProductCardRepository.create({
                    productCardId: productCard.productCardId,
                    productCardTCGdbId: productCard.productCardTCGdbId,
                    productCardTCGPlayerId: productCard.productCardTCGPlayerId,
                    commerceAccountId: inventoryBatchLoadJobProductCardDTO.commerceAccountId,
                    commerceLocationId: inventoryBatchLoadJobProductCardDTO.commerceLocationId,
                    productVendorId: inventoryBatchLoadJobProductCardDTO.productVendorId,
                    productLineId: inventoryBatchLoadJobProductCardDTO.productLineId,
                    productTypeId: inventoryBatchLoadJobProductCardDTO.productTypeId,
                    productLanguageId: inventoryBatchLoadJobProductCardDTO.productLanguageId,
                    productLanguageCode: productLanguage.productLanguageCode,
                    productSetId: productSet.productSetId,
                    productSetCode: productSet.productSetCode,
                    productCardPrintingId: productCardPrinting.productCardPrintingId,
                    productCardPrintingName: productCardPrinting.productCardPrintingName,
                    inventoryBatchLoadProductCardItems: JSON.stringify(inventoryBatchLoadProductCardItems),
                    inventoryBatchLoadProductCardIsVerified: false,
                    inventoryBatchLoadProductCardIsActive: true,
                });

                await this.inventoryBatchLoadProductCardRepository.save(newInventoryBatchLoadProductCard);
                inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardId = newInventoryBatchLoadProductCard.inventoryBatchLoadProductCardId;
                inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardItems = inventoryBatchLoadProductCardItems;

                inventoryBatchLoadProductCardDTOs.push(inventoryBatchLoadProductCardDTO);
            
            }
        }

        return inventoryBatchLoadProductCardDTOs;
        
    }

    async updateInventoryBatchLoadProductCard(inventoryBatchLoadProductCardDTO: InventoryBatchLoadProductCardDTO) {
        let inventoryBatchLoadProductCard = await this.inventoryBatchLoadProductCardRepository.findOne({
            where: {
                inventoryBatchLoadProductCardId: inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardId
            }
        });

        if(inventoryBatchLoadProductCard == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        inventoryBatchLoadProductCard.inventoryBatchLoadProductCardItems = JSON.stringify(inventoryBatchLoadProductCardDTO.inventoryBatchLoadProductCardItems);
        inventoryBatchLoadProductCard.inventoryBatchLoadProductCardUpdateDate = new Date();
        inventoryBatchLoadProductCard = await this.inventoryBatchLoadProductCardRepository.save(inventoryBatchLoadProductCard);

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