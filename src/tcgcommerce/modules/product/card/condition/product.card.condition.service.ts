import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardConditionDTO, ProductCardConditionDTO, UpdateProductCardConditionDTO } from './dto/product.card.condition.dto';
import { ProductCardCondition } from 'src/typeorm/entities/tcgcommerce/modules/product/card/condition/product.card.condition.entity';
import { TCGdbMTGConditionService } from 'src/tcgdb/modules/tcgdb/api/mtg/condition/tcgdb.mtg.condition.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductCardConditionService {

    constructor(
        @InjectRepository(ProductCardCondition) private productCardConditionRepository: Repository<ProductCardCondition>,
        private tcgdbMTGConditionService: TCGdbMTGConditionService,
        private productLineService: ProductLineService
    ) { }

    async getProductCardCondition(productCardConditionId: string) {
        let productCardCondition = await this.productCardConditionRepository.findOne({
            where: { 
                productCardConditionId: productCardConditionId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardCondition == null) {
            return null;
        }

        let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });

        return productCardConditionDTO;
    }
    
    async getProductCardConditions() {
        let productCardConditions = await this.productCardConditionRepository.find({
            order: { 
                productCardConditionDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardConditions == null) {
            return null;
        }
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];

        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionsByProductLineCode(productLineCode: string) {
        
        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;
        
        let productCardConditions = await this.productCardConditionRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardConditionDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardConditions == null) {
            return null;
        }
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];

        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionsByProductLineId(productLineId: string) {
        let productCardConditions = await this.productCardConditionRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardConditionDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardConditions == null) {
            return null;
        }
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];

        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionByNameAndProductLineId(name: string, productLineId: string) {
        let productCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionName: name,
                productLineId: productLineId 
            } 
        });
        
        if (productCardCondition == null) {
            return null;
        }

        let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });

        return productCardConditionDTO;
        
    }

    async createProductCardCondition(createProductCardConditionDTO: CreateProductCardConditionDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardCondition = await this.getProductCardConditionByNameAndProductLineId(createProductCardConditionDTO.productCardConditionName, createProductCardConditionDTO.productLineId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardCondition != null) {
            return null;
        }
        
        let newProductCardCondition = this.productCardConditionRepository.create({ ...createProductCardConditionDTO });
        newProductCardCondition = await this.productCardConditionRepository.save(newProductCardCondition);

        let productCardConditionDTO = this.getProductCardCondition(newProductCardCondition.productCardConditionId);
        
        return productCardConditionDTO;
        
    }

    async updateProductCardCondition(updateProductCardConditionDTO: UpdateProductCardConditionDTO) {
                        
        let existingProductCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionId: updateProductCardConditionDTO.productCardConditionId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardCondition) {
            return null; 
        }

        existingProductCardCondition.productCardConditionName = updateProductCardConditionDTO.productCardConditionName;
        existingProductCardCondition.productCardConditionCode = updateProductCardConditionDTO.productCardConditionCode;
        existingProductCardCondition.productCardConditionPriceFactor = updateProductCardConditionDTO.productCardConditionPriceFactor;
        existingProductCardCondition.productCardConditionDisplayOrder = updateProductCardConditionDTO.productCardConditionDisplayOrder;
        existingProductCardCondition.productCardConditionIsActive = updateProductCardConditionDTO.productCardConditionIsActive;
        existingProductCardCondition.productCardConditionUpdateDate = new Date();
        
        await this.productCardConditionRepository.save(existingProductCardCondition);

        let productCardConditionDTO = this.getProductCardCondition(existingProductCardCondition.productCardConditionId);

        return productCardConditionDTO;
    
    }

    //BULK CREATE PRODUCT CARD CONDITIONS;
    async createProductCardConditionsByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT CARD CONDITIONS;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductCardConditions();
        } else {
            return null;
        }
    }

    async createTCGdbMTGProductCardConditions() {

        //GET THE PRODUCT LINE BY CODE;
        let productLine = await this.productLineService.getProductLineByCode("MTG");
        
        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        //GET THE TCGDB MTG PRODUCT CARD CONDITIONS;
        let tcgdbMTGProductCardConditions = await this.tcgdbMTGConditionService.getTCGdbMTGConditions();

        if (tcgdbMTGProductCardConditions == null) {
            return null;
        }

        let productCardConditionRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardConditions.length; i++) {
            let tcgdbMTGProductCardCondition = tcgdbMTGProductCardConditions[i];
            
            let createProductCardConditionDTO = new CreateProductCardConditionDTO();
            createProductCardConditionDTO.productLineId = productLineId;
            createProductCardConditionDTO.productCardConditionTCGdbId = tcgdbMTGProductCardCondition.tcgdbMTGConditionId;
            createProductCardConditionDTO.productCardConditionTCGPlayerId = tcgdbMTGProductCardCondition.tcgdbMTGConditionTCGPlayerId;
            createProductCardConditionDTO.productCardConditionName = tcgdbMTGProductCardCondition.tcgdbMTGConditionName;
            createProductCardConditionDTO.productCardConditionCode = tcgdbMTGProductCardCondition.tcgdbMTGConditionCode;
            createProductCardConditionDTO.productCardConditionPriceFactor = tcgdbMTGProductCardCondition.tcgdbMTGConditionPriceFactor;
            createProductCardConditionDTO.productCardConditionDisplayOrder = tcgdbMTGProductCardCondition.tcgdbMTGConditionDisplayOrder;
            createProductCardConditionDTO.productCardConditionIsActive = true;
            
            await this.createProductCardCondition(createProductCardConditionDTO);

            productCardConditionRecordCount++; 
        }

        return productCardConditionRecordCount;

    }
    
}