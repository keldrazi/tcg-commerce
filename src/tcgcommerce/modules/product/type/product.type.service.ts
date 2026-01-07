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

    async getProductTypeById(productTypeId: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeId: productTypeId 
            } 
        });
        
        if (productType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypesByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string) {
        let productTypes = await this.productTypeRepository.find({ 
            where: { 
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeIsActive: true 
            },
            order: {
                productTypeName: 'ASC'
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

    async getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendorId: string, productLineId: string, productTypeCode: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeCode: productTypeCode,
            }
        });
        
        if (productType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
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
    
    async getProductTypeByName(productTypeName: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeName: productTypeName 
            } 
        });
        
        if (productType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypeByCode(productTypeCode: string) {
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeCode: productTypeCode 
            } 
        });
        
        if (productType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found');
        }

        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }
    
    async createProductType(createProductTypeDTO: CreateProductTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeName: createProductTypeDTO.productTypeName,
                productVendorId: createProductTypeDTO.productVendorId,
                productLineId: createProductTypeDTO.productLineId 
            } 
        });
        
        if (productType != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_ALREADY_EXISTS', 'Product type already exists');
        }
        
        productType = this.productTypeRepository.create({ ...createProductTypeDTO });
        productType = await this.productTypeRepository.save(productType);

        let productTypeDTO = this.getProductTypeById(productType.productTypeId);
        
        return productTypeDTO;
        
    }

    async updateProductType(updateProductTypeDTO: UpdateProductTypeDTO) {
                    
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeId: updateProductTypeDTO.productTypeId
            } 
        });

        if (!productType) {
            return this.errorMessageService.createErrorMessage('PRODUCT_TYPE_NOT_FOUND', 'Product type was not found'); 
        }

        productType.productTypeName = updateProductTypeDTO.productTypeName;
        productType.productTypeCode = updateProductTypeDTO.productTypeCode;
        productType.productTypeIsActive = updateProductTypeDTO.productTypeIsActive;
        productType.productTypeUpdateDate = new Date();
        
        await this.productTypeRepository.save(productType);

        let productTypeDTO = this.getProductTypeById(productType.productTypeId);
        
        return productTypeDTO;
    
    }
    
}