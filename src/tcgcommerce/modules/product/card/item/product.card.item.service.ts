import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardItemDTO, CreateProductCardItemDTO, UpdateProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/product/card/item/product.card.item.entity';

@Injectable()
export class ProductCardItemService {

    constructor(
        @InjectRepository(ProductCardItem) private productCardItemRepository: Repository<ProductCardItem>,
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
        productCardItemDTO.commerceAccountId = productCardItem.commerceAccountId;
        productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
        productCardItemDTO.productVendorId = productCardItem.productVendorId;
        productCardItemDTO.productLineId = productCardItem.productLineId;
        productCardItemDTO.productTypeId = productCardItem.productTypeId;
        productCardItemDTO.productCardItemSetName = productCardItem.productCardItemSetName;
        productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
        productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
        productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
        productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
       
        return productCardItemDTO;
    }

    async getProductCardItemByCommerceAccountIdAndTCGdbId(commerceAccountId: string, tcgdbId: string) {
        let productCardItem = await this.productCardItemRepository.findOne({ 
            where: {
                commerceAccountId: commerceAccountId,
                productCardItemTCGdbId: tcgdbId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardItem == null) {
            return null;
        }

        let productCardItemDTO = new ProductCardItemDTO();
        productCardItemDTO.productCardItemId = productCardItem.productCardItemId;
        productCardItemDTO.commerceAccountId = productCardItem.commerceAccountId;
        productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
        productCardItemDTO.productVendorId = productCardItem.productVendorId;
        productCardItemDTO.productLineId = productCardItem.productLineId;
        productCardItemDTO.productTypeId = productCardItem.productTypeId;
        productCardItemDTO.productCardItemSetName = productCardItem.productCardItemSetName;
        productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
        productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
        productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
        productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
       
        return productCardItemDTO;
    }

    async getProductCardItemsByCommerceAccountIdAndProductTypeId(commerceAccountId: string, productTypeId: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCardItems = await this.productCardItemRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productTypeId: productTypeId, 
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
            productCardItemDTO.commerceAccountId = productCardItem.commerceAccountId;
            productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
            productCardItemDTO.productVendorId = productCardItem.productVendorId;
            productCardItemDTO.productLineId = productCardItem.productLineId;
            productCardItemDTO.productTypeId = productCardItem.productTypeId;
            productCardItemDTO.productCardItemSetName = productCardItem.productCardItemSetName;
            productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
            productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
            productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
            productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
            productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
            productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
            
            productCardItemDTOs.push(productCardItemDTO);

        }

        return productCardItemDTOs;
    }

    async getProductCardItemsByCommerceAccountIdAndSetAbbreviation(commerceAccountId: string, setAbbreviation: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCardItems = await this.productCardItemRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productCardItemSetAbbreviation: setAbbreviation, 
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
            productCardItemDTO.commerceAccountId = productCardItem.commerceAccountId;
            productCardItemDTO.productCardItemTCGdbId = productCardItem.productCardItemTCGdbId;
            productCardItemDTO.productVendorId = productCardItem.productVendorId;
            productCardItemDTO.productLineId = productCardItem.productLineId;
            productCardItemDTO.productTypeId = productCardItem.productTypeId;
            productCardItemDTO.productSetId = productCardItem.productSetId;
            productCardItemDTO.productCardItemNumber = productCardItem.productCardItemNumber;
            productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
            productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
            productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
            productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
            
            productCardItemDTOs.push(productCardItemDTO);

        }

        return productCardItemDTOs;
    }


    async createProductCardItem(createProductCardItemDTO: CreateProductCardItemDTO) {

        //CHECK TO SEE IF THE PRDUCT CARD ITEM ALREADY EXISTS;
        let productCardItem = await this.getProductCardItemByCommerceAccountIdAndTCGdbId(createProductCardItemDTO.commerceAccountId, createProductCardItemDTO.productCardItemTCGdbId);

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

        existingProductCardItem.productCardItemNumber = updateProductCardItemDTO.productCardItemNumber;
        existingProductCardItem.productCardItemName = updateProductCardItemDTO.productCardItemName;
        existingProductCardItem.productCardItemCleanName = updateProductCardItemDTO.productCardItemCleanName;
        existingProductCardItem.productCardItemImage = updateProductCardItemDTO.productCardItemImage;
        existingProductCardItem.productCardItemExtendedData = updateProductCardItemDTO.productCardItemExtendedData;
        existingProductCardItem.productCardItemMetadata = updateProductCardItemDTO.productCardItemMetadata;
        existingProductCardItem.productCardItemUpdateDate = new Date();
        
        await this.productCardItemRepository.save(existingProductCardItem);

        let productCardItemDTO = this.getProductCardItemByProductCardItemId(existingProductCardItem.productCardItemId);
       
        return productCardItemDTO;
    } 
}