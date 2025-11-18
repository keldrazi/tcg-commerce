import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Not, Repository } from 'typeorm';
import { ProductSetDTO, CreateProductSetDTO, UpdateProductSetDTO } from './dto/product.set.dto';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';
import { TCGdbMTGSetService } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class ProductSetService {
    
    constructor(
        @InjectRepository(ProductSet) private productSetRepository: Repository<ProductSet>,
        private tcgdbMTGSetService: TCGdbMTGSetService,
        private productVendorService: ProductVendorService,
        private productLineService: ProductLineService,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getProductSet(productSetId: string) {
        let productSet = await this.productSetRepository.findOne({
            where: { 
                productSetId: productSetId 
            } 
        });

        if(productSet == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set was not found for productSetId: ' + productSetId);
        }

        let productSetDTO: ProductSetDTO = ({ ...productSet });

        return productSetDTO;

    }

    async getProductSetByTCGdbId(productSetTCGdbId: string) {
        let productSet = await this.productSetRepository.findOne({
            where: { 
                productSetTCGdbId: productSetTCGdbId 
            } 
        });

        if(productSet == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set was not found for productSetTCGdbId: ' + productSetTCGdbId);
        }

        let productSetDTO: ProductSetDTO = ({ ...productSet });

        return productSetDTO;

    }

    async getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode: string, productLineCode: string) {
        
        let productVendor = await this.productVendorService.getProductVendorByCode(productVendorCode);
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);
        

        if((productVendor != null && productVendor instanceof ErrorMessageDTO) || (productLine != null && productLine instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_OR_PRODUCT_LINE_NOT_FOUND', 'Product vendor or product line was not found for productVendorCode: ' + productVendorCode + ' and productLineCode: ' + productLineCode);
        }

        let productSetsDTOs = await this.getProductSetsByProductVendorIdAndProductLineId(productVendor.productVendorId, productLine.productLineId);

        return productSetsDTOs;
    }

    async getProductSetsByProductVendorIdAndProductLineId(productVendorId: string, productLineId: string) {
        let today = new Date();

        let productSets = await this.productSetRepository.find({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productSetCode: Not(''),
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        if(productSets == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SETS_NOT_FOUND', 'Product sets were not found for productVendorId: ' + productVendorId + ' and productLineId: ' + productLineId);
        }
        
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO: ProductSetDTO = ({ ...productSet });
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }

    async getProductSetsByProductLineId(productLineId: string) {
        let today = new Date();
        
        let productSets = await this.productSetRepository.find({
            where: {
                productLineId: productLineId,
                productSetCode: Not(''),
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        if(productSets == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SETS_NOT_FOUND', 'Product sets were not found for productLineId: ' + productLineId);
        }
        
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < productSets.length; i++) {
            let productSet = productSets[i];
            let productSetDTO: ProductSetDTO = ({ ...productSet });
            
            productSetDTOs.push(productSetDTO);
        }

        return productSetDTOs;
    }

    async getProductSetByCode(productVendorId: string, productLineId: string, productSetCode: string) {
        let today = new Date();
        
        let productSet = await this.productSetRepository.findOne({
            where: {
                productVendorId: productVendorId,
                productLineId: productLineId,
                productSetCode: productSetCode,
                productSetReleaseDate: LessThanOrEqual(today)
            }
        });
        
        if(productSet == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set was not found for productVendorId: ' + productVendorId + ', productLineId: ' + productLineId + ', and productSetCode: ' + productSetCode);
        }
        
        let productSetDTO: ProductSetDTO = ({ ...productSet });
            
        return productSetDTO;
    }
    
    async updateProductSet(updateProductSetDTO: UpdateProductSetDTO) {
                            
        let existingProductSet = await this.productSetRepository.findOne({ 
            where: { 
                productSetId: updateProductSetDTO.productSetId
            } 
        });

        if(!existingProductSet) {
            return this.errorMessageService.createErrorMessage('PRODUCT_SET_NOT_FOUND', 'Product set was not found for productSetId: ' + updateProductSetDTO.productSetId); 
        }

        existingProductSet.productSetName = updateProductSetDTO.productSetName;
        existingProductSet.productSetCode = updateProductSetDTO.productSetCode;
        existingProductSet.productSetReleaseDate = updateProductSetDTO.productSetReleaseDate;
        existingProductSet.productSetTotalCards = updateProductSetDTO.productSetTotalCards;
        existingProductSet.productSetIsActive = updateProductSetDTO.productSetIsActive;
        existingProductSet.productSetUpdateDate = new Date();
        
        await this.productSetRepository.save(existingProductSet);

        let productSetDTO = this.getProductSet(existingProductSet.productSetId);

        return productSetDTO;
    
    }

    async createProductSetsByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT SETS FOR ALL VENDORS;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductSets();
        } else {
            return null;
        }
    }

    //TCGdb MTG PRODUCT SET CREATION;
    async createTCGdbMTGProductSets() {

        let productVendor = await this.productVendorService.getProductVendorByCode('WoTC');
        let productLine = await this.productLineService.getProductLineByCode('MTG');

        if((productVendor != null && productVendor instanceof ErrorMessageDTO) || (productLine != null && productLine instanceof ErrorMessageDTO)) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_OR_PRODUCT_LINE_NOT_FOUND', 'Product vendor or product line was not found for productVendorCode: WoTC and productLineCode: MTG');
        }

        let tcgdbMTGSets = await this.tcgdbMTGSetService.getTCGdbMTGSets();
        let productSetDTOs: ProductSetDTO[] = [];

        for(let i = 0; i < tcgdbMTGSets.length; i++) {
            let tcgdbMTGSet = tcgdbMTGSets[i];

            let productSet = await this.getProductSetByTCGdbId(tcgdbMTGSet.tcgdbMTGSetId);
            
            if (productSet != null) {
                continue;
            }

            let newProductSet = this.productSetRepository.create({
                productSetTCGdbId: tcgdbMTGSet.tcgdbMTGSetId,
                productSetTCGPlayerId: tcgdbMTGSet.tcgdbMTGSetTCGPlayerId,
                productVendorId: productVendor.productVendorId,
                productLineId: productLine.productLineId,
                productSetName: tcgdbMTGSet.tcgdbMTGSetName,
                productSetCode: tcgdbMTGSet.tcgdbMTGSetCode,
                productSetTotalCards: tcgdbMTGSet.tcgdbMTGSetTotalCards,
                productSetReleaseDate: tcgdbMTGSet.tcgdbMTGSetPublishedOn,
                productSetIsActive: true,
            });

            let productSetDTO = await this.productSetRepository.save(newProductSet);
            productSetDTOs.push(productSetDTO);

        }

        return productSetDTOs;

    }
}