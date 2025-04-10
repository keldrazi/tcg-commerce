import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardInventorysDTO, ProductCardInventoryDTO, CreateProductCardInventorysDTO, CreateProductCardInventoryDTO, UpdateProductCardInventorysDTO, UpdateProductCardInventoryDTO } from 'src/tcgcommerce/modules/product/card/inventory/dto/product.card.inventory.dto';
import { ProductCardInventory } from 'src/typeorm/entities/tcgcommerce/modules/product/card/inventory/product.card.inventory.entity';

@Injectable()
export class ProductCardInventoryService {

    constructor(
        @InjectRepository(ProductCardInventory) private productCardInventoryRepository: Repository<ProductCardInventory>,
    ) { }

    async getProductCardInventoryByProductCardInventoryId(productCardInventoryId: string) {
        let productCardInventory = await this.productCardInventoryRepository.findOne({
            where: {
                productCardInventoryId: productCardInventoryId
            }
        }); 

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardInventory == null) {
            return null;
        }

        let productCardInventoryDTO = new ProductCardInventoryDTO();
        productCardInventoryDTO.productCardInventoryId = productCardInventory.productCardInventoryId;
        productCardInventoryDTO.commerceAccountId = productCardInventory.commerceAccountId;
        productCardInventoryDTO.commerceLocationId = productCardInventory.commerceLocationId;
        productCardInventoryDTO.productCardItemId = productCardInventory.productCardItemId;
        productCardInventoryDTO.productCardOption = productCardInventory.productCardOption;
        productCardInventoryDTO.productCardVariant = productCardInventory.productCardVariant;
        productCardInventoryDTO.productCardInventoryQty = productCardInventory.productCardInventoryQty;
        productCardInventoryDTO.productCardInventoryMaxQty = productCardInventory.productCardInventoryMaxQty;
        productCardInventoryDTO.productCardInventoryReserveQty = productCardInventory.productCardInventoryReserveQty;
        productCardInventoryDTO.productCardInventoryPrice = productCardInventory.productCardInventoryPrice;
        productCardInventoryDTO.productCardInventoryOverridePriceEnabled = productCardInventory.productCardInventoryOverridePriceEnabled;
        productCardInventoryDTO.productCardInventoryOverridePrice = productCardInventory.productCardInventoryOverridePrice;
        productCardInventoryDTO.productCardInventoryMetadata = productCardInventory.productCardInventoryMetadata;
        productCardInventoryDTO.productCardInventoryUpdateDate = productCardInventory.productCardInventoryUpdateDate;
        
