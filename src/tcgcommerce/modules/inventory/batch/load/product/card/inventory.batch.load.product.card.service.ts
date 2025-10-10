import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardDTO } from 'src/tcgcommerce/modules/product/card/dto/product.card.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { InventoryProductCardItem } from 'src/tcgcommerce/modules/inventory/product/card/interface/inventory.product.card.item.interface';
import { ProductCardService } from 'src/tcgcommerce/modules/product/card/product.card.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductCardConditionService } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.service';
import { ProductCardLanguageService } from 'src/tcgcommerce/modules/product/card/language/product.card.language.service';
import { ProductCardPrintingService } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.service';
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
        private commerceLocationService: CommerceLocationService
    ) { }

    async createBatchInventoryProductCards(inventoryBatchLoadJobProductCardId:string,commerceAccountId: string, commerceLocationId: string, productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string) {

        let productSets = await this.productSetService.getProductSetsByProductLineId(productLineId);
        if (productSets == null) {
            return null;
        }

        //LOOP OVER EACH PRODUCT SET AND CREATE THE INVENTORY PRODUCT CARDS;
        for (let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            await this.createBatchInventoryProductCardsBySet(inventoryBatchLoadJobProductCardId, commerceAccountId, commerceLocationId, productSet, productVendorId, productLineId, productTypeId, productCardLanguageCode);
        }

        return true;

    }

    async createBatchInventoryProductCardsBySetCode(inventoryBatchLoadJobProductCardId:string, commerceAccountId: string, commerceLocationId: string,productSetCode: string, productVendorId: string, productLineId: string, productTypeId: string, productCardLanguageCode: string) {
        //GET THE PRODUCT SET BY CODE;
        let productSet = await this.productSetService.getProductSetByCode(productVendorId, productLineId, productSetCode);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productSet == null) {
            return null;
        }

        //CREATE THE BATCH INVENTORY PRODUCT CARDS BY SET;
        let inventoryProductCardDTOs = await this.createBatchInventoryProductCardsBySet(inventoryBatchLoadJobProductCardId, commerceAccountId, commerceLocationId,productSet, productVendorId, productLineId, productTypeId, productCardLanguageCode);

        return inventoryProductCardDTOs;

    }

    //BATCH LOAD OF INVENTORY PRODUCT BY SET/COMMERCE ACCOUNT/COMMERCE LOCATION;
    //BATCH INVENTORY PRODUCT CARD BY SET CREATION;
    async createBatchInventoryProductCardsBySet(inventoryBatchLoadJobProductCardId:string, commerceAccountId: string, commerceLocationId: string,productSet: any, productVendorId: string, productLineId: string, productTypeId:string, productCardLanguageCode: string) {

        //GET THE COMMERCE LOCATION;
        let commerceLocation = await this.commerceLocationService.getCommerceLocation(commerceLocationId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (commerceLocation == null) {
            return null;
        }
        
        //GET THE PRODCUT VENDOR;
        let productVendor = await this.productVendorService.getProductVendor(productVendorId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (productVendor == null) {
            return null;
        }
        
        //GET THE PRODUCT LINE;
        let productLine = await this.productLineService.getProductLine(productLineId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if (productLine == null) {
            return null;
        }


        let productCardConditions = await this.productCardConditionService.getProductCardConditionsByProductLineId(productLineId);
        let productCardLanguage = await this.productCardLanguageService.getProductCardLanguageByCodeAndProductLineId(productCardLanguageCode, productLineId);
        let productCardPrintings = await this.productCardPrintingService.getProductCardPrintingsByProductLineId(productLineId);

         //TO DO: CREATE AN ERROR TO RETURN;
        if (productCardConditions == null || productCardLanguage == null || productCardPrintings == null) {
            return null;
        }
        
        let productSetId = productSet.productSetId;
        let productCards = await this.productCardService.getProductCardsByProductSetId(productSetId);
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if (productCards == null) {
            return null;
        }

        //CREATE THE ARRAY TO HOLD THE INVENTORY PRODUCT CARDS FOR THE SET;
        let inventoryProductCardDTOs: InventoryProductCardDTO[] = [];
        
        //LOOP OVER EACH PRODUCT CARD AND CREATE THE INVENTORY PRODUCT CARD;
        for (let i = 0; i < productCards.length; i++) {

            //TO DO: CHECK TO SEE IF THE INVENTORY PRODUCT CARD ALREADY EXISTS FOR THE COMMERCE ACCOUNT/COMMERCE LOCATION/PRODUCT CARD/PRODUCT CARD LANGUAGE;

            let productCard: ProductCardDTO = productCards[i];
            
            let inventoryProductCardDTO: InventoryProductCardDTO = new InventoryProductCardDTO();
            inventoryProductCardDTO.productCardId = productCard.productCardId;
            inventoryProductCardDTO.commerceAccountId = commerceAccountId;
            inventoryProductCardDTO.commerceLocationId = commerceLocationId;
            inventoryProductCardDTO.productVendorId = productVendorId;
            inventoryProductCardDTO.productLineId = productLineId;
            inventoryProductCardDTO.productSetId = productSetId;
            inventoryProductCardDTO.productSetCode = productSet.productSetCode;
            inventoryProductCardDTO.productCardLanguageCode = productCardLanguageCode;
           

            for(let j = 0; j < productCardPrintings.length; j++) {
                let productCardPrinting = productCardPrintings[j];
                let productCardSKUByPrinting = await this.getProductCardTCGPlayerSKUByPrinting(productCard.productCardSKUs, productCardLanguage.productCardLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId);
                
                //IF THE PRODUCT CARD SKU BY PRINTING IS NULL, THEN SKIP THIS PRINTING AS IT DOES NOT EXIST;
                if (productCardSKUByPrinting == null) {
                    continue;
                }
                inventoryProductCardDTO.productCardPrintingId = productCardPrinting.productCardPrintingId;
                inventoryProductCardDTO.productCardPrintingName = productCardPrinting.productCardPrintingName;

                let inventoryProductCardItems: InventoryProductCardItem[] = [];
                
                for(let k = 0; k < productCardConditions.length; k++) {
                    let productCardCondition = productCardConditions[k];
                    let inventoryProductCardItemTCGPlayerSKU = await this.getProductCardTCGPlayerSKUByCondition(productCard.productCardSKUs, productCardLanguage.productCardLanguageTCGPlayerId, productCardPrinting.productCardPrintingTCGPlayerId, productCardCondition.productCardConditionTCGPlayerId);
                    
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
                    commerceAccountId: commerceAccountId,
                    commerceLocationId: commerceLocationId,
                    productVendorId: productVendorId,
                    productLineId: productLineId,
                    productTypeId: productTypeId,
                    productCardLanguageId: productCardLanguage.productCardLanguageId,
                    productSetId: productSetId,
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
    async getProductCardTCGPlayerSKUByPrinting(productCardTCGPlayerSKUs: string, productCardLanguageId: number, productCardPrintingId: number) {

        const productCardTCGPlayerSKUsJson = JSON.parse(productCardTCGPlayerSKUs);
        const productCardTCGPlayerSKU = productCardTCGPlayerSKUsJson.find(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId
        );

        return productCardTCGPlayerSKU.length > 0 ? productCardTCGPlayerSKU[0] : null;
    }

    //GET TCPLAYER SKU BY CONDITION/PRINTING/LANGUAGE;
    async getProductCardTCGPlayerSKUByCondition(productCardTCGPlayerSKUs: string, productCardLanguageId: number, productCardPrintingId: number, productCardConditionId: number) {
        const productCardTCGPlayerSKUsJson = JSON.parse(productCardTCGPlayerSKUs);
        const productCardTCGPlayerSKU = productCardTCGPlayerSKUsJson.find(item => 
            item.languageId === productCardLanguageId &&
            item.printingId === productCardPrintingId &&
            item.conditionId === productCardConditionId
        );

        return productCardTCGPlayerSKU.length > 0 ? productCardTCGPlayerSKU[0] : null;
    }
    
    
}