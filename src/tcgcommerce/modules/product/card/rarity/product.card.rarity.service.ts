import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardVariantDTO, ProductCardVariantDTO, UpdateProductCardVariantDTO } from './dto/product.card.rarity.dto';
import { ProductCardVariant } from 'src/typeorm/entities/tcgcommerce/modules/product/card/variant/product.card.variant.entity';

@Injectable()
export class ProductCardVariantService {

    constructor(
        @InjectRepository(ProductCardVariant) private productCardVariantRepository: Repository<ProductCardVariant>,
    ) { }

    async getProductCardVariant(productCardVariantId: string) {
        let productCardVariant = await this.productCardVariantRepository.findOne({
            where: { 
                productCardVariantId: productCardVariantId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardVariant == null) {
            return null;
        }

        let productCardVariantDTO = new ProductCardVariantDTO();
        productCardVariantDTO.productCardVariantId = productCardVariant.productCardVariantId;
        productCardVariantDTO.productCardVariantName = productCardVariant.productCardVariantName;
        productCardVariantDTO.productCardVariantAbbreviation = productCardVariant.productCardVariantAbbreviation;
        productCardVariantDTO.productCardVariantIsActive = productCardVariant.productCardVariantIsActive;
        productCardVariantDTO.productCardVariantCreateDate = productCardVariant.productCardVariantCreateDate;
        productCardVariantDTO.productCardVariantUpdateDate = productCardVariant.productCardVariantUpdateDate;

        return productCardVariantDTO;
    }
    
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
            productCardVariantDTO.productCardVariantAbbreviation = productCardVariant.productCardVariantAbbreviation;
            productCardVariantDTO.productCardVariantIsActive = productCardVariant.productCardVariantIsActive;
            productCardVariantDTO.productCardVariantCreateDate = productCardVariant.productCardVariantCreateDate;
            productCardVariantDTO.productCardVariantUpdateDate = productCardVariant.productCardVariantUpdateDate;
            
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
        productCardVariantDTO.productCardVariantAbbreviation = productCardVariant.productCardVariantAbbreviation;
        productCardVariantDTO.productCardVariantIsActive = productCardVariant.productCardVariantIsActive;
        productCardVariantDTO.productCardVariantCreateDate = productCardVariant.productCardVariantCreateDate;
        productCardVariantDTO.productCardVariantUpdateDate = productCardVariant.productCardVariantUpdateDate;

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

        let productCardVariantDTO = this.getProductCardVariant(newProductCardVariant.productCardVariantId);
        
        return productCardVariantDTO;
        
    }

    async updateProductCardVariant(updateProductCardVariantDTO: UpdateProductCardVariantDTO) {
                        
        let existingProductCardVariant = await this.productCardVariantRepository.findOne({ 
            where: { 
                productCardVariantId: updateProductCardVariantDTO.productCardVariantId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardVariant) {
            return null; 
        }

        existingProductCardVariant.productCardVariantName = updateProductCardVariantDTO.productCardVariantName;
        existingProductCardVariant.productCardVariantAbbreviation = updateProductCardVariantDTO.productCardVariantAbbreviation;
        existingProductCardVariant.productCardVariantIsActive = updateProductCardVariantDTO.productCardVariantIsActive;
        existingProductCardVariant.productCardVariantUpdateDate = new Date();
        
        await this.productCardVariantRepository.save(existingProductCardVariant);

        let productCardVariantDTO = this.getProductCardVariant(existingProductCardVariant.productCardVariantId);

        return productCardVariantDTO;
    
    }
    
}