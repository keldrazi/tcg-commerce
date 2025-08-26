import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryLoadProductCardDTO } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/dto/inventory.batch.load.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductCardLanguageService } from 'src/tcgcommerce/modules/product/card/language/product.card.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
import { PricingProductCardRuleSetService } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.service';
import { ProductCardPriceService } from 'src/tcgcommerce/modules/product/card/price/product.card.price.service';
import { CommerceLocationService } from 'src/tcgcommerce/modules/commerce/location/commerce.location.service';

@Injectable()
export class InventoryBatchLoadProductCardService {

    

    constructor(
        @InjectRepository(InventoryProductCard) private inventoryProductCardRepository: Repository<InventoryProductCard>,
        private productCardService: ProductCardService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productSetService: ProductSetService,
        private productCardConditionService: ProductCardConditionService,
        private productCardLanguageService: ProductCardLanguageService,
        private productCardPrintingService: ProductCardPrintingService,
        private pricingProductCardRuleSetService: PricingProductCardRuleSetService,
        private productCardPriceService: ProductCardPriceService,
        private commerceLocationService: CommerceLocationService
    ) { }

    async createBatchInventoryProductCards(productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string, commerceLocationId: string) {

        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        //LOOP OVER EACH PRODUCT SET AND CREATE THE INVENTORY PRODUCT CARDS;
        for (let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            await this.createLoadInventoryProductCardsBySet(productSet, productVendorId, productLineId, productTypeId, productCardLanguageCode, commerceAccountId, commerceLocationId);
        }

        return true;

    }

    async createLoadInventoryProductCardsBySetCode(productSetCode: string, productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string, commerceAccountId: string, commerceLocationId: string) {
        //GET THE PRODUCT SET BY CODE;
        let productSet = await this.getProductSetByCode(productVendorId, productLineId, productSetCode);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productSet == null) {
            return null;
        }

        //CREATE THE BATCH INVENTORY PRODUCT CARDS BY SET;
        await this.createLoadInventoryProductCardsBySet(productSet, productVendorId, productLineId, productTypeId, productCardLanguageCode, commerceAccountId, commerceLocationId);

