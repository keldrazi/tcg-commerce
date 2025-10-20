import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDTO, UpdateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductType } from 'src/typeorm/entities/tcgcommerce/modules/product/type/product.type.entity';

@Injectable()
export class ProductTypeService {

    constructor(
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
    ) { }

    async getProductType(productTypeId: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeId: productTypeId 
            } 
        });
        
        if (productType == null) {
            return null;
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypesByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string) {
        let productTypes = await this.productTypeRepository.find({ 
            where: { 
                productVendorId: productVendorId,
                productLineId: productLineId 
            } 
        });
        
        if (productTypes == null) {
            return null;
        }

        let productTypeDTOs: ProductTypeDTO[] = [];

        for(let i = 0; i < productTypes.length; i++) {
            let productType = productTypes[i];
            let productTypeDTO: ProductTypeDTO = ({ ...productType });
           
            productTypeDTOs.push(productTypeDTO);
        }

        return productTypeDTOs;
        
    }

    async getProductTypes() {
        let productTypes = await this.productTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productTypes == null) {
            return null;
        }
        
        let productTypeDTOs: ProductTypeDTO[] = [];

        for(let i = 0; i < productTypes.length; i++) {
            let productType = productTypes[i];
            let productTypeDTO: ProductTypeDTO = ({ ...productType });

            productTypeDTOs.push(productTypeDTO);
        }

        return productTypeDTOs;
    }
    
    async getProductTypeByName(name: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeName: name 
            } 
        });
        
        if (productType == null) {
            return null;
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypeByCode(code: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeCode: code 
            } 
        });
        
        if (productType == null) {
            return null;
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }
    
    async createProductType(createProductTypeDTO: CreateProductTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productType = await this.getProductTypeByName(createProductTypeDTO.productTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productType != null) {
            return null;
        }
        
        let newProductType = this.productTypeRepository.create({ ...createProductTypeDTO });
        newProductType = await this.productTypeRepository.save(newProductType);

        let productTypeDTO = this.getProductType(newProductType.productTypeId);
        
        return productTypeDTO;
        
    }

    async updateProductType(updateProductTypeDTO: UpdateProductTypeDTO) {
                    
        let existingProductType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeId: updateProductTypeDTO.productTypeId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductType) {
            return null; 
        }

        existingProductType.productTypeName = updateProductTypeDTO.productTypeName;
        existingProductType.productTypeCode = updateProductTypeDTO.productTypeCode;
        existingProductType.productTypeIsActive = updateProductTypeDTO.productTypeIsActive;
        existingProductType.productTypeUpdateDate = new Date();
        
        await this.productTypeRepository.save(existingProductType);

        let productTypeDTO = this.getProductType(existingProductType.productTypeId);

        return productTypeDTO;
    
    }
    
}