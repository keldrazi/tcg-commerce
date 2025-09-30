import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardLanguageDTO, ProductCardLanguageDTO, UpdateProductCardLanguageDTO } from './dto/product.card.language.dto';
import { ProductCardLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/card/language/product.card.language.entity';
import { TCGdbMTGLanguageService } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductCardLanguageService {

    constructor(
        @InjectRepository(ProductCardLanguage) private productCardLanguageRepository: Repository<ProductCardLanguage>,
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService,
        private productLineService: ProductLineService
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

        let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });

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
            let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });
            
            productCardLanguageDTOs.push(productCardLanguageDTO);
        }

        return productCardLanguageDTOs;
    }

    async getProductCardLanguagesByProductLineCode(productLineCode: string) {
        
        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        let productCardLanguages = await this.productCardLanguageRepository.find({
            where: { 
                productLineId: productLineId 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardLanguages == null) {
            return null;
        }
        
        let productCardLanguageDTOs: ProductCardLanguageDTO[] = [];

        for(let i = 0; i < productCardLanguages.length; i++) {
            let productCardLanguage = productCardLanguages[i];
            let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });
            
            productCardLanguageDTOs.push(productCardLanguageDTO);
        }

        return productCardLanguageDTOs;
    }

    async getProductCardLanguageByNameAndProductLineId(name: string, productLineId: string) {
        let productCardLanguage = await this.productCardLanguageRepository.findOne({ 
            where: { 
                productCardLanguageName: name,
                productLineId: productLineId 
            } 
        });
        
        if (productCardLanguage == null) {
            return null;
        }

        let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });

        return productCardLanguageDTO;
        
    }

    async getProductCardLanguageByCodeAndProductLineId(abbrecviation: string, productLineId: string) {
        let productCardLanguage = await this.productCardLanguageRepository.findOne({ 
            where: { 
                productCardLanguageCode: abbrecviation,
                productLineId: productLineId 
            } 
        });
        
        if (productCardLanguage == null) {
            return null;
        }

        let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });

        return productCardLanguageDTO;
        
    }

    async getProductCardLanguagesByProductLineId(productLineId: string) {
        let productCardLanguages = await this.productCardLanguageRepository.find({ 
            where: { 
                productLineId: productLineId 
            } 
        });
        
        if (productCardLanguages == null) {
            return null;
        }

        let productCardLanguageDTOs: ProductCardLanguageDTO[] = [];

        for(let i = 0; i < productCardLanguages.length; i++) {
            let productCardLanguage = productCardLanguages[i];
            let productCardLanguageDTO: ProductCardLanguageDTO = ({ ...productCardLanguage });
            
            productCardLanguageDTOs.push(productCardLanguageDTO);
        }

        return productCardLanguageDTOs;
        
    }

    async createProductCardLanguage(createProductCardLanguageDTO: CreateProductCardLanguageDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardLanguage = await this.getProductCardLanguageByNameAndProductLineId(createProductCardLanguageDTO.productCardLanguageName, createProductCardLanguageDTO.productLineId);
        
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
        existingProductCardLanguage.productCardLanguageCode = updateProductCardLanguageDTO.productCardLanguageCode;
        existingProductCardLanguage.productCardLanguageIsActive = updateProductCardLanguageDTO.productCardLanguageIsActive;
        existingProductCardLanguage.productCardLanguageUpdateDate = new Date();
        
        await this.productCardLanguageRepository.save(existingProductCardLanguage);

        let productCardLanguageDTO = this.getProductCardLanguage(existingProductCardLanguage.productCardLanguageId);

        return productCardLanguageDTO;
    
    }

    //BULK CREATE PRODUCT CARD LANGAUGES;
    async createProductCardLanguagesByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT CARD LANGUAGES;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductCardLanguages();
        } else {
            return null;
        }
    }

    async createTCGdbMTGProductCardLanguages() {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productLine = await this.productLineService.getProductLineByCode("MTG");

        if (productLine == null) {
            return null;
        }
        
        //GET THE PRODUCT CARD LANGUAGES FROM TCGDB;
        let tcgdbMTGProductCardLanguages = await this.tcgdbMTGLanguageService.getTCGdbMTGLanguages();
        
        if (tcgdbMTGProductCardLanguages == null) {
            return null;
        }

        let productCardLanguageRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardLanguages.length; i++) {
            let tcgdbMTGProductCardLanguage = tcgdbMTGProductCardLanguages[i];
            
            let createProductCardLanguageDTO = new CreateProductCardLanguageDTO();
            createProductCardLanguageDTO.productCardLanguageTCGdbId = tcgdbMTGProductCardLanguage.tcgdbMTGLanguageId;
            createProductCardLanguageDTO.productCardLanguageTCGPlayerId = tcgdbMTGProductCardLanguage.tcgdbMTGLanguageTCGPlayerId;
            createProductCardLanguageDTO.productLineId = productLine.productLineId;
            createProductCardLanguageDTO.productCardLanguageName = tcgdbMTGProductCardLanguage.tcgdbMTGLanguageName;
            createProductCardLanguageDTO.productCardLanguageCode = tcgdbMTGProductCardLanguage.tcgdbMTGLanguageCode;
            createProductCardLanguageDTO.productCardLanguageIsActive = true;
            
            await this.createProductCardLanguage(createProductCardLanguageDTO);

            productCardLanguageRecordCount++; 
        }

        return productCardLanguageRecordCount;

    }
    
}