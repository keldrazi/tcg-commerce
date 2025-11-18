import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLanguageDTO, ProductLanguageDTO, UpdateProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageService } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class ProductLanguageService {

    constructor(
        @InjectRepository(ProductLanguage) private productLanguageRepository: Repository<ProductLanguage>,
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService,
        private productLineService: ProductLineService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getProductLanguage(productLanguageId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({
            where: { 
                productLanguageId: productLanguageId 
            } 
        });

        if(productLanguage == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found for productLanguageId: ' + productLanguageId);
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
    }
    
    async getProductLanguages() {
        let productLanguages = await this.productLanguageRepository.find();
        
        let productLanguageDTOs: ProductLanguageDTO[] = [];

        if(productLanguages == null) {
            return productLanguageDTOs;
        }
        
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

        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found for productLineCode: ' + productLineCode);
        }

        let productLineId = productLine.productLineId;

        let productLanguages = await this.productLanguageRepository.find({
            where: { 
                productLineId: productLineId 
            }
        });
        
        let productLanguageDTOs: ProductLanguageDTO[] = [];
       
        if(productLanguages == null) {
            return productLanguageDTOs;
        }
        
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
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found for productLanguageName: ' + name + ' and productLineId: ' + productLineId);
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguageByCodeAndProductLineId(productLanguageCode: string, productLineId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageCode: productLanguageCode,
                productLineId: productLineId 
            } 
        });
        
        if (productLanguage == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found for productLanguageCode: ' + productLanguageCode + ' and productLineId: ' + productLineId);
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
        
        let productLanguageDTOs: ProductLanguageDTO[] = [];
        
        if (productLanguages == null) {
            return productLanguageDTOs;
        }
        
        for(let i = 0; i < productLanguages.length; i++) {
            let productLanguage = productLanguages[i];
            let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });
            
            productLanguageDTOs.push(productLanguageDTO);
        }

        return productLanguageDTOs;
        
    }

    async createProductLanguage(createProductLanguageDTO: CreateProductLanguageDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
         let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageCode: createProductLanguageDTO.productLanguageCode,
                productLineId: createProductLanguageDTO.productLineId 
            } 
        });

        if (productLanguage != null) {
            return this.errorMessageService.createErrorMessage('DUPLICATE_PRODUCT_LANGUAGE', 'Product language already exists for productLanguageCode: ' + createProductLanguageDTO.productLanguageCode + ' and productLineId: ' + createProductLanguageDTO.productLineId);
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

        if (!existingProductLanguage) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found for productLanguageId: ' + updateProductLanguageDTO.productLanguageId); 
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

        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found for productLineCode: MTG');
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