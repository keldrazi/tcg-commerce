import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardLanguageDTO, ProductCardLanguageDTO, UpdateProductCardLanguageDTO } from './dto/product.card.language.dto';
import { ProductCardLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/card/language/product.card.language.entity';

@Injectable()
export class ProductCardLanguageService {

    constructor(
        @InjectRepository(ProductCardLanguage) private productCardLanguageRepository: Repository<ProductCardLanguage>,
    ) { }

    async getProductCardLanguage(productCardLanguageId: string) {
        let productCardLanguage = await this.productCardLanguageRepository.findOne({
            where: { 
                productCardLanguageId: productCardLanguageId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardLanguage == null) {
            return null;
        }

        let productCardLanguageDTO = new ProductCardLanguageDTO();
        productCardLanguageDTO.productCardLanguageId = productCardLanguage.productCardLanguageId;
        productCardLanguageDTO.productCardLanguageName = productCardLanguage.productCardLanguageName;
        productCardLanguageDTO.productCardLanguageAbbreviation = productCardLanguage.productCardLanguageAbbreviation;
        productCardLanguageDTO.productCardLanguageIsActive = productCardLanguage.productCardLanguageIsActive;
        productCardLanguageDTO.productCardLanguageCreateDate = productCardLanguage.productCardLanguageCreateDate;
        productCardLanguageDTO.productCardLanguageUpdateDate = productCardLanguage.productCardLanguageUpdateDate;

        return productCardLanguageDTO;
    }
    
    async getProductCardLanguages() {
        let productCardLanguages = await this.productCardLanguageRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardLanguages == null) {
            return null;
        }
        
        let productCardLanguageDTOs: ProductCardLanguageDTO[] = [];

        for(let i = 0; i < productCardLanguages.length; i++) {
            let productCardLanguage = productCardLanguages[i];
            let productCardLanguageDTO = new ProductCardLanguageDTO();
            productCardLanguageDTO.productCardLanguageId = productCardLanguage.productCardLanguageId;
            productCardLanguageDTO.productCardLanguageName = productCardLanguage.productCardLanguageName;
            productCardLanguageDTO.productCardLanguageAbbreviation = productCardLanguage.productCardLanguageAbbreviation;
            productCardLanguageDTO.productCardLanguageIsActive = productCardLanguage.productCardLanguageIsActive;
            productCardLanguageDTO.productCardLanguageCreateDate = productCardLanguage.productCardLanguageCreateDate;
            productCardLanguageDTO.productCardLanguageUpdateDate = productCardLanguage.productCardLanguageUpdateDate;
            
            productCardLanguageDTOs.push(productCardLanguageDTO);
        }

        return productCardLanguageDTOs;
    }

    async getProductCardLanguageByName(name: string) {
        let productCardLanguage = await this.productCardLanguageRepository.findOne({ 
            where: { 
                productCardLanguageName: name 
            } 
        });
        
        if (productCardLanguage == null) {
            return null;
        }

        let productCardLanguageDTO = new ProductCardLanguageDTO();
        productCardLanguageDTO.productCardLanguageId = productCardLanguage.productCardLanguageId;
        productCardLanguageDTO.productCardLanguageName = productCardLanguage.productCardLanguageName;
        productCardLanguageDTO.productCardLanguageAbbreviation = productCardLanguage.productCardLanguageAbbreviation;
        productCardLanguageDTO.productCardLanguageIsActive = productCardLanguage.productCardLanguageIsActive;
        productCardLanguageDTO.productCardLanguageCreateDate = productCardLanguage.productCardLanguageCreateDate;
        productCardLanguageDTO.productCardLanguageUpdateDate = productCardLanguage.productCardLanguageUpdateDate;

        return productCardLanguageDTO;
        
    }

    async createProductCardLanguage(createProductCardLanguageDTO: CreateProductCardLanguageDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardLanguage = await this.getProductCardLanguageByName(createProductCardLanguageDTO.productCardLanguageName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardLanguage != null) {
            return null;
        }
        
        let newProductCardLanguage = this.productCardLanguageRepository.create({ ...createProductCardLanguageDTO });
        newProductCardLanguage = await this.productCardLanguageRepository.save(newProductCardLanguage);

        let productCardLanguageDTO = this.getProductCardLanguage(newProductCardLanguage.productCardLanguageId);
        
        return productCardLanguageDTO;
        
    }

    async updateProductCardLanguage(updateProductCardLanguageDTO: UpdateProductCardLanguageDTO) {
                        
        let existingProductCardLanguage = await this.productCardLanguageRepository.findOne({ 
            where: { 
                productCardLanguageId: updateProductCardLanguageDTO.productCardLanguageId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardLanguage) {
            return null; 
        }

        existingProductCardLanguage.productCardLanguageName = updateProductCardLanguageDTO.productCardLanguageName;
        existingProductCardLanguage.productCardLanguageAbbreviation = updateProductCardLanguageDTO.productCardLanguageAbbreviation;
        existingProductCardLanguage.productCardLanguageIsActive = updateProductCardLanguageDTO.productCardLanguageIsActive;
        existingProductCardLanguage.productCardLanguageUpdateDate = new Date();
        
        await this.productCardLanguageRepository.save(existingProductCardLanguage);

        let productCardLanguageDTO = this.getProductCardLanguage(existingProductCardLanguage.productCardLanguageId);

        return productCardLanguageDTO;
    
    }
    
}