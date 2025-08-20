import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardItemDTO, CreateProductCardItemDTO, UpdateProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/product/card/item/product.card.item.entity';
import { TCGdbMTGCardService } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.service';
import { ProductSetService } from 'src/tcgcommerce/modules/product/set/product.set.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductCardItemService {


    constructor(
        @InjectRepository(ProductCardItem) private productCardItemRepository: Repository<ProductCardItem>,
        private tcgdbMTGCardService: TCGdbMTGCardService,
        private productSetService: ProductSetService,
        private productLineService: ProductLineService,
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
        
        let productCardItemDTO: ProductCardItemDTO = ({ ...productCardItem})
       
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

        let productCardItemDTO: ProductCardItemDTO = ({ ...productCardItem})
            
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
            let productCardItemDTO: ProductCardItemDTO = ({ ...productCardItem})
            
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
            let productCardItemDTO: ProductCardItemDTO = ({ ...productCardItem})
            
            productCardItemDTOs.push(productCardItemDTO);

        }

        return productCardItemDTOs;
    }


    async createProductCardItem(createProductCardItemDTO: CreateProductCardItemDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD ITEM ALREADY EXISTS;
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

    async updateProductCardItem(updateProductCardItemDTO: UpdateProductCardItemDTO) {
                                
        let existingProductCardItem = await this.productCardItemRepository.findOne({ 
            where: { 
                productCardItemId: updateProductCardItemDTO.productCardItemId
            } 
        });

        //TO DO: RETURN AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardItem) {
            return null; 
        }

        existingProductCardItem.productSetCode = updateProductCardItemDTO.productSetCode;
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

    //CREATE PRODUCT CARD ITEMS;
    async createProductCardItems(productVendorId: string, productLineId: string, productTypeId: string) {
        
        let productLine = await this.productLineService.getProductLine(productLineId);

        let productCardItemRecordCount = 0;
        
        if(productLine == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return null;
        }

        switch (productLine.productLineCode) {
            case "MTG":
                productCardItemRecordCount = await this.createMTGProductCardItems(productVendorId, productLineId, productTypeId);
                break;
        }

        return productCardItemRecordCount;
    }

    //CREATE PRODUCT CARD ITEMS (MTG);
    async createMTGProductCardItems(productVendorId: string, productLineId: string, productTypeId: string) {
        let productSets = await this.productSetService.getProductSetsByProductVendorIdAndProductLineId(productVendorId, productLineId);
        
        if(productSets == null) {
            //TO DO: CREATE AN ERROR TO RETURN;
            return 0;
        }
        
        let productCardItemRecordCount = 0;

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            
            let productCardsBySet = await this.tcgdbMTGCardService.getTCGdbMTGCardsBySetCode(productSet.productSetCode);

            if(productCardsBySet == null) {
                return 0;
            }

            for(let j = 0; j < productCardsBySet.tcgdbMTGCards.length; j++) {
                let tcgdbMTGCard = productCardsBySet.tcgdbMTGCards[j];

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
                    productVendorId: productVendorId,
                    productLineId: productLineId,
                    productTypeId: productTypeId,
                    productSetId: productSet.productSetId,
                    productSetCode: productSet.productSetCode,
                    productCardRarityCode: tcgdbMTGCard.tcgdbMTGCardRarityCode,
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