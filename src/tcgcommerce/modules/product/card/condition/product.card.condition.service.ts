import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardConditionDTO, ProductCardConditionDTO, UpdateProductCardConditionDTO } from './dto/product.card.condition.dto';
import { ProductCardCondition } from 'src/typeorm/entities/tcgcommerce/modules/product/card/condition/product.card.condition.entity';
import { TCGdbMTGConditionService } from 'src/tcgdb/modules/tcgdb/api/mtg/condition/tcgdb.mtg.condition.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';
import { ProductVendorService } from 'src/tcgcommerce/modules/product/vendor/product.vendor.service';
import { PRODUCT_LINE_CODE, PRODUCT_VENDOR_CODE } from 'src/system/constants/tcgcommerce/product/constants.tcgcommerce.product';

@Injectable()
export class ProductCardConditionService {

    constructor(
        @InjectRepository(ProductCardCondition) private productCardConditionRepository: Repository<ProductCardCondition>,
        private tcgdbMTGConditionService: TCGdbMTGConditionService,
        private productLineService: ProductLineService,
        private productVendorService: ProductVendorService,
    ) { }

    async getProductCardConditionById(productCardConditionId: string): Promise<ProductCardConditionDTO> {
        let productCardCondition = await this.productCardConditionRepository.findOne({
            where: { 
                productCardConditionId: productCardConditionId 
            } 
        });

        if(productCardCondition == null) {
            throw new NotFoundException('Product card condition was not found');
        }

        let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });

        return productCardConditionDTO;
    }
    
    async getProductCardConditions(): Promise<ProductCardConditionDTO[]> {
        let productCardConditions = await this.productCardConditionRepository.find({
            order: { 
                productCardConditionDisplayOrder: 'ASC' 
            }
        });
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];
        
        if(productCardConditions == null) {
            return productCardConditionDTOs;
        }
        
        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionsByProductLineCode(productLineCode: string): Promise<ProductCardConditionDTO[]> {
        
        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if(productLine == null) {
            throw new NotFoundException('Product line was not found');
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
        
        if(productCardConditions == null) {
            return [];
        }
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];

        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionsByProductLineId(productLineId: string): Promise<ProductCardConditionDTO[]> {
        let productCardConditions = await this.productCardConditionRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardConditionDisplayOrder: 'ASC' 
            }
        });
        
        if(productCardConditions == null) {
            return [];
        }
        
        let productCardConditionDTOs: ProductCardConditionDTO[] = [];

        for(let i = 0; i < productCardConditions.length; i++) {
            let productCardCondition = productCardConditions[i];
            let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });
            
            productCardConditionDTOs.push(productCardConditionDTO);
        }

        return productCardConditionDTOs;
    }

    async getProductCardConditionByNameAndProductLineId(productCardConditionName: string, productLineId: string): Promise<ProductCardConditionDTO> {
        let productCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionName: productCardConditionName,
                productLineId: productLineId 
            } 
        });
        
        if(productCardCondition == null) {
            throw new NotFoundException('Product card condition was not found');
        }

        let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });

        return productCardConditionDTO;
        
    }

    async getProductCardConditionByCodeAndProductLineId(productCardConditionCode: string, productLineId: string): Promise<ProductCardConditionDTO> {
        let productCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionCode: productCardConditionCode,
                productLineId: productLineId 
            } 
        });
        
        if(productCardCondition == null) {
            throw new NotFoundException('Product card condition was not found');
        }

        let productCardConditionDTO:ProductCardConditionDTO = ({ ...productCardCondition });

        return productCardConditionDTO;
        
    }

    async createProductCardCondition(createProductCardConditionDTO: CreateProductCardConditionDTO): Promise<ProductCardConditionDTO> {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionName: createProductCardConditionDTO.productCardConditionName,
                productLineId: createProductCardConditionDTO.productLineId,
                productVendorId: createProductCardConditionDTO.productVendorId
            } 
        });

        if(productCardCondition != null) {
            throw new ConflictException('A product card condition with the same name already exists');
        }
        
        productCardCondition = this.productCardConditionRepository.create({ ...createProductCardConditionDTO });
        productCardCondition = await this.productCardConditionRepository.save(productCardCondition);

        let productCardConditionDTO = this.getProductCardConditionById(productCardCondition.productCardConditionId);
        
        return productCardConditionDTO;
        
    }

    async updateProductCardCondition(updateProductCardConditionDTO: UpdateProductCardConditionDTO): Promise<ProductCardConditionDTO> {
                        
        let productCardCondition = await this.productCardConditionRepository.findOne({ 
            where: { 
                productCardConditionId: updateProductCardConditionDTO.productCardConditionId
            } 
        });

        if(!productCardCondition) {
            throw new NotFoundException('Product card condition was not found');
        }

        productCardCondition.productCardConditionName = updateProductCardConditionDTO.productCardConditionName;
        productCardCondition.productCardConditionCode = updateProductCardConditionDTO.productCardConditionCode;
        productCardCondition.productCardConditionPriceFactor = updateProductCardConditionDTO.productCardConditionPriceFactor;
        productCardCondition.productCardConditionDisplayOrder = updateProductCardConditionDTO.productCardConditionDisplayOrder;
        productCardCondition.productCardConditionIsActive = updateProductCardConditionDTO.productCardConditionIsActive;
        productCardCondition.productCardConditionUpdateDate = new Date();
        
        await this.productCardConditionRepository.save(productCardCondition);

        let productCardConditionDTO = this.getProductCardConditionById(productCardCondition.productCardConditionId);

        return productCardConditionDTO;
    
    }

    //BULK CREATE PRODUCT CARD CONDITIONS;
    async createProductCardConditionsByProductLineCode(productLineCode: string): Promise<number> {
        
        if (productLineCode == PRODUCT_LINE_CODE.MAGIC_THE_GATHERING) {
            return this.createTCGdbMTGProductCardConditions();
        } else {
            throw new NotFoundException('Product line was not found');
        }
    }

    async createTCGdbMTGProductCardConditions(): Promise<number> {

        let productVendor = await this.productVendorService.getProductVendorByCode(PRODUCT_VENDOR_CODE.WIZARDS_OF_THE_COAST);
        let productLine = await this.productLineService.getProductLineByCode(PRODUCT_LINE_CODE.MAGIC_THE_GATHERING);
        
        if(productVendor == null) {
            throw new NotFoundException('Product vendor was not found');
        }

        if(productLine == null) {
            throw new NotFoundException('Product line was not found');
        }

        //GET THE TCGDB MTG PRODUCT CARD CONDITIONS;
        let tcgdbMTGProductCardConditions = await this.tcgdbMTGConditionService.getTCGdbMTGConditions();

        if(tcgdbMTGProductCardConditions == null) {
            throw new NotFoundException('TCGdb MTG product card conditions were not found');
        }

        let productCardConditionRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardConditions.length; i++) {
            let tcgdbMTGProductCardCondition = tcgdbMTGProductCardConditions[i];
            
            try {
                await this.getProductCardConditionByCodeAndProductLineId(tcgdbMTGProductCardCondition.tcgdbMTGConditionCode, productLine.productLineId);
            } catch (error) {
                if (error instanceof NotFoundException) {
                    let createProductCardConditionDTO = new CreateProductCardConditionDTO();
                    createProductCardConditionDTO.productVendorId = productVendor.productVendorId;
                    createProductCardConditionDTO.productLineId = productLine.productLineId;
                    createProductCardConditionDTO.productCardConditionTCGdbId = tcgdbMTGProductCardCondition.tcgdbMTGConditionId;
                    createProductCardConditionDTO.productCardConditionTCGPlayerId = tcgdbMTGProductCardCondition.tcgdbMTGConditionTCGPlayerId;
                    createProductCardConditionDTO.productCardConditionName = tcgdbMTGProductCardCondition.tcgdbMTGConditionName;
                    createProductCardConditionDTO.productCardConditionCode = tcgdbMTGProductCardCondition.tcgdbMTGConditionCode;
                    createProductCardConditionDTO.productCardConditionPriceFactor = tcgdbMTGProductCardCondition.tcgdbMTGConditionPriceFactor;
                    createProductCardConditionDTO.productCardConditionDisplayOrder = tcgdbMTGProductCardCondition.tcgdbMTGConditionDisplayOrder;
                    createProductCardConditionDTO.productCardConditionIsActive = true;
                
                    await this.createProductCardCondition(createProductCardConditionDTO);

                    productCardConditionRecordCount++;
                } else {
                    throw error;
                }
            }
        }

        return productCardConditionRecordCount;

    }
    
}