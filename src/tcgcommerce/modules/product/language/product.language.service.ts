import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLanguageDTO, ProductLanguageDTO, UpdateProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageService } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductLanguageService {

    constructor(
        @InjectRepository(ProductLanguage) private productLanguageRepository: Repository<ProductLanguage>,
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getProductLanguageById(productLanguageId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({
            where: { 
                productLanguageId: productLanguageId 
            } 
        });

        if(productLanguage == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found');
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
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineId = productLine.productLineId;

        let productLanguages = await this.productLanguageRepository.find({
            where: { 
                productLineId: productLineId,
                productLanguageIsActive: true 
            },
            order: {
                productLanguageName: 'ASC'
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

    async getProductLanguageByNameAndProductLineId(productLanguageName: string, productLineId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageName: productLanguageName,
                productLineId: productLineId 
            } 
        });
        
        if (productLanguage == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found');
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguageByCodeAndProductLineId(productLanguageCode: string, productLineId: string) {
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageCode: productLanguageCode,
                productLineId: productLineId,
                productLanguageIsActive: true 
            }
        });
        
        if (productLanguage == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found');
        }

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguagesByProductLineId(productLineId: string) {
        let productLanguages = await this.productLanguageRepository.find({ 
            where: { 
                productLineId: productLineId,
                productLanguageIsActive: true 
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
                productVendorId: createProductLanguageDTO.productVendorId,
                productLineId: createProductLanguageDTO.productLineId 
            } 
        });

        if (productLanguage != null) {
            return this.errorMessageService.createErrorMessage('DUPLICATE_PRODUCT_LANGUAGE', 'Product language already exists');
        }
        
        productLanguage = this.productLanguageRepository.create({ ...createProductLanguageDTO });
        productLanguage = await this.productLanguageRepository.save(productLanguage);

        let productLanguageDTO = this.getProductLanguageById(productLanguage.productLanguageId);
        
        return productLanguageDTO;
        
    }

    async updateProductLanguage(updateProductLanguageDTO: UpdateProductLanguageDTO) {
                        
        let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageId: updateProductLanguageDTO.productLanguageId
            } 
        });

        if (!productLanguage) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LANGUAGE_NOT_FOUND', 'Product language was not found');
        }

        productLanguage.productLanguageName = updateProductLanguageDTO.productLanguageName;
        productLanguage.productLanguageCode = updateProductLanguageDTO.productLanguageCode;
        productLanguage.productLanguageIsActive = updateProductLanguageDTO.productLanguageIsActive;
        productLanguage.productLanguageUpdateDate = new Date();
        
        await this.productLanguageRepository.save(productLanguage);

        let productLanguageDTO = this.getProductLanguageById(productLanguage.productLanguageId);

        return productLanguageDTO;
    
    }

    //BULK CREATE PRODUCT CARD LANGAUGES;
    async createProductLanguagesByProductLineCode(productLineCode: string) {
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductLanguages();
        } else {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }
    }

    async createTCGdbMTGProductLanguages() {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);


        if(productVendor == null || productVendor instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }

        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }
        
        //GET THE PRODUCT CARD LANGUAGES FROM TCGDB;
        let tcgdbMTGProductLanguages = await this.tcgdbMTGLanguageService.getTCGdbMTGLanguages();
        
        if (tcgdbMTGProductLanguages == null) {
            return null;
        }

        let productLanguageRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductLanguages.length; i++) {
            let tcgdbMTGProductLanguage = tcgdbMTGProductLanguages[i];
            
            let productLanguage = await this.getProductLanguageByCodeAndProductLineId(tcgdbMTGProductLanguage.tcgdbMTGLanguageCode, productLine.productLineId);

            if (productLanguage instanceof ErrorMessageDTO) {
                let createProductLanguageDTO = new CreateProductLanguageDTO();
                createProductLanguageDTO.productLanguageTCGdbId = tcgdbMTGProductLanguage.tcgdbMTGLanguageId;
                createProductLanguageDTO.productLanguageTCGPlayerId = tcgdbMTGProductLanguage.tcgdbMTGLanguageTCGPlayerId;
                createProductLanguageDTO.productVendorId = productVendor.productVendorId;
                createProductLanguageDTO.productLineId = productLine.productLineId;
                createProductLanguageDTO.productLanguageName = tcgdbMTGProductLanguage.tcgdbMTGLanguageName;
                createProductLanguageDTO.productLanguageCode = tcgdbMTGProductLanguage.tcgdbMTGLanguageCode;
                createProductLanguageDTO.productLanguageIsActive = true;
                
                await this.createProductLanguage(createProductLanguageDTO);

                productLanguageRecordCount++; 
            }
            
        }

        return productLanguageRecordCount;

    }
    
}