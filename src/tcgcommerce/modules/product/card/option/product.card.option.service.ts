import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCardOptionDTO, CreateProductCardOptionDTO } from './dto/product.card.option.dto';
import { ProductCardOption } from 'src/typeorm/entities/tcgcommerce/modules/product/card/option/product.card.option.entity';

@Injectable()
export class ProductCardOptionService {

    constructor(
        @InjectRepository(ProductCardOption) private productCardOptionRepository: Repository<ProductCardOption>,
    ) { }

    async getProductCardOptions() {
        let productCardOptions = await this.productCardOptionRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardOptions == null) {
            return null;
        }
        
        let productCardOptionDTOs: ProductCardOptionDTO[] = [];

        for(let i = 0; i < productCardOptions.length; i++) {
            let productCardOption = productCardOptions[i];
            let productCardOptionDTO = new ProductCardOptionDTO();
            productCardOptionDTO.productCardOptionId = productCardOption.productCardOptionId;
            productCardOptionDTO.productCardTypeName = productCardOption.productCardTypeName;
            productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;
            
            productCardOptionDTOs.push(productCardOptionDTO);
        }

        return productCardOptionDTOs;
    }
    
    async getProductCardOptionsByTypeName(typeName) {
        let productCardOptions = await this.productCardOptionRepository.find({
            where: {
                productCardTypeName: typeName
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
            productCardOptionDTO.productCardTypeName = productCardOption.productCardTypeName;
            productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;
            
            productCardOptionDTOs.push(productCardOptionDTO);
        }

        return productCardOptionDTOs;
    }

    async getProductCardOptionByName(name: string) {
        let productCardOption = await this.productCardOptionRepository.findOne({ 
            where: { 
                productCardOptionName: name 
            } 
        });
        
        if (productCardOption == null) {
            return null;
        }

        let productCardOptionDTO = new ProductCardOptionDTO();
        productCardOptionDTO.productCardOptionId = productCardOption.productCardOptionId;
        productCardOptionDTO.productCardTypeName = productCardOption.productCardTypeName;
        productCardOptionDTO.productCardOptionName = productCardOption.productCardOptionName;

        return productCardOptionDTO;
        
    }
    
    async createProductCardOption(createProductCardOptionDTO: CreateProductCardOptionDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productCardOption = await this.getProductCardOptionByName(createProductCardOptionDTO.productCardOptionName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardOption != null) {
            return null;
        }
        
        let newProductCardOption = this.productCardOptionRepository.create({ ...createProductCardOptionDTO });
        newProductCardOption = await this.productCardOptionRepository.save(newProductCardOption);

        let productCardOptionDTO = new ProductCardOptionDTO();
        productCardOptionDTO.productCardOptionId = newProductCardOption.productCardOptionId;
        productCardOptionDTO.productCardTypeName = newProductCardOption.productCardTypeName;
        productCardOptionDTO.productCardOptionName = newProductCardOption.productCardOptionName;

        return productCardOptionDTO;
        
    }   
}