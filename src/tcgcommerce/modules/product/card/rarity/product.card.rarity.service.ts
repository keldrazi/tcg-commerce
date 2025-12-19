import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardRarityDTO, ProductCardRarityDTO, UpdateProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarity } from 'src/typeorm/entities/tcgcommerce/modules/product/card/rarity/product.card.rarity.entity';
import { TCGdbMTGRarityService } from 'src/tcgdb/modules/tcgdb/api/mtg/rarity/tcgdb.mtg.rarity.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductCardRarityService {

    constructor(
        @InjectRepository(ProductCardRarity) private productCardRarityRepository: Repository<ProductCardRarity>,
        private tcgdbMTGRarityService: TCGdbMTGRarityService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
        private errorMessageService: ErrorMessageService
    ) { }

    async getProductCardRarity(productCardRarityId: string) {
        let productCardRarity = await this.productCardRarityRepository.findOne({
            where: { 
                productCardRarityId: productCardRarityId 
            } 
        });

        if(productCardRarity == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_RARITY_NOT_FOUND', 'Product card rarity was not found for productCardRarityId: ' + productCardRarityId);
        }

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
    }
    
    async getProductCardRaritiesByProductLineCode(productLineCode: string) {

        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineId = productLine.productLineId;

        let productCardRarities = await this.productCardRarityRepository.find({
            where: { 
                productLineId: productLineId 
            }
        });
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        if(productCardRarities == null) {
            return productCardRarityDTOs;
        }

        for(let i = 0; i < productCardRarities.length; i++) {
            let productCardRarity = productCardRarities[i];
            let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;

    }
    
    async getProductCardRarities() {
        let productCardRarities = await this.productCardRarityRepository.find();
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        if(productCardRarities == null) {
            return productCardRarityDTOs;
        }
      
        for(let i = 0; i < productCardRarities.length; i++) {
            let productCardRarity = productCardRarities[i];
            let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;
    }

    async getProductCardRarityByNameAndProductLineId(name: string, productLineId: string) {
        let productCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityName: name,
                productLineId: productLineId 
            } 
        });
        
        if (productCardRarity == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_RARITY_NOT_FOUND', 'Product card rarity was not found');
        }

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
        
    }

    async getProductCardRarityByCodeAndProductLineId(code: string, productLineId: string) {
        let productCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityCode: code,
                productLineId: productLineId 
            } 
        });
        
        if (productCardRarity == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_RARITY_NOT_FOUND', 'Product card rarity was not found');
        }

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
        
    }

    async createProductCardRarity(createProductCardRarityDTO: CreateProductCardRarityDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityName: createProductCardRarityDTO.productCardRarityName,
                productLineId: createProductCardRarityDTO.productLineId,
                productVendorId: createProductCardRarityDTO.productVendorId
            } 
        });
        
        if (productCardRarity != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_RARITY_ALREADY_EXISTS', 'Product card rarity already exists');
        }
        
        let newProductCardRarity = this.productCardRarityRepository.create({ ...createProductCardRarityDTO });
        newProductCardRarity = await this.productCardRarityRepository.save(newProductCardRarity);

        let productCardRarityDTO = this.getProductCardRarity(newProductCardRarity.productCardRarityId);
        
        return productCardRarityDTO;
        
    }

    async updateProductCardRarity(updateProductCardRarityDTO: UpdateProductCardRarityDTO) {
                        
        let existingProductCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityId: updateProductCardRarityDTO.productCardRarityId
            } 
        });

        if (!existingProductCardRarity) {
            return this.errorMessageService.createErrorMessage('PRODUCT_CARD_RARITY_NOT_FOUND', 'Product card rarity was not found');
        }

        existingProductCardRarity.productCardRarityName = updateProductCardRarityDTO.productCardRarityName;
        existingProductCardRarity.productCardRarityCode = updateProductCardRarityDTO.productCardRarityCode;
        existingProductCardRarity.productCardRarityIsActive = updateProductCardRarityDTO.productCardRarityIsActive;
        existingProductCardRarity.productCardRarityUpdateDate = new Date();
        
        await this.productCardRarityRepository.save(existingProductCardRarity);

        let productCardRarityDTO = this.getProductCardRarity(existingProductCardRarity.productCardRarityId);

        return productCardRarityDTO;
    
    }

    //BULK CREATE PRODUCT CARD RARITIES BY PRODUCT LINE CODE;
    async createProductCardRaritiesByProductLineCode(productLineCode: string) {
        //TO DO: CREATE PRODUCT CARD RARITIES FOR OTHER PRODUCT LINES;
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCardRarities();
        } else {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }
    }

    async createTCGdbMTGProductCardRarities() {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);

        if (productVendor == null || productVendor instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }
        
        if (productLine == null || productLine instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        //GET THE PRODUCT CARD RARITIES FROM TCGDB;
        let tcgdbMTGProductCardRarities = await this.tcgdbMTGRarityService.getTCGdbMTGRarities();
        
        if (tcgdbMTGProductCardRarities == null) {
            return this.errorMessageService.createErrorMessage('TCGDB_MTG_RARITIES_NOT_FOUND', 'No TCGdb MTG rarities were found.');
        }

        let productCardRarityRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardRarities.length; i++) {
            let tcgdbMTGProductCardRarity = tcgdbMTGProductCardRarities[i];
            
            let productCardRarity = await this.getProductCardRarityByCodeAndProductLineId(tcgdbMTGProductCardRarity.tcgdbMTGRarityCode, productLine.productLineId);
            if(productCardRarity instanceof ErrorMessageDTO) {
                let createProductCardRarityDTO = new CreateProductCardRarityDTO();
                createProductCardRarityDTO.productVendorId = productVendor.productVendorId;
                createProductCardRarityDTO.productLineId = productLine.productLineId;
                createProductCardRarityDTO.productCardRarityTCGdbId = tcgdbMTGProductCardRarity.tcgdbMTGRarityId;
                createProductCardRarityDTO.productCardRarityTCGPlayerId = tcgdbMTGProductCardRarity.tcgdbMTGRarityTCGPlayerId;
                createProductCardRarityDTO.productCardRarityName = tcgdbMTGProductCardRarity.tcgdbMTGRarityName;
                createProductCardRarityDTO.productCardRarityCode = tcgdbMTGProductCardRarity.tcgdbMTGRarityCode;
                createProductCardRarityDTO.productCardRarityIsActive = true;
                
                await this.createProductCardRarity(createProductCardRarityDTO);

                productCardRarityRecordCount++; 
            }
        }

        return productCardRarityRecordCount;

    }
    
}