        return productCardInventoryDTO;
    }
    
    async getProductCardInventorysByCommerceAccountIdAndProductCardItemId(commerceAccountId: string, productCardItemId: string) {
        let productCardInventorys = await this.productCardInventoryRepository.find({ 
            where: {
                commerceAccountId: commerceAccountId,
                productCardItemId: productCardItemId, 
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardInventorys == null) {
            return null;
        }

        let productCardInventoryDTOs: ProductCardInventoryDTO[] = [];

        for(let i=0; i < productCardInventorys.length; i++) {
            let productCardInventory = productCardInventorys[i];
            let productCardInventoryDTO = new ProductCardInventoryDTO();

            productCardInventoryDTO.productCardInventoryId = productCardInventory.productCardInventoryId;
            productCardInventoryDTO.commerceAccountId = productCardInventory.commerceAccountId;
            productCardInventoryDTO.commerceLocationId = productCardInventory.commerceLocationId;
            productCardInventoryDTO.productCardItemId = productCardInventory.productCardItemId;
            productCardInventoryDTO.productCardOption = productCardInventory.productCardOption;
            productCardInventoryDTO.productCardVariant = productCardInventory.productCardVariant;
            productCardInventoryDTO.productCardInventoryQty = productCardInventory.productCardInventoryQty;
            productCardInventoryDTO.productCardInventoryMaxQty = productCardInventory.productCardInventoryMaxQty;
            productCardInventoryDTO.productCardInventoryReserveQty = productCardInventory.productCardInventoryReserveQty;
            productCardInventoryDTO.productCardInventoryPrice = productCardInventory.productCardInventoryPrice;
            productCardInventoryDTO.productCardInventoryOverridePriceEnabled = productCardInventory.productCardInventoryOverridePriceEnabled;
            productCardInventoryDTO.productCardInventoryOverridePrice = productCardInventory.productCardInventoryOverridePrice;
            productCardInventoryDTO.productCardInventoryMetadata = productCardInventory.productCardInventoryMetadata;
            productCardInventoryDTO.productCardInventoryUpdateDate = productCardInventory.productCardInventoryUpdateDate;

            productCardInventoryDTOs.push(productCardInventoryDTO);
        }
        
        let productCardInventorysDTO = new ProductCardInventorysDTO();
        productCardInventorysDTO.productCardInventoryDTOs = productCardInventoryDTOs;
        
        return productCardInventorysDTO;
    }

    async createProductCardInventory(createProductCardInventorysDTO: CreateProductCardInventorysDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD INVENTORY ALREADY EXISTS;
        let productCardInventory = await this.getProductCardInventorysByCommerceAccountIdAndProductCardItemId(createProductCardInventorysDTO.commerceAccountId, createProductCardInventorysDTO.productCardItemId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardInventory != null) {
            return null;
        }

        let productCardInventoryDTOs: ProductCardInventoryDTO[] = [];

        for(let i=0; i < createProductCardInventorysDTO.createProductCardInventoryDTOs.length; i++) {
            let createProductCardInventoryDTO = createProductCardInventorysDTO.createProductCardInventoryDTOs[i];
        
            let productCardInventory = this.productCardInventoryRepository.create({ ...createProductCardInventoryDTO });
            productCardInventory = await this.productCardInventoryRepository.save(productCardInventory);

            let productCardInventoryDTO = await this.getProductCardInventoryByProductCardInventoryId(productCardInventory.productCardInventoryId);

            if(productCardInventoryDTO == null) {
                continue;
            }

            productCardInventoryDTOs.push(productCardInventoryDTO);
        }

        let productCardInventorysDTO = new ProductCardInventorysDTO();
        productCardInventorysDTO.commerceAccountId = createProductCardInventorysDTO.commerceAccountId;
        productCardInventorysDTO.productCardItemId = createProductCardInventorysDTO.productCardItemId;
        productCardInventorysDTO.productCardInventoryDTOs = productCardInventoryDTOs;

        return productCardInventorysDTO;
    } 

    async updateProductCardInventory(updateProductCardInventorysDTO: UpdateProductCardInventorysDTO) {

        //GET THE PRODUCT CARD INVENTORYS TO UPDATE;
        let productCardInventory = await this.getProductCardInventorysByCommerceAccountIdAndProductCardItemId(updateProductCardInventorysDTO.commerceAccountId, updateProductCardInventorysDTO.productCardItemId);

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardInventory == null) {
            return null;
        }

        //UPDATE THE PRODUCT CARD INVENTORYS;
        let productCardInventoryDTOs: ProductCardInventoryDTO[] = [];

        for(let i=0; i < updateProductCardInventorysDTO.updateProductCardInventoryDTOs.length; i++) {
            let updateProductCardInventoryDTO = updateProductCardInventorysDTO.updateProductCardInventoryDTOs[i];
            
            //GET THE PRODUCT CARD INVENTORY TO UPDATE;
            let productCardInventory = await this.productCardInventoryRepository.findOne({
                where: {
                    productCardInventoryId: updateProductCardInventoryDTO.productCardInventoryId
                }
            });

            //TO DO: CREATE AN ERROR TO RETURN;
            if(productCardInventory == null) {
                continue;
            }

            productCardInventory.commerceLocationId = updateProductCardInventoryDTO.commerceLocationId;
            productCardInventory.productCardInventoryQty = updateProductCardInventoryDTO.productCardInventoryQty;
            productCardInventory.productCardInventoryMaxQty = updateProductCardInventoryDTO.productCardInventoryMaxQty;
            productCardInventory.productCardInventoryReserveQty = updateProductCardInventoryDTO.productCardInventoryReserveQty;
            productCardInventory.productCardInventoryPrice = updateProductCardInventoryDTO.productCardInventoryPrice;
            productCardInventory.productCardInventoryOverridePriceEnabled = updateProductCardInventoryDTO.productCardInventoryOverridePriceEnabled;
            productCardInventory.productCardInventoryOverridePrice = updateProductCardInventoryDTO.productCardInventoryOverridePrice;
            productCardInventory.productCardInventoryMetadata = updateProductCardInventoryDTO.productCardInventoryMetadata;
            productCardInventory.productCardInventoryUpdateDate = new Date();

            productCardInventory = await this.productCardInventoryRepository.save(productCardInventory);

            let productCardInventoryDTO = await this.getProductCardInventoryByProductCardInventoryId(productCardInventory.productCardInventoryId);
            
            if(productCardInventoryDTO == null) {
                continue;
            }
            
            productCardInventoryDTOs.push(productCardInventoryDTO);
        }

        let productCardInventorysDTO = new ProductCardInventorysDTO();
        productCardInventorysDTO.commerceAccountId = updateProductCardInventorysDTO.commerceAccountId;
        productCardInventorysDTO.productCardItemId = updateProductCardInventorysDTO.productCardItemId;
        productCardInventorysDTO.productCardInventoryDTOs = productCardInventoryDTOs;

        return productCardInventorysDTO;
        
    }
    
}