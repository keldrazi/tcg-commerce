import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardOptionDTO, CreateProductCardOptionDTO, UpdateProductCardOptionDTO } from './dto/product.card.option.dto';
import { ProductCardOption } from 'src/typeorm/entities/tcgcommerce/modules/product/card/option/product.card.option.entity';

@Injectable()
export class ProductCardOptionService {

    constructor(
        @InjectRepository(ProductCardOption) private productCardOptionRepository: Repository<ProductCardOption>,
    ) { }

    async getProductCardOption(productCardOptionId: string) {
        let productCardOption = await this.productCardOptionRepository.findOne({
            where: { 
                productCardOptionId: productCardOptionId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardOption == null) {
            return null;
        }

        let productCardOptionDTO = new ProductCardOptionDTO();
        productCardOptionDTO.productCardOptionId = productCardOption.productCardOptionId;
        productCardOptionDTO.productVendorId = productCardOption.productVendorId;
        productCardOptionDTO.productLineId = productCardOption.productLineId;
        productCardOptionDTO.productTypeId = productCardOption.productTypeId;
        productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;
        productCardOptionDTO.productCardOptionIsActive = productCardOption.productCardOptionIsActive;
        productCardOptionDTO.productCardOptionCreateDate = productCardOption.productCardOptionCreateDate;
        productCardOptionDTO.productCardOptionUpdateDate = productCardOption.productCardOptionUpdateDate;

        return productCardOptionDTO;

    }

    async getProductCardOptions(productVendorId: string, productLineId: string, productTypeId:string) {
        let productCardOptions = await this.productCardOptionRepository.find({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardOptions == null) {
            return null;
        }
        
        let productCardOptionDTOs: ProductCardOptionDTO[] = [];

        for(let i = 0; i < productCardOptions.length; i++) {
            let productCardOption = productCardOptions[i];
            let productCardOptionDTO = new ProductCardOptionDTO();
            productCardOptionDTO.productCardOptionId = productCardOption.productCardOptionId;
            productCardOptionDTO.productVendorId = productCardOption.productVendorId;
            productCardOptionDTO.productLineId = productCardOption.productLineId;
            productCardOptionDTO.productTypeId = productCardOption.productTypeId;
            productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;
            productCardOptionDTO.productCardOptionIsActive = productCardOption.productCardOptionIsActive;
            productCardOptionDTO.productCardOptionCreateDate = productCardOption.productCardOptionCreateDate;
            productCardOptionDTO.productCardOptionUpdateDate = productCardOption.productCardOptionUpdateDate;
            
            productCardOptionDTOs.push(productCardOptionDTO);
        }

        return productCardOptionDTOs;
    }
    
    async getProductCardOptionByName(productVendorId: string, productLineId: string, productTypeId:string, productCardOptionName: string) {
        let productCardOption = await this.productCardOptionRepository.findOne({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeId: productTypeId,
                productCardOptionName: productCardOptionName
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardOption == null) {
            return null;
        }
        
        let productCardOptionDTO = new ProductCardOptionDTO();
        productCardOptionDTO.productCardOptionId = productCardOption.productCardOptionId;
        productCardOptionDTO.productVendorId = productCardOption.productVendorId;
        productCardOptionDTO.productLineId = productCardOption.productLineId;
        productCardOptionDTO.productTypeId = productCardOption.productTypeId;
        productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;
        productCardOptionDTO.productCardOptionIsActive = productCardOption.productCardOptionIsActive;
        productCardOptionDTO.productCardOptionCreateDate = productCardOption.productCardOptionCreateDate;
        productCardOptionDTO.productCardOptionUpdateDate = productCardOption.productCardOptionUpdateDate;
           

        return productCardOptionDTO;
    }
    
    async createProductCardOption(createProductCardOptionDTO: CreateProductCardOptionDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productCardOption = await this.getProductCardOptionByName(createProductCardOptionDTO.productVendorId, createProductCardOptionDTO.productLineId, createProductCardOptionDTO.productTypeId, createProductCardOptionDTO.productCardOptionName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardOption != null) {
            return null;
        }
        
        let newProductCardOption = this.productCardOptionRepository.create({ ...createProductCardOptionDTO });
        newProductCardOption = await this.productCardOptionRepository.save(newProductCardOption);

        let productCardOptionDTO = this.getProductCardOption(newProductCardOption.productCardOptionId);

        return productCardOptionDTO;
        
    }  
    
    async updateProductCardOption(updateProductCardOptionDTO: UpdateProductCardOptionDTO) {
                            
        let existingProductCardOption = await this.productCardOptionRepository.findOne({ 
            where: { 
                productCardOptionId: updateProductCardOptionDTO.productCardOptionId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardOption) {
            return null; 
        }

        existingProductCardOption.productCardOptionName = updateProductCardOptionDTO.productCardOptionName;
        existingProductCardOption.productCardOptionIsActive = updateProductCardOptionDTO.productCardOptionIsActive;
        existingProductCardOption.productCardOptionUpdateDate = new Date();
        
        await this.productCardOptionRepository.save(existingProductCardOption);

        let productCardOptionDTO = this.getProductCardOption(existingProductCardOption.productCardOptionId);

        return productCardOptionDTO;
    
    }
}