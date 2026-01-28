import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Not, Repository } from 'typeorm';
import { ProductSetDTO, UpdateProductSetDTO } from './dto/product.set.dto';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductLanguageService } from 'src/tcgcommerce/modules/product/language/product.language.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE, PRODUCT_LANGUAGE_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductSetService {
    
    constructor(
        @InjectRepository(ProductSet) private productSetRepository: Repository<ProductSet>,
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private productLanguageService: ProductLanguageService
    ) { }

    async getProductSetById(productSetId: string): Promise<ProductSetDTO> {
        let productSet = await this.productSetRepository.findOneOrFail({
            where: { 
                productSetId: productSetId 
            } 
        });

        let productSetDTO: ProductSetDTO = ({ ...productSet });

        return productSetDTO;

    }

    async getProductSetByTCGdbId(productSetTCGdbId: string): Promise<ProductSetDTO> {
        let productSet = await this.productSetRepository.findOneOrFail({
            where: { 
                productSetTCGdbId: productSetTCGdbId 
            } 
        });

        let productSetDTO: ProductSetDTO = ({ ...productSet });

        return productSetDTO;

    }

    async getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode: string, productLineCode: string): Promise<ProductSetDTO[]> {
        
        let productVendor = await this.productVendorService.getProductVendorByCode(productVendorCode);
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        

        let productSetsDTOs = await this.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);

        return productSetsDTOs;
    }

    async getProductSetsByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string): Promise<ProductSetDTO[]> {
        let today = new Date();

        let productSets = await this.productSetRepository.find({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productSetCode: Not(''),
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        let productSetDTOs: ProductSetDTO[] = [];
        if(!productSets) {
            return productSetDTOs;    
        }
        
        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO: ProductSetDTO = ({ ...productSet });
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }

    async getProductSetsByProductLineId(productLineId: string): Promise<ProductSetDTO[]> {
        let today = new Date();
        
        let productSets = await this.productSetRepository.find({
            where: {
                productLineId: productLineId,
                productSetCode: Not(''),
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
         let productSetDTOs: ProductSetDTO[] = [];

        if(productSets == null) {
            return productSetDTOs;
        }
        
        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO: ProductSetDTO = ({ ...productSet });
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }

    async getProductSetByCode(productVendorId: string, productLineId: string, productSetCode: string): Promise<ProductSetDTO> {
        let today = new Date();
        
        let productSet = await this.productSetRepository.findOneOrFail({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productSetCode: productSetCode,
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        let productSetDTO: ProductSetDTO = ({ ...productSet });
            
        return productSetDTO;
    }

    async getProductSetByProductSetCode(productLineId: string, productSetCode: string): Promise<ProductSetDTO> {
        let today = new Date();
        
        let productSet = await this.productSetRepository.findOneOrFail({
            where: {
                productLineId: productLineId,
                productSetCode: productSetCode.toUpperCase(),
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        let productSetDTO: ProductSetDTO = ({ ...productSet });
            
        return productSetDTO;
    }
    
    async updateProductSet(updateProductSetDTO: UpdateProductSetDTO): Promise<ProductSetDTO> {
                            
        let productSet = await this.productSetRepository.findOneOrFail({ 
            where: { 
                productSetId: updateProductSetDTO.productSetId
            } 
        });

        productSet.productSetName = updateProductSetDTO.productSetName;
        productSet.productSetCode = updateProductSetDTO.productSetCode;
        productSet.productSetReleaseDate = updateProductSetDTO.productSetReleaseDate;
        productSet.productSetTotalCards = updateProductSetDTO.productSetTotalCards;
        productSet.productSetIsActive = updateProductSetDTO.productSetIsActive;
        productSet.productSetUpdateDate = new Date();
        
        await this.productSetRepository.save(productSet);

        let productSetDTO = await this.getProductSetById(productSet.productSetId);

        return productSetDTO;
    
    }

    async createProductSetsByProductLineCode(productLineCode: string): Promise<ProductSetDTO[]> {
        //TO DO: CREATE PRODUCT SETS FOR ALL VENDORS;
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductSets();
        } else {
            throw new NotFoundException('Product line code not found for bulk product set creation.');
        }
    }

    //TCGdb MTG PRODUCT SET CREATION;
    async createTCGdbMTGProductSets(): Promise<ProductSetDTO[]> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);
        let productLanguage = await this.productLanguageService.getProductLanguageByCodeAndProductLineId(PRODUCT_LANGUAGE_CODE.ENGLISH, productLine.productLineId);

        //GET THE PRODUCT SETS FROM TCGdb;
        let tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < tcgdbMTGSets.length; i++) {
            let tcgdbMTGSet = tcgdbMTGSets[i];
            
            let productSet = await this.productSetRepository.findOne({
                where: { 
                    productSetTCGdbId: tcgdbMTGSet.tcgdbMTGSetId 
                } 
            });
            
            if (!productSet) {
                productSet = this.productSetRepository.create({
                    productSetTCGdbId: tcgdbMTGSet.tcgdbMTGSetId,
                    productSetTCGPlayerId: tcgdbMTGSet.tcgdbMTGSetTCGPlayerId,
                    productVendorId: productVendor.productVendorId,
                    productLineId: productLine.productLineId,
                    productLanguageId: productLanguage.productLanguageId,
                    productSetName: tcgdbMTGSet.tcgdbMTGSetName,
                    productSetCode: tcgdbMTGSet.tcgdbMTGSetCode,
                    productSetTotalCards: tcgdbMTGSet.tcgdbMTGSetTotalCards,
                    productSetReleaseDate: tcgdbMTGSet.tcgdbMTGSetPublishedOn,
                    productSetIsActive: true,
                });

                await this.productSetRepository.save(productSet);
                
                let productSetDTO: ProductSetDTO = ({ ...productSet });

                productSetDTOs.push(productSetDTO);
            }
        }

        return productSetDTOs;

    }
}