import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDTO, UpdateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductType } from 'src/typeorm/entities/tcgcommerce/modules/product/type/product.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ProductTypeService {

    constructor(
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getProductType(productTypeId: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeId: productTypeId 
            } 
        });
        
        if (productType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found for productTypeId: ' + productTypeId);
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
        
        let productTypeDTOs: ProductTypeDTO[] = [];

        if (productTypes == null) {
            return productTypeDTOs;
        }

        for(let i = 0; i < productTypes.length; i++) {
            let productType = productTypes[i];
            let productTypeDTO: ProductTypeDTO = ({ ...productType });
           
            productTypeDTOs.push(productTypeDTO);
        }

        return productTypeDTOs;
        
    }

    async getProductTypes() {
        let productTypes = await this.productTypeRepository.find();
        
        let productTypeDTOs: ProductTypeDTO[] = [];

        if(productTypes == null) {
            return productTypeDTOs;
        }
        
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
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found for productTypeName: ' + name);
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
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found for productTypeCode: ' + code);
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }
    
    async createProductType(createProductTypeDTO: CreateProductTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeName: createProductTypeDTO.productTypeName 
            } 
        });
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productType != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_ALREADY_EXISTS', 'Product type already exists with name: ' + createProductTypeDTO.productTypeName);
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

        if (!existingProductType) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found for productTypeId: ' + updateProductTypeDTO.productTypeId); 
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