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
import { PricingProductCardRuleSetService } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.service';
import { ProductCardPriceService } from 'src/tcgcommerce/modules/product/card/price/product.card.price.service';

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
        private pricingProductCardRuleSetService: PricingProductCardRuleSetService,
        private productCardPriceService: ProductCardPriceService,
    ) { }

    

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createBatchInventoryProductCards(productVendorId: string, productLineId: string, productTypeId:string, productCardLanguageAbbreviation: string, commerceAccountId: string, commerceLocationId: string) {
        
        //GET THE PRODUCT LINE;
        let productLine = await this.getProductLine(productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (productLine == null) {
            return null;
        }

        //GET THE PRODUCT SETS;
        let productSets = await this.getProductSetsByProductLineId(productLineId);
         //TO DO: CREATE AN ERROR TO RETURN;
        if (productSets == null) {
            return null;
        }



        let productCardConditions = await this.getProductCardConditionsByProductLineId(productLineId);
        
        let productCardLanguageTCGPlayerId = await this.getProductCardLanguageIdByAbbreviationAndProductLineId(productCardLanguageAbbreviation, productLineId);
        let productCardPrintings = await this.getProductCardPrintingsByProductLineId(productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productCardLanguageTCGPlayerId == null || productCardPrintings == null) {
            return null;
        }

        //GET THE PRICING PRODUCT CARD RULE SETS;
        let pricingProductCardRuleSetsEnabled = false;
        let processedPricingProductCardRuleSets: any[];
        let pricingProductCardRuleSets = await this.pricingProductCardRuleSetService.getPricingProductCardRuleSets(commerceAccountId, productTypeId);

        if(pricingProductCardRuleSets != null && pricingProductCardRuleSets.length > 0) {
            pricingProductCardRuleSetsEnabled = true;
            processedPricingProductCardRuleSets = await this.pricingProductCardRuleSetService.processPricingProductCardRuleSet(pricingProductCardRuleSets);
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
                
                //GET THE PRODUCT CARD ITEM PRICES;
                let productCardPrices = await this.productCardPriceService.getProductCardPrices(productLine.productLineCode, productCardItem.productCardItemTCGdbId, productCardItem.productCardItemId);
                if (productCardPrices == null) {
                    continue;
                }

                //LOOP OVER EACH PRODUCT CARD PRINTING;
                for(let k = 0; k < productCardPrintings.length; k++) {
                    let productCardPrinting = productCardPrintings[k];

                    
                    //LOOP OVER EACH PRODUCT CARD CONDITION;
                    for(let l = 0; l < productCardConditions.length; l++) {
                        let productCardCondition = productCardConditions[l];
                        let tcgPlayerCleanName = productCardItem.productCardItemCleanName;
                        let tcgPlayerSKU = await this.getProductCardItemSKUByIds(productCardItem.productCardItemSKUs, productCardLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);

                        
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
                        
                        /*
                        inventoryProductCard.inventoryProductCardOverridePriceEnabled = false;
                        inventoryProductCard.inventoryProductCardOverridePrice = 0.00;
                        */
                        
                        //SET THE PRICE BASED ON THE PRICING PRODUCT CARD RULE SETS;
                        let productCardPrice = productCardPrices.find(obj => obj.productCardPrintingName === productCardPrinting.productCardPrintingName);

                        if(productCardPrice != undefined){
                            //CALL THE PRICING PRODUCT CARD RULE SET SERVICE TO GET THE PRICE;
                            if(pricingProductCardRuleSetsEnabled) {
                               
                            }
                            //CALL THE PRICING PRODUCT CARD RULE SET SERVICE TO GET THE PRICE (DEFAULTS)
                            else {
                                inventoryProductCard.inventoryProductCardOverridePriceEnabled = false;
                                inventoryProductCard.inventoryProductCardOverridePrice = 0.00;
                            }
                        }
                        else {
                            //SET THE PRICE TO 0.00;
                        }
                    }
                }

                
            }
        }   
    }



    //UTILITY FUNCTIONS;
    async getProductLine(productLineId: string) {
        let productLine = await this.productLineService.getProductLine(productLineId);
        if (productLine == null) {
            return null;
        }
        
        return productLine;
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

        let productCardLanguageId = productCardLanguage.productCardLanguageTCGPlayerId;
        
        return productCardLanguageId;
    }

    async getProductCardPrintingsByProductLineId(productLineId: string) {
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(productLineId);
        if (productCardPrintings == null) {
            return null;
        }
        
        return productCardPrintings;
    }

    async getProductCardItemSKUByIds(productCardItemSKUs: string, productCardLanguageId: number, productCardPrintingId: number, productCardConditionId: number) {

        let productCardItemSKUsJson = JSON.parse(productCardItemSKUs);
        let productCardItemSKU = productCardItemSKUsJson.filter(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId &&
            item.conditionId === productCardConditionId
        );

        return productCardItemSKU;
    }

 
    
}