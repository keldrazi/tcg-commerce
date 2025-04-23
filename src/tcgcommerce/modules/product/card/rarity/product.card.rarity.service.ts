import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardRarityDTO, ProductCardRarityDTO, UpdateProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarity } from 'src/typeorm/entities/tcgcommerce/modules/product/card/rarity/product.card.rarity.entity';
import { TCGdbMTGRarityService } from 'src/tcgdb/modules/tcgdb/mtg/rarity/tcgdb.mtg.rarity.service';

@Injectable()
export class ProductCardRarityService {

    constructor(
        @InjectRepository(ProductCardRarity) private productCardRarityRepository: Repository<ProductCardRarity>,
        private tcgdbMTGRarityService: TCGdbMTGRarityService
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

        let productCardRarityDTO = new ProductCardRarityDTO();
        productCardRarityDTO.productCardRarityId = productCardRarity.productCardRarityId;
        productCardRarityDTO.productCardRarityName = productCardRarity.productCardRarityName;
        productCardRarityDTO.productCardRarityAbbreviation = productCardRarity.productCardRarityAbbreviation;
        productCardRarityDTO.productCardRarityIsActive = productCardRarity.productCardRarityIsActive;
        productCardRarityDTO.productCardRarityCreateDate = productCardRarity.productCardRarityCreateDate;
        productCardRarityDTO.productCardRarityUpdateDate = productCardRarity.productCardRarityUpdateDate;

        return productCardRarityDTO;
    }
    
    async getProductCardRaritys() {
        let productCardRaritys = await this.productCardRarityRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardRaritys == null) {
            return null;
        }
        
        let productCardRarityDTOs: ProductCardRarityDTO[] = [];

        for(let i = 0; i < productCardRaritys.length; i++) {
            let productCardRarity = productCardRaritys[i];
            let productCardRarityDTO = new ProductCardRarityDTO();
            productCardRarityDTO.productCardRarityId = productCardRarity.productCardRarityId;
            productCardRarityDTO.productCardRarityName = productCardRarity.productCardRarityName;
            productCardRarityDTO.productCardRarityAbbreviation = productCardRarity.productCardRarityAbbreviation;
            productCardRarityDTO.productCardRarityIsActive = productCardRarity.productCardRarityIsActive;
            productCardRarityDTO.productCardRarityCreateDate = productCardRarity.productCardRarityCreateDate;
            productCardRarityDTO.productCardRarityUpdateDate = productCardRarity.productCardRarityUpdateDate;
            
            productCardRarityDTOs.push(productCardRarityDTO);
        }

        return productCardRarityDTOs;
    }

    async getProductCardRarityByName(name: string) {
        let productCardRarity = await this.productCardRarityRepository.findOne({ 
            where: { 
                productCardRarityName: name 
            } 
        });
        
        if (productCardRarity == null) {
            return null;
        }

        let productCardRarityDTO = new ProductCardRarityDTO();
        productCardRarityDTO.productCardRarityId = productCardRarity.productCardRarityId;
        productCardRarityDTO.productCardRarityName = productCardRarity.productCardRarityName;
        productCardRarityDTO.productCardRarityAbbreviation = productCardRarity.productCardRarityAbbreviation;
        productCardRarityDTO.productCardRarityIsActive = productCardRarity.productCardRarityIsActive;
        productCardRarityDTO.productCardRarityCreateDate = productCardRarity.productCardRarityCreateDate;
        productCardRarityDTO.productCardRarityUpdateDate = productCardRarity.productCardRarityUpdateDate;

        return productCardRarityDTO;
        
    }

    async createProductCardRarity(createProductCardRarityDTO: CreateProductCardRarityDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardRarity = await this.getProductCardRarityByName(createProductCardRarityDTO.productCardRarityName);
        
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
    
            let tcgdbMTGProductCardRarities = await this.tcgdbMTGRarityService.getTCGdbMTGRarities();
            let productCardRarityRecordCount = 0;
    
            if (tcgdbMTGProductCardRarities == null) {
                return null;
            }
    
            for(let i = 0; i < tcgdbMTGProductCardRarities.length; i++) {
                let tcgdbMTGProductCardRarity = tcgdbMTGProductCardRarities[i];
                
                let createProductCardRarityDTO = new CreateProductCardRarityDTO();
                createProductCardRarityDTO.productCardRarityName = tcgdbMTGProductCardRarity.tcgdbMTGRarityName;
                createProductCardRarityDTO.productCardRarityAbbreviation = tcgdbMTGProductCardRarity.tcgdbMTGRarityAbbreviation;
                createProductCardRarityDTO.productCardRarityIsActive = true;
                
                await this.createProductCardRarity(createProductCardRarityDTO);
    
                productCardRarityRecordCount++; 
            }
    
            return productCardRarityRecordCount;
    
        }
    
}