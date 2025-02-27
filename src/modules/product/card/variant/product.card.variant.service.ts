import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardVariantDTO, ProductCardVariantDTO } from './dto/product.card.variant.dto';
import { ProductCardVariant } from 'src/typeorm/entities/modules/product/card/variant/product.card.variant.entity';

@Injectable()
export class ProductCardVariantService {

    constructor(
        @InjectRepository(ProductCardVariant) private productCardVariantRepository: Repository<ProductCardVariant>,
    ) { }

    async getProductCardVariants() {
        let productCardVariants = await this.productCardVariantRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardVariants == null) {
            return null;
        }
        
        let productCardVariantDTOs: ProductCardVariantDTO[] = [];

        for(let i = 0; i < productCardVariants.length; i++) {
            let productCardVariant = productCardVariants[i];
            let productCardVariantDTO = new ProductCardVariantDTO();
            productCardVariantDTO.productCardVariantId = productCardVariant.productCardVariantId;
            productCardVariantDTO.productCardVariantName = productCardVariant.productCardVariantName;
            
            productCardVariantDTOs.push(productCardVariantDTO);
        }

        return productCardVariantDTOs;
    }

    async getProductCardVariantByName(name: string) {
        let productCardVariant = await this.productCardVariantRepository.findOne({ 
            where: { 
                productCardVariantName: name 
            } 
        });
        
        if (productCardVariant == null) {
            return null;
        }

        let productCardVariantDTO = new ProductCardVariantDTO();
        productCardVariantDTO.productCardVariantId = productCardVariant.productCardVariantId;
        productCardVariantDTO.productCardVariantName = productCardVariant.productCardVariantName;

        return productCardVariantDTO;
        
    }

    async createProductCardVariant(createProductCardVariantDTO: CreateProductCardVariantDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardVariant = await this.getProductCardVariantByName(createProductCardVariantDTO.productCardVariantName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardVariant != null) {
            return null;
        }
        
        let newProductCardVariant = this.productCardVariantRepository.create({ ...createProductCardVariantDTO });
        newProductCardVariant = await this.productCardVariantRepository.save(newProductCardVariant);

        let productCardVariantDTO = new ProductCardVariantDTO();
        productCardVariantDTO.productCardVariantId = newProductCardVariant.productCardVariantId;
        productCardVariantDTO.productCardVariantName = newProductCardVariant.productCardVariantName;

        return productCardVariantDTO;
        
    }
    
}