        return true;

    }

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/COMMERCE LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createLoadInventoryProductCardsBySet(productSet: any, productVendorId: string, productLineId: string, productTypeId:string, productCardLanguageCode: string, commerceAccountId: string, commerceLocationId: string) {

        //GET THE COMMERCE LOCATION;
        let commerceLocation = await this.commerceLocationService.getCommerceLocation(commerceLocationId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (commerceLocation == null) {
            return null;
        }
        
        //GET THE PRODCUT VENDOR;
        let productVendor = await this.getProductVendor(productVendorId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (productVendor == null) {
            return null;
        }
        
        //GET THE PRODUCT LINE;
        let productLine = await this.getProductLine(productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (productLine == null) {
            return null;
        }


        let productCardConditions = await this.getProductCardConditionsByProductLineId(productLineId);
        
        let productCardLanguageTCGPlayerId = await this.getProductCardLanguageIdByCodeAndProductLineId(productCardLanguageCode, productLineId);
        let productCardPrintings = await this.getProductCardPrintingsByProductLineId(productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productCardLanguageTCGPlayerId == null || productCardPrintings == null) {
            return null;
        }

        //GET THE PRICING PRODUCT CARD RULE SETS;
        let processedPricingProductCardRuleSets: any[] = [];
        let pricingProductCardRuleSets = await this.pricingProductCardRuleSetService.getPricingProductCardRuleSets(commerceAccountId, productTypeId);

        if(pricingProductCardRuleSets != null && pricingProductCardRuleSets.length > 0) {
            processedPricingProductCardRuleSets = await this.pricingProductCardRuleSetService.processPricingProductCardRuleSet(pricingProductCardRuleSets);
        }
        
        let productSetId = productSet.productSetId;
        let productCards = await this.productCardService.getProductCardsByProductSetId(productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productCards == null) {
            return null;
        }
        
        let productInventoryCardsByItem: any [] = [];
        //LOOP OVER THE PRODUCT CARD ITEMS AND CREATE THE INVENTORY PRODUCT CARDS;
        for (let j = 0; j < productCards.length; j++) {
            let productCard = productCards[j];
            
            //GET THE PRODUCT CARD ITEM PRICES;
            let productCardPrices = await this.productCardPriceService.getProductCardPrices(productLine.productLineCode, productCard.productCardTCGdbId, productCard.productCardId);
            if (productCardPrices == null) {
                continue;
            }

            let productInventoryCardsByPrinting: any[] = [];
            
            //LOOP OVER EACH PRODUCT CARD PRINTING;
            for(let k = 0; k < productCardPrintings.length; k++) {
                let productCardPrinting = productCardPrintings[k];

                let productCardSKUCondition = await this.getProductCardSKUByPrinting(productCard.productCardSKUs, productCardLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId);
                
                if(productCardSKUCondition == null) {
                    continue;
                }

                
                let productInventoryCardsByCondition: any[] = [];
                //LOOP OVER EACH PRODUCT CARD CONDITION;
                for(let l = 0; l < productCardConditions.length; l++) {
                    let productCardCondition = productCardConditions[l];
                    let productCardSKUCondition = await this.getProductCardSKUByCondition(productCard.productCardSKUs, productCardLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);

                    //IF THE TCGPLAYERSKU IS NULL - NO MATCHING 
                    //CREATE THE INVENTORY PRODUCT CARD;
                    let inventoryProductCard = new InventoryProductCard();
                    inventoryProductCard.productVendorId = productVendorId;
                    inventoryProductCard.productLineId = productLineId;
                    inventoryProductCard.commerceAccountId = commerceAccountId;
                    inventoryProductCard.commerceLocationId = commerceLocationId;
                    inventoryProductCard.productCardId = productCard.productCardId;
                    inventoryProductCard.productSetCode = productSet.productSetCode;
                    inventoryProductCard.productCardPrintingName = productCardPrinting.productCardPrintingName;
                    inventoryProductCard.productCardConditionCode = productCardCondition.productCardConditionCode;
                    inventoryProductCard.productCardLanguageCode = productCardLanguageCode;
                    inventoryProductCard.inventoryProductCardSKU = productCardSKUCondition;

                    //SET THE INVENTORY PRODUCT CARD DEFAULT VALUES;
                    inventoryProductCard.inventoryProductCardQty = 0;
                    inventoryProductCard.inventoryProductCardMaxQty = 0;
                    inventoryProductCard.inventoryProductCardReserveQty = 0;
                    inventoryProductCard.inventoryProductCardOverridePriceEnabled = false;
                    inventoryProductCard.inventoryProductCardOverridePrice = 0;
                    
                    
                    //SET THE PRICE BASED ON THE PRICING PRODUCT CARD RULE SETS;
                    let productCardPriceByPrinting = productCardPrices.find(obj => obj.productCardPrintingName === productCardPrinting.productCardPrintingName);

                    if(productCardPriceByPrinting != undefined){
                        if(processedPricingProductCardRuleSets.length > 0) {
                            inventoryProductCard.inventoryProductCardPrice = await this.pricingProductCardRuleSetService.applyCustomPricingProductCardRuleSets(
                                processedPricingProductCardRuleSets,
                                productCardCondition.productCardConditionCode,
                                productCardPriceByPrinting
                            );
                        } else {
                            inventoryProductCard.inventoryProductCardPrice = await this.pricingProductCardRuleSetService.applyDefaultPricingProductCardRuleSet(
                                productCardCondition.productCardConditionCode,
                                productCardPriceByPrinting
                            );
                        }
                    } else {
                        //SET THE PRICE TO 0;
                        inventoryProductCard.inventoryProductCardPrice = 0;
                    }
                    
                    //SAVE THE INVENTORY PRODUCT CARD;
                    inventoryProductCard = await this.inventoryProductCardRepository.save(inventoryProductCard);
                    let inventoryProductCardDTO: InventoryLoadProductCardDTO = ({ ...inventoryProductCard});
                    productInventoryCardsByCondition.push(inventoryProductCardDTO);
                }
                //ADD THE PRODUCT INVENTORY CARDS BY CONDITION TO THE PRODUCT INVENTORY CARDS BY PRINTING;
                let productInventoryCardByPrinting = {
                    productInventoryCardPrintingName: productCardPrinting.productCardPrintingName,
                    productInventoryCards: productInventoryCardsByCondition
                };
                
                productInventoryCardsByPrinting.push(productInventoryCardByPrinting);
            }

            let productInventoryCardByItem = {
                productSetCode: productSet.productSetCode,
                productCardName: productCard.productCardName,
                productInventoryCardsByPrinting: productInventoryCardsByPrinting
            };

            productInventoryCardsByItem.push(productInventoryCardByItem);
            
        }

        let productInventoryCardsBySet = {
            commerceLocation: commerceLocation,
            productVendor: productVendor,
            productLine: productLine,
            productSet: productSet,
            productInventoryCardsByItem: productInventoryCardsByItem
        };

        return productInventoryCardsBySet;
          
    }

    //UTILITY FUNCTIONS;
    async getProductVendor(productVendorId: string) {
        let productVendor = await this.productVendorService.getProductVendor(productVendorId);
        if (productVendor == null) {
            return null;
        }
        
        return productVendor;
    }

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

    async getProductSetByCode(productVendorId: string, productLineId: string, productSetCode: string) {
        let productSet = await this.productSetService.getProductSetByCode(productVendorId, productLineId, productSetCode);
        if (productSet == null) {
            return null;
        }
        
        return productSet;
    }

    async getProductCardConditionsByProductLineId(productLineId: string) {
        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(productLineId);
        if (productCardConditions == null) {
            return null;
        }
        
        return productCardConditions;
    }

    async getProductCardLanguageIdByCodeAndProductLineId(productCardLanguageCode: string, productLineId: string) {
        let productCardLanguage = await this.productCardLanguageService.getProductCardLanguageByCodeAndProductLineId(productCardLanguageCode, productLineId);
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

    async getProductCardSKUByPrinting(productCardSKUs: string, productCardLanguageId: number, productCardPrintingId: number) {

        const productCardSKUsJson = JSON.parse(productCardSKUs);
        const productCardSKU = productCardSKUsJson.filter(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId
        );

        return productCardSKU.length > 0 ? productCardSKU[0] : null;
    }

    async getProductCardSKUByCondition(productCardSKUs: string, productCardLanguageId: number, productCardPrintingId: number, productCardConditionId: number) {

        const productCardSKUsJson = JSON.parse(productCardSKUs);
        const productCardSKU = productCardSKUsJson.filter(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId &&
            item.conditionId === productCardConditionId
        );

        return productCardSKU.length > 0 ? productCardSKU[0] : null;
    }

 
    
}