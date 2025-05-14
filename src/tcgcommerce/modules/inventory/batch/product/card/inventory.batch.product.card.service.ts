import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryBatchProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/product/card/dto/inventory.batch.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { ProductCardItemService } from 'src/tcgcommerce/modules/product/card/item/product.card.item.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductCardLanguageService } from 'src/tcgcommerce/modules/product/card/language/product.card.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';


@Injectable()
export class InventoryBatchProductCardService {

    

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
        private productCardItemService: ProductCardItemService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productCardLanguageService: ProductCardLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService,
    ) { }

    

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createBatchInventoryProductCards(productVendorId: string, productLineId: string, productCardLanguageAbbreviation: string, commerceAccountId: string, commerceLocationId: string) {
        
        //GET THE PRODUCT SETS;
        let productSets = await this.getProductSetsByProductLineId(productLineId);
         //TO DO: CREATE AN ERROR TO RETURN;
        if (productSets == null) {
            return null;
        }

        let productCardConditions = await this.getProductCardConditionsByProductLineId(productLineId);
        let productCardLanguageId = await this.getProductCardLanguageIdByAbbreviationAndProductLineId(productCardLanguageAbbreviation, productLineId);
        let productCardPrintings = await this.getProductCardPrintingsByProductLineId(productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productCardLanguageId == null || productCardPrintings == null) {
            return null;
        }

        //LOOP OVER THE PRODUCT SETS AND GET THE PRODUCT CARD ITEMS;
        for (let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetId = productSet.productSetId;
            let productCardItems = await this.productCardItemService.getProductCardItemsByProductSetId(productSetId);
            
            //TO DO: CREATE AN ERROR TO RETURN;
            if (productCardItems == null) {
                return null;
            }

            //LOOP OVER THE PRODUCT CARD ITEMS AND CREATE THE INVENTORY PRODUCT CARDS;
            for (let j = 0; j < productCardItems.length; j++) {
                let productCardItem = productCardItems[j];
                //GET THE CURRENT TCGDB PRICES;
                let productCardItemPrice = await this.tcgdbMTGPriceCurrentService.getTCGdbMTGPricesCurrentByCardId(productCardItem.productCardItemTCGdbId);

                //LOOP OVER EACH PRODUCT CARD PRINTING;
                for(let k = 0; k < productCardPrintings.length; k++) {
                    let productCardPrinting = productCardPrintings[k];


                    //LOOP OVER EACH PRODUCT CARD CONDITION;
                    for(let l = 0; l < productCardConditions.length; l++) {
                        let productCardCondition = productCardConditions[l];
                        let tcgPlayerCleanName = productCardItem.productCardItemCleanName;
                        let tcgPlayerSKU = await this.getProductCardItemSKUByIds(productCardItem.productCardItemSKUs, productCardLanguageId, productCardPrinting.productCardPrintingId, productCardCondition.productCardConditionId);
                        

                        /*
                        //CREATE THE INVENTORY PRODUCT CARD;
                        let inventoryProductCard = new InventoryBatchProductCardDTO();
                        inventoryProductCard.productVendorId = productVendorId;
                        inventoryProductCard.productLineId = productLineId;
                        inventoryProductCard.commerceAccountId = commerceAccountId;
                        inventoryProductCard.commerceLocationId = commerceLocationId;
                        inventoryProductCard.productCardItemId = productCardItem.productCardItemId;
                        inventoryProductCard.productSetAbbreviation = productSet.productSetAbbreviation;
                        inventoryProductCard.productCardPrintingName = productCardPrinting.productCardPrintingName;
                        inventoryProductCard.productCardConditionAbbreviation = productCardCondition.productCardConditionAbbreviation;
                        inventoryProductCard.productCardLanguageAbbreviation = productCardLanguageAbbreviation;

                        //SET THE INVENTORY PRODUCT CARD DEFAULT VALUES;
                        inventoryProductCard.inventoryProductCardQty = 0;
                        inventoryProductCard.inventoryProductCardMaxQty = 0;
                        inventoryProductCard.inventoryProductCardReserveQty = 0;
                        inventoryProductCard.inventoryProductCardPrice = 0.00;
                        inventoryProductCard.inventoryProductCardOverridePriceEnabled = false;
                        inventoryProductCard.inventoryProductCardOverridePrice = 0.00;

                        */
                    }
                }

                //productCardItemCleanName
            }
        }
    }



    //UTILITY FUNCTIONS;
    async getProductLineIdByCode(productLineCode: string) {
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        if (productLine == null) {
            return null;
        }
        
        let productLineId = productLine.productLineId;
        
        return productLineId;
    }

    async getProductSetsByProductLineId(productLineId: string) {
        let productSets = await this.productSetService.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }
        
        return productSets;
    }

    async getProductCardConditionsByProductLineId(productLineId: string) {
        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(productLineId);
        if (productCardConditions == null) {
            return null;
        }
        
        return productCardConditions;
    }

    async getProductCardLanguageIdByAbbreviationAndProductLineId(productCardLanguageAbbreviation: string, productLineId: string) {
        let productCardLanguage = await this.productCardLanguageService.getProductCardLanguageByAbbreviationAndProductLineId(productCardLanguageAbbreviation, productLineId);
        if (productCardLanguage == null) {
            return null;
        }

        let productCardLanguageId = productCardLanguage.productCardLanguageId;
        
        return productCardLanguageId;
    }

    async getProductCardPrintingsByProductLineId(productLineId: string) {
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(productLineId);
        if (productCardPrintings == null) {
            return null;
        }
        
        return productCardPrintings;
    }

    async getProductCardItemSKUByIds(productCardItemSKUs: string, productCardLanguageId: string, productCardPrintingId: string, productCardConditionId: string) {
        
        let productCardItemSKUsJson = JSON.parse(productCardItemSKUs);
        let productCardItemSKU = productCardItemSKUsJson.filter(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId &&
            item.conditionId === productCardConditionId
        );

        return productCardItemSKU;
    }

 
    
}