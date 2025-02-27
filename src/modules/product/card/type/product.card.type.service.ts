import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardTypeDTO, ProductCardTypeDTO } from './dto/product.card.type.dto';
import { ProductCardType } from 'src/typeorm/entities/modules/product/card/type/product.card.type.entity';

@Injectable()
export class ProductCardTypeService {

    constructor(
        @InjectRepository(ProductCardType) private productCardTypeRepository: Repository<ProductCardType>,
    ) { }

    async getProductCardTypes() {
        let productCardTypes = await this.productCardTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardTypes == null) {
            return null;
        }
        
        let productCardTypeDTOs: ProductCardTypeDTO[] = [];

        for(let i = 0; i < productCardTypes.length; i++) {
            let productCardType = productCardTypes[i];
            let productCardTypeDTO = new ProductCardTypeDTO();
            productCardTypeDTO.productCardTypeId = productCardType.productCardTypeId;
            productCardTypeDTO.productCardTypeName = productCardType.productCardTypeName;
            productCardTypeDTO.productCardTypeVendor = productCardType.productCardTypeVendor;

            productCardTypeDTOs.push(productCardTypeDTO);
        }

        return productCardTypeDTOs;
    }
    
    async getProductCardTypeByName(name: string) {
        let productCardType = await this.productCardTypeRepository.findOne({ 
            where: { 
                productCardTypeName: name 
            } 
        });
        
        if (productCardType == null) {
            return null;
        }

        let productCardTypeDTO = new ProductCardTypeDTO();
        productCardTypeDTO.productCardTypeId = productCardType.productCardTypeId;
        productCardTypeDTO.productCardTypeName = productCardType.productCardTypeName;
        productCardTypeDTO.productCardTypeVendor = productCardType.productCardTypeVendor;

        return productCardTypeDTO;
        
    }
    
    async createProductCardType(createProductCardTypeDTO: CreateProductCardTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productCardType = await this.getProductCardTypeByName(createProductCardTypeDTO.productCardTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardType != null) {
            return null;
        }
        
        let newProductCardType = this.productCardTypeRepository.create({ ...createProductCardTypeDTO });
        newProductCardType = await this.productCardTypeRepository.save(newProductCardType);

        let productCardTypeDTO = new ProductCardTypeDTO();
        productCardTypeDTO.productCardTypeId = newProductCardType.productCardTypeId;
        productCardTypeDTO.productCardTypeName = newProductCardType.productCardTypeName;
        productCardTypeDTO.productCardTypeVendor = newProductCardType.productCardTypeVendor;

        return productCardTypeDTO;
        
    }
    
}