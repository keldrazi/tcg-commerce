import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDTO, UpdateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductType } from 'src/typeorm/entities/tcgcommerce/modules/product/type/product.type.entity';

@Injectable()
export class ProductTypeService {

    constructor(
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>
    ) { }

    async getProductTypeById(productTypeId: string): Promise<ProductTypeDTO> {
        let productType = await this.productTypeRepository.findOneOrFail({ 
            where: { 
                productTypeId: productTypeId 
            } 
        });
        
        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypesByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string): Promise<ProductTypeDTO[]> {
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

    async getProductTypeByProductVendorIdAndProductLineIdAndProductTypeCode(productVendorId: string, productLineId: string, productTypeCode: string): Promise<ProductTypeDTO> {
        let productType = await this.productTypeRepository.findOneOrFail({ 
            where: { 
                productVendorId: productVendorId,
                productLineId: productLineId,
                productTypeCode: productTypeCode,
            }
        });
        
        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypes(): Promise<ProductTypeDTO[]> {
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
    
    async getProductTypeByName(productTypeName: string): Promise<ProductTypeDTO> {
        let productType = await this.productTypeRepository.findOneOrFail({ 
            where: { 
                productTypeName: productTypeName 
            } 
        });
        
        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }

    async getProductTypeByCode(productTypeCode: string): Promise<ProductTypeDTO> {
        let productType = await this.productTypeRepository.findOneOrFail({ 
            where: { 
                productTypeCode: productTypeCode 
            } 
        });
        
        let productTypeDTO: ProductTypeDTO = ({ ...productType });

        return productTypeDTO;
        
    }
    
    async createProductType(createProductTypeDTO: CreateProductTypeDTO): Promise<ProductTypeDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productType = await this.productTypeRepository.findOne({ 
            where: { 
                productTypeName: createProductTypeDTO.productTypeName,
                productVendorId: createProductTypeDTO.productVendorId,
                productLineId: createProductTypeDTO.productLineId 
            } 
        });
        
        if (productType) {
            throw new ConflictException('Product type already exists');
        }
        
        productType = this.productTypeRepository.create({ ...createProductTypeDTO });
        productType = await this.productTypeRepository.save(productType);

        let productTypeDTO = await this.getProductTypeById(productType.productTypeId);
        
        return productTypeDTO;
        
    }

    async updateProductType(updateProductTypeDTO: UpdateProductTypeDTO): Promise<ProductTypeDTO> {
                    
        let productType = await this.productTypeRepository.findOneOrFail({ 
            where: { 
                productTypeId: updateProductTypeDTO.productTypeId
            } 
        });

        productType.productTypeName = updateProductTypeDTO.productTypeName;
        productType.productTypeCode = updateProductTypeDTO.productTypeCode;
        productType.productTypeIsActive = updateProductTypeDTO.productTypeIsActive;
        productType.productTypeUpdateDate = new Date();
        
        await this.productTypeRepository.save(productType);

        let productTypeDTO = await this.getProductTypeById(productType.productTypeId);
        
        return productTypeDTO;
        
        }
    
}