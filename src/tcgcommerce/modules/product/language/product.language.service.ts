import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLanguageDTO, ProductLanguageDTO, UpdateProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageService } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductLanguageService {

    constructor(
        @InjectRepository(ProductLanguage) private productLanguageRepository: Repository<ProductLanguage>,
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
    ) { }

    async getProductLanguageById(productLanguageId: string): Promise<ProductLanguageDTO> {
        let productLanguage = await this.productLanguageRepository.findOneOrFail({
            where: { 
                productLanguageId: productLanguageId 
            } 
        });

        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
    }
    
    async getProductLanguages(): Promise<ProductLanguageDTO[]> {
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

    async getProductLanguagesByProductLineCode(productLineCode: string): Promise<ProductLanguageDTO[]> {
        
        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

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

    async getProductLanguageByNameAndProductLineId(productLanguageName: string, productLineId: string): Promise<ProductLanguageDTO> {
        let productLanguage = await this.productLanguageRepository.findOneOrFail({ 
            where: { 
                productLanguageName: productLanguageName,
                productLineId: productLineId 
            } 
        });
        
        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguageByCodeAndProductLineId(productLanguageCode: string, productLineId: string): Promise<ProductLanguageDTO> {
        let productLanguage = await this.productLanguageRepository.findOneOrFail({ 
            where: { 
                productLanguageCode: productLanguageCode,
                productLineId: productLineId,
                productLanguageIsActive: true 
            }
        });
        
        let productLanguageDTO: ProductLanguageDTO = ({ ...productLanguage });

        return productLanguageDTO;
        
    }

    async getProductLanguagesByProductLineId(productLineId: string): Promise<ProductLanguageDTO[]> {
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

    async createProductLanguage(createProductLanguageDTO: CreateProductLanguageDTO): Promise<ProductLanguageDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
         let productLanguage = await this.productLanguageRepository.findOne({ 
            where: { 
                productLanguageCode: createProductLanguageDTO.productLanguageCode,
                productVendorId: createProductLanguageDTO.productVendorId,
                productLineId: createProductLanguageDTO.productLineId 
            } 
        });

        if (productLanguage) {
            throw new ConflictException('Product language with the same code already exists for this product line and vendor.');
        }
        
        productLanguage = this.productLanguageRepository.create({ ...createProductLanguageDTO });
        productLanguage = await this.productLanguageRepository.save(productLanguage);

        let productLanguageDTO = await this.getProductLanguageById(productLanguage.productLanguageId);
        
        return productLanguageDTO;
        
    }

    async updateProductLanguage(updateProductLanguageDTO: UpdateProductLanguageDTO): Promise<ProductLanguageDTO> {
                        
        let productLanguage = await this.productLanguageRepository.findOneOrFail({ 
            where: { 
                productLanguageId: updateProductLanguageDTO.productLanguageId
            } 
        });

        productLanguage.productLanguageName = updateProductLanguageDTO.productLanguageName;
        productLanguage.productLanguageCode = updateProductLanguageDTO.productLanguageCode;
        productLanguage.productLanguageIsActive = updateProductLanguageDTO.productLanguageIsActive;
        productLanguage.productLanguageUpdateDate = new Date();
        
        await this.productLanguageRepository.save(productLanguage);

        let productLanguageDTO = await this.getProductLanguageById(productLanguage.productLanguageId);

        return productLanguageDTO;
    
    }

    //BULK CREATE PRODUCT CARD LANGAUGES;
    async createProductLanguagesByProductLineCode(productLineCode: string): Promise<number> {
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductLanguages();
        } else {
            throw new NotFoundException('Product line code not found for bulk product language creation.');
        }
    }

    async createTCGdbMTGProductLanguages(): Promise<number> {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);
        
        //GET THE PRODUCT CARD LANGUAGES FROM TCGDB;
        let tcgdbMTGProductLanguages = await this.tcgdbMTGLanguageService.getTCGdbMTGLanguages();

        let productLanguageRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductLanguages.length; i++) {
            let tcgdbMTGProductLanguage = tcgdbMTGProductLanguages[i];
            
            let productLanguage = await this.productLanguageRepository.findOne({ 
                where: { 
                    productLanguageCode: tcgdbMTGProductLanguage.tcgdbMTGLanguageCode,
                    productLineId: productLine.productLineId,
                }
            });

            if (!productLanguage) {
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