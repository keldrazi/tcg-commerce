import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductType } from 'src/typeorm/entities/modules/product/type/product.type.entity';

@Injectable()
export class ProductTypeService {

    constructor(
        @InjectRepository(ProductType) private productTypeRepository: Repository<ProductType>,
    ) { }

    async getProductTypes() {
        let productTypes = await this.productTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productTypes == null) {
            return null;
        }
        
        let productTypeDTOs: ProductTypeDTO[] = [];

        for(let i = 0; i < productTypes.length; i++) {
            let productType = productTypes[i];
            let productTypeDTO = new ProductTypeDTO();
            productTypeDTO.productTypeId = productType.productTypeId;
            productTypeDTO.productTypeName = productType.productTypeName;
            productTypeDTO.productVendorId = productType.productVendorId

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

        let productTypeDTO = new ProductTypeDTO();
        productTypeDTO.productTypeId = productType.productTypeId;
        productTypeDTO.productTypeName = productType.productTypeName;
        productTypeDTO.productVendorId = productType.productVendorId;

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

        let productTypeDTO = new ProductTypeDTO();
        productTypeDTO.productTypeId = newProductType.productTypeId;
        productTypeDTO.productTypeName = newProductType.productTypeName;
        productTypeDTO.productVendorId = newProductType.productVendorId;

        return productTypeDTO;
        
    }
    
}