import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardItemDTO, CreateProductCardItemDTO, UpdateProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/product/card/item/product.card.item.entity';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';

@Injectable()
export class ProductCardItemService {

    //CARD DATA;
    private MTG_CARD_VENDOR_ID = "67d0735c-da47-480d-b3e2-651b9fc5a2d8"; //WoTC;
    private MTG_CARD_LINE_ID = "1258359b-bb37-4323-8749-cd4fa40037f9"; //Magic: The Gathering;
    private MTG_CARD_TYPE_ID = "5c9d4e87-f69b-46d3-94ba-bb00fda92c07"; //Single Card;

    constructor(
        @InjectRepository(ProductCardItem) private productCardItemRepository: Repository<ProductCardItem>,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private productSetService: ProductSetService,
    ) { }

    async getProductCardItemByProductCardItemId(productCardItemId: string) {
        let productCardItem = await this.productCardItemRepository.findOne({ 
            where: {
                productCardItemId: productCardItemId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItem == null) {
            return null;
        } 

        let productCardItemDTO = new ProductCardItemDTO();
        productCardItemDTO.productCardItemId = productCardItem.productCardItemId;
        productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
        productCardItemDTO.productVendorId = productCardItem.productVendorId;
        productCardItemDTO.productLineId = productCardItem.productLineId;
        productCardItemDTO.productTypeId = productCardItem.productTypeId;
        productCardItemDTO.productSetId = productCardItem.productSetId;
        productCardItemDTO.productSetAbbreviation = productCardItem.productSetAbbreviation;
        productCardItemDTO.productCardRarityAbbreviation = productCardItem.productCardRarityAbbreviation;
        productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
        productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
        productCardItemDTO.productCardItemIsPresale = productCardItem.productCardItemIsPresale;
        productCardItemDTO.productCardItemExtendedData = productCardItem.productCardItemExtendedData;
        productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
        productCardItemDTO.productCardItemSKUs = productCardItem.productCardItemSKUs;
        productCardItemDTO.productCardItemIsActive = productCardItem.productCardItemIsActive;
        productCardItemDTO.productCardItemCreateDate = productCardItem.productCardItemCreateDate;
        productCardItemDTO.productCardItemUpdateDate = productCardItem.productCardItemUpdateDate;
            
       
        return productCardItemDTO;
    }

    async getProductCardItemByTCGdbId(tcgdbId: string) {
        let productCardItem = await this.productCardItemRepository.findOne({ 
            where: {
                productCardItemTCGdbId: tcgdbId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItem == null) {
            return null;
        }

        let productCardItemDTO = new ProductCardItemDTO();
        productCardItemDTO.productCardItemId = productCardItem.productCardItemId;
        productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
        productCardItemDTO.productVendorId = productCardItem.productVendorId;
        productCardItemDTO.productLineId = productCardItem.productLineId;
        productCardItemDTO.productTypeId = productCardItem.productTypeId;
        productCardItemDTO.productSetId = productCardItem.productSetId;
        productCardItemDTO.productSetAbbreviation = productCardItem.productSetAbbreviation;
        productCardItemDTO.productCardRarityAbbreviation = productCardItem.productCardRarityAbbreviation;
        productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
        productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
        productCardItemDTO.productCardItemIsPresale = productCardItem.productCardItemIsPresale;
        productCardItemDTO.productCardItemExtendedData = productCardItem.productCardItemExtendedData;
        productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
        productCardItemDTO.productCardItemSKUs = productCardItem.productCardItemSKUs;
        productCardItemDTO.productCardItemIsActive = productCardItem.productCardItemIsActive;
        productCardItemDTO.productCardItemCreateDate = productCardItem.productCardItemCreateDate;
        productCardItemDTO.productCardItemUpdateDate = productCardItem.productCardItemUpdateDate;
            
        return productCardItemDTO;
    }

    async getProductCardItemsByProductLineId(productLineId: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCardItems = await this.productCardItemRepository.find({ 
            where: {
                productLineId: productLineId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItems == null) {
            return null;
        }

        let productCardItemDTOs: ProductCardItemDTO[] = [];

        for(let i = 0; i < productCardItems.length; i++) {
            let productCardItem = productCardItems[i];
            let productCardItemDTO = new ProductCardItemDTO();
            productCardItemDTO.productCardItemId = productCardItem.productCardItemId;
            productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
            productCardItemDTO.productVendorId = productCardItem.productVendorId;
            productCardItemDTO.productLineId = productCardItem.productLineId;
            productCardItemDTO.productTypeId = productCardItem.productTypeId;
            productCardItemDTO.productSetId = productCardItem.productSetId;
            productCardItemDTO.productSetAbbreviation = productCardItem.productSetAbbreviation;
            productCardItemDTO.productCardRarityAbbreviation = productCardItem.productCardRarityAbbreviation;
            productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
            productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
            productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
            productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
            productCardItemDTO.productCardItemIsPresale = productCardItem.productCardItemIsPresale;
            productCardItemDTO.productCardItemExtendedData = productCardItem.productCardItemExtendedData;
            productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
            productCardItemDTO.productCardItemSKUs = productCardItem.productCardItemSKUs;
            productCardItemDTO.productCardItemIsActive = productCardItem.productCardItemIsActive;
            productCardItemDTO.productCardItemCreateDate = productCardItem.productCardItemCreateDate;
            productCardItemDTO.productCardItemUpdateDate = productCardItem.productCardItemUpdateDate;
            
            
            productCardItemDTOs.push(productCardItemDTO);

        }

        return productCardItemDTOs;
    }

    async getProductCardItemsByProductSetId(productSetId: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCardItems = await this.productCardItemRepository.find({ 
            where: {
                productSetId: productSetId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItems == null) {
            return null;
        }

        let productCardItemDTOs: ProductCardItemDTO[] = [];

        for(let i = 0; i < productCardItems.length; i++) {
            let productCardItem = productCardItems[i];
            let productCardItemDTO = new ProductCardItemDTO();
            productCardItemDTO.productCardItemId = productCardItem.productCardItemId;
            productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
            productCardItemDTO.productVendorId = productCardItem.productVendorId;
            productCardItemDTO.productLineId = productCardItem.productLineId;
            productCardItemDTO.productTypeId = productCardItem.productTypeId;
            productCardItemDTO.productSetId = productCardItem.productSetId;
            productCardItemDTO.productSetAbbreviation = productCardItem.productSetAbbreviation;
            productCardItemDTO.productCardRarityAbbreviation = productCardItem.productCardRarityAbbreviation;
            productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
            productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
            productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
            productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
            productCardItemDTO.productCardItemIsPresale = productCardItem.productCardItemIsPresale;
            productCardItemDTO.productCardItemExtendedData = productCardItem.productCardItemExtendedData;
            productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
            productCardItemDTO.productCardItemSKUs = productCardItem.productCardItemSKUs;
            productCardItemDTO.productCardItemIsActive = productCardItem.productCardItemIsActive;
            productCardItemDTO.productCardItemCreateDate = productCardItem.productCardItemCreateDate;
            productCardItemDTO.productCardItemUpdateDate = productCardItem.productCardItemUpdateDate;
            
            productCardItemDTOs.push(productCardItemDTO);

        }

        return productCardItemDTOs;
    }


    async createProductCardItem(createProductCardItemDTO: CreateProductCardItemDTO) {

        //CHECK TO SEE IF THE PRDUCT CARD ITEM ALREADY EXISTS;
        let productCardItem = await this.getProductCardItemByTCGdbId(createProductCardItemDTO.productCardItemTCGdbId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItem != null) {
            return null;
        }

        let newProductCardItem = this.productCardItemRepository.create({ ...createProductCardItemDTO });
        newProductCardItem = await this.productCardItemRepository.save(newProductCardItem);

        let productCardItemDTO = this.getProductCardItemByProductCardItemId(newProductCardItem.productCardItemId);
       
        return productCardItemDTO;
    } 

    async updateProductCardOption(updateProductCardItemDTO: UpdateProductCardItemDTO) {
                                
        let existingProductCardItem = await this.productCardItemRepository.findOne({ 
            where: { 
                productCardItemId: updateProductCardItemDTO.productCardItemId
            } 
        });

        //TO DO: RETURN AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardItem) {
            return null; 
        }

        existingProductCardItem.productSetAbbreviation = updateProductCardItemDTO.productSetAbbreviation;
        existingProductCardItem.productCardItemNumber = updateProductCardItemDTO.productCardItemNumber;
        existingProductCardItem.productCardItemName = updateProductCardItemDTO.productCardItemName;
        existingProductCardItem.productCardItemCleanName = updateProductCardItemDTO.productCardItemCleanName;
        existingProductCardItem.productCardItemImage = updateProductCardItemDTO.productCardItemImage;
        existingProductCardItem.productCardItemExtendedData = updateProductCardItemDTO.productCardItemExtendedData;
        existingProductCardItem.productCardItemMetadata = updateProductCardItemDTO.productCardItemMetadata;
        existingProductCardItem.productCardItemSKUs = updateProductCardItemDTO.productCardItemSKUs;
        existingProductCardItem.productCardItemIsActive = updateProductCardItemDTO.productCardItemIsActive;
        existingProductCardItem.productCardItemUpdateDate = new Date();
        
        await this.productCardItemRepository.save(existingProductCardItem);

        let productCardItemDTO = this.getProductCardItemByProductCardItemId(existingProductCardItem.productCardItemId);
       
        return productCardItemDTO;
    } 


    
    async createProductCardItemsByProductLineName(productLineName: string) {
        
        if (productLineName == 'mtg') {
            return this.createTCGdbMTGProductCardItems();
        } else {
            return null;
        }
    }

    //TCGdb MTG CREATE CARD ITEM;
    async createTCGdbMTGProductCardItems() {
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(this.MTG_CARD_VENDOR_ID, this.MTG_CARD_LINE_ID);

        let productCardItemRecordCount = 0;
        
        if(productSets == null) {
            return null;
        }
        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            
            let tcgdbMTGSetCards = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetAbbreviation(productSet.productSetAbbreviation);

            if(tcgdbMTGSetCards == null) {
                return null;
            }

            for(let j = 0; j < tcgdbMTGSetCards.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = tcgdbMTGSetCards.tcgdbMTGCards[j];

                //CHECK TO SEE IF THE CARD EXISTS;
                let productCardItemCheck = await this.getProductCardItemByTCGdbId(tcgdbMTGCard.tcgdbMTGCardId);
                
                //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
                if (productCardItemCheck != null) {
                    continue;
                }

                let productCardItemMetadata = "[]";
                
                if (tcgdbMTGCard.tcgdbMTGCardScryfallData != null) {
                    productCardItemMetadata = tcgdbMTGCard.tcgdbMTGCardScryfallData;
                }

                const newProductCardItem = this.productCardItemRepository.create({
                    productCardItemTCGdbId: tcgdbMTGCard.tcgdbMTGCardId,
                    productVendorId: this.MTG_CARD_VENDOR_ID,
                    productLineId: this.MTG_CARD_LINE_ID,
                    productTypeId: this.MTG_CARD_TYPE_ID,
                    productSetId: productSet.productSetId,
                    productSetAbbreviation: productSet.productSetAbbreviation,
                    productCardRarityAbbreviation: tcgdbMTGCard.tcgdbMTGCardRarityAbbreviation,
                    productCardItemNumber: tcgdbMTGCard.tcgdbMTGCardNumber,
                    productCardItemName: tcgdbMTGCard.tcgdbMTGCardName,
                    productCardItemCleanName: tcgdbMTGCard.tcgdbMTGCardCleanName,
                    productCardItemImage: tcgdbMTGCard.tcgdbMTGCardImageURL,
                    productCardItemExtendedData: tcgdbMTGCard.tcgdbMTGCardTCGPlayerData,
                    productCardItemMetadata: productCardItemMetadata,
                    productCardItemSKUs: tcgdbMTGCard.tcgdbMTGCardTCGPlayerSKUs,
                    productCardItemIsPresale: false,
                    productCardItemIsActive: true,
                });

                await this.productCardItemRepository.save(newProductCardItem);

                productCardItemRecordCount++;
            }
        }

        return productCardItemRecordCount;
    }
}