import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLanguageDTO, ProductLanguageDTO, UpdateProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageService } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductLanguageService {

    constructor(
        @InjectRepository(ProductLanguage) private productLanguageRepository: Repository<ProductLanguage>,
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService,
        private productLineService: ProductLineService
    ) { }

    async getProductLanguage(productLanguageId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({
            where: { 
                productLanguageId: productLanguageId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productLanguage == null) {
            return null;
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
    }
    
    async getProductLanguages() {
        let productLanguages = await this.productLanguageRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productLanguages == null) {
            return null;
        }
        
        let productLanguageDTOs: ProductLanguageDTO[] = [];

        for(let i = 0; i < productLanguages.length; i++) {
            let productLanguage = productLanguages[i];
            let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });
            
            productLanguageDTOs.push(productLanguageDTO);
        }

        return productLanguageDTOs;
    }

    async getProductLanguagesByProductLineCode(productLineCode: string) {
        
        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        let productLanguages = await this.productLanguageRepository.find({
            where: { 
                productLineId: productLineId 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productLanguages == null) {
            return null;
        }
        
        let productLanguageDTOs: ProductLanguageDTO[] = [];

        for(let i = 0; i < productLanguages.length; i++) {
            let productLanguage = productLanguages[i];
            let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });
            
            productLanguageDTOs.push(productLanguageDTO);
        }

        return productLanguageDTOs;
    }

    async getProductLanguageByNameAndProductLineId(name: string, productLineId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageName: name,
                productLineId: productLineId 
            } 
        });
        
        if (productLanguage == null) {
            return null;
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguageByCodeAndProductLineId(abbrecviation: string, productLineId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageCode: abbrecviation,
                productLineId: productLineId 
            } 
        });
        
        if (productLanguage == null) {
            return null;
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguagesByProductLineId(productLineId: string) {
        let productLanguages = await this.productLanguageRepository.find({ 
            where: { 
                productLineId: productLineId 
            } 
        });
        
        if (productLanguages == null) {
            return null;
        }

        let productLanguageDTOs: ProductLanguageDTO[] = [];

        for(let i = 0; i < productLanguages.length; i++) {
            let productLanguage = productLanguages[i];
            let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });
            
            productLanguageDTOs.push(productLanguageDTO);
        }

        return productLanguageDTOs;
        
    }

    async createProductLanguage(createProductLanguageDTO: CreateProductLanguageDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productLanguage = await this.getProductLanguageByNameAndProductLineId(createProductLanguageDTO.productLanguageName, createProductLanguageDTO.productLineId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productLanguage != null) {
            return null;
        }
        
        let newProductLanguage = this.productLanguageRepository.create({ ...createProductLanguageDTO });
        newProductLanguage = await this.productLanguageRepository.save(newProductLanguage);

        let productLanguageDTO = this.getProductLanguage(newProductLanguage.productLanguageId);
        
        return productLanguageDTO;
        
    }

    async updateProductLanguage(updateProductLanguageDTO: UpdateProductLanguageDTO) {
                        
        let existingProductLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageId: updateProductLanguageDTO.productLanguageId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductLanguage) {
            return null; 
        }

        existingProductLanguage.productLanguageName = updateProductLanguageDTO.productLanguageName;
        existingProductLanguage.productLanguageCode = updateProductLanguageDTO.productLanguageCode;
        existingProductLanguage.productLanguageIsActive = updateProductLanguageDTO.productLanguageIsActive;
        existingProductLanguage.productLanguageUpdateDate = new Date();
        
        await this.productLanguageRepository.save(existingProductLanguage);

        let productLanguageDTO = this.getProductLanguage(existingProductLanguage.productLanguageId);

        return productLanguageDTO;
    
    }

    //BULK CREATE PRODUCT CARD LANGAUGES;
    async createProductLanguagesByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT CARD LANGUAGES;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductLanguages();
        } else {
            return null;
        }
    }

    async createTCGdbMTGProductLanguages() {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productLine = await this.productLineService.getProductLineByCode("MTG");

        if (productLine == null) {
            return null;
        }
        
        //GET THE PRODUCT CARD LANGUAGES FROM TCGDB;
        let tcgdbMTGProductLanguages = await this.tcgdbMTGLanguageService.getTCGdbMTGLanguages();
        
        if (tcgdbMTGProductLanguages == null) {
            return null;
        }

        let productLanguageRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductLanguages.length; i++) {
            let tcgdbMTGProductLanguage = tcgdbMTGProductLanguages[i];
            
            let createProductLanguageDTO = new CreateProductLanguageDTO();
            createProductLanguageDTO.productLanguageTCGdbId = tcgdbMTGProductLanguage.tcgdbMTGLanguageId;
            createProductLanguageDTO.productLanguageTCGPlayerId = tcgdbMTGProductLanguage.tcgdbMTGLanguageTCGPlayerId;
            createProductLanguageDTO.productLineId = productLine.productLineId;
            createProductLanguageDTO.productLanguageName = tcgdbMTGProductLanguage.tcgdbMTGLanguageName;
            createProductLanguageDTO.productLanguageCode = tcgdbMTGProductLanguage.tcgdbMTGLanguageCode;
            createProductLanguageDTO.productLanguageIsActive = true;
            
            await this.createProductLanguage(createProductLanguageDTO);

            productLanguageRecordCount++; 
        }

        return productLanguageRecordCount;

    }
    
}