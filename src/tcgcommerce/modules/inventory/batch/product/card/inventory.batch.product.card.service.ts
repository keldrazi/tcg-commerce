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
    ) { }

    

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createBatchInventoryProductCards(productLineCode: string, productCardLanguageAbbreviation: string, commerceAccountId: string, commerceLocationId: string) {
        productLineCode = productLineCode.toUpperCase();
        let productLineId = await this.getProductLineIdByCode(productLineCode);
        if (productLineId == null) {
            return null;
        }

        //GET THE PRODUCT SETS;
        let productSets = await this.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        let productCardConditions = await this.getProductCardConditionsByProductLineId(productLineId);
        let productCardLanguageId = await this.getProductCardLanguageIdByAbbreviationAndProductLineId(productCardLanguageAbbreviation, productLineId);
        let productCardPrintings = await this.getProductCardPrintingsByProductLineId(productLineId);

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
                let productCardItemSKUs = productCardItem.productCardItemSKUs;
                
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

    async getProductCardItemSKUsByProductCardLanguageId(productCardItemSKUs: string, productCardLanguageId: string) {
        
        let productCardItemSKUsJson = JSON.parse(productCardItemSKUs);
        productCardItemSKUs = productCardItemSKUsJson.filter(item => item.languageId === productCardLanguageId);

        return productCardItemSKUs;
    }

 
    
}