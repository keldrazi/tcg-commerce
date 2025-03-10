import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardItemDTO, CreateProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItem } from 'src/typeorm/entities/modules/product/card/item/product.card.item.entity';

@Injectable()
export class ProductCardItemService {

    constructor(
        @InjectRepository(ProductCardItem) private productCardItemRepository: Repository<ProductCardItem>,
    ) { }

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
        productCardItemDTO.productVendorName = productCardItem.productVendorName;
        productCardItemDTO.productTypeName = productCardItem.productTypeName;
        productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
        productCardItemDTO.productCardItemName = productCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = productCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = productCardItem.productCardItemImage;
        productCardItemDTO.productCardItemMetadata = productCardItem.productCardItemMetadata;
       
        return productCardItemDTO;
    }

    async getProductCardItemsByCommerceAccountIdAndProductTypeName(commerceAccountId: string, productTypeName: string) {
        //TO DO: ADD LIMITS AND OFFSETS;
        
        let productCardItems = await this.productCardItemRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productTypeName: productTypeName, 
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
            productCardItemDTO.productVendorName = productCardItem.productVendorName;
            productCardItemDTO.productTypeName = productCardItem.productTypeName;
            productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
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
            productCardItemDTO.productVendorName = productCardItem.productVendorName;
            productCardItemDTO.productTypeName = productCardItem.productTypeName;
            productCardItemDTO.productCardItemSetAbbreviation = productCardItem.productCardItemSetAbbreviation;
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

        let productCardItemDTO = new ProductCardItemDTO();
        productCardItemDTO.productCardItemId = newProductCardItem.productCardItemId;
        productCardItemDTO.commerceAccountId = newProductCardItem.commerceAccountId;
        productCardItemDTO.productCardItemTCGdbId = newProductCardItem.productCardItemTCGdbId;
        productCardItemDTO.productVendorName = newProductCardItem.productVendorName;
        productCardItemDTO.productTypeName = newProductCardItem.productTypeName;
        productCardItemDTO.productCardItemSetAbbreviation = newProductCardItem.productCardItemSetAbbreviation;
        productCardItemDTO.productCardItemName = newProductCardItem.productCardItemName;
        productCardItemDTO.productCardItemCleanName = newProductCardItem.productCardItemCleanName;
        productCardItemDTO.productCardItemImage = newProductCardItem.productCardItemImage;
        productCardItemDTO.productCardItemMetadata = newProductCardItem.productCardItemMetadata;
       
        return productCardItemDTO;
    } 
}