import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardRarityDTO, ProductCardRarityDTO, UpdateProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarity } from 'src/typeorm/entities/tcgcommerce/modules/product/card/rarity/product.card.rarity.entity';
import { TCGdbMTGRarityService } from 'src/tcgdb/modules/tcgdb/mtg/rarity/tcgdb.mtg.rarity.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductCardRarityService {

    constructor(
        @InjectRepository(ProductCardRarity) private productCardRarityRepository: Repository<ProductCardRarity>,
        private tcgdbMTGRarityService: TCGdbMTGRarityService,
        private productLineService: ProductLineService
    ) { }

    async getProductCardRarity(productCardRarityId: string) {
        let productCardRarity = await this.productCardRarityRepository.findOne({
            where: { 
                productCardRarityId: productCardRarityId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardRarity == null) {
            return null;
        }

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
    }
    
    async getProductCardRaritiesByProductLineCode(productLineCode: string) {

        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        let productCardRarities = await this.productCardRarityRepository.find({
            where: { 
                productLineId: productLineId 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardRarities == null) {
            return null;
        }
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        for(let i = 0; i < productCardRarities.length; i++) {
            let productCardRarity = productCardRarities[i];
            let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;
    }
    async getProductCardRarities() {
        let productCardRarities = await this.productCardRarityRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardRarities == null) {
            return null;
        }
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

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
            return null;
        }

        let productCardRarityDTO: ProductCardRarityDTO = ({ ...productCardRarity });

        return productCardRarityDTO;
        
    }

    async createProductCardRarity(createProductCardRarityDTO: CreateProductCardRarityDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardRarity = await this.getProductCardRarityByNameAndProductLineId(createProductCardRarityDTO.productCardRarityName, createProductCardRarityDTO.productLineId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardRarity != null) {
            return null;
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

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardRarity) {
            return null; 
        }

        existingProductCardRarity.productCardRarityName = updateProductCardRarityDTO.productCardRarityName;
        existingProductCardRarity.productCardRarityAbbreviation = updateProductCardRarityDTO.productCardRarityAbbreviation;
        existingProductCardRarity.productCardRarityIsActive = updateProductCardRarityDTO.productCardRarityIsActive;
        existingProductCardRarity.productCardRarityUpdateDate = new Date();
        
        await this.productCardRarityRepository.save(existingProductCardRarity);

        let productCardRarityDTO = this.getProductCardRarity(existingProductCardRarity.productCardRarityId);

        return productCardRarityDTO;
    
    }

    //BULK CREATE PRODUCT CARD LANGAUGES;
    async createProductCardRaritiesByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT CARD LANGUAGES;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductCardRarities();
        } else {
            return null;
        }
    }

    async createTCGdbMTGProductCardRarities() {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productLine = await this.productLineService.getProductLineByCode("MTG");

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        //GET THE PRODUCT CARD RARITIES FROM TCGDB;
        let tcgdbMTGProductCardRarities = await this.tcgdbMTGRarityService.getTCGdbMTGRarities();
        
        if (tcgdbMTGProductCardRarities == null) {
            return null;
        }

        let productCardRarityRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardRarities.length; i++) {
            let tcgdbMTGProductCardRarity = tcgdbMTGProductCardRarities[i];
            
            let createProductCardRarityDTO = new CreateProductCardRarityDTO();
            createProductCardRarityDTO.productLineId = productLineId;
            createProductCardRarityDTO.productCardRarityName = tcgdbMTGProductCardRarity.tcgdbMTGRarityName;
            createProductCardRarityDTO.productCardRarityAbbreviation = tcgdbMTGProductCardRarity.tcgdbMTGRarityAbbreviation;
            createProductCardRarityDTO.productCardRarityIsActive = true;
            
            await this.createProductCardRarity(createProductCardRarityDTO);

            productCardRarityRecordCount++; 
        }

        return productCardRarityRecordCount;

    }
    
}