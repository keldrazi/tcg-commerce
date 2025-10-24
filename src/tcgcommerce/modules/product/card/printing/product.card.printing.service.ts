import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductCardPrintingDTO, ProductCardPrintingDTO, UpdateProductCardPrintingDTO } from './dto/product.card.printing.dto';
import { ProductCardPrinting } from 'src/typeorm/entities/tcgcommerce/modules/product/card/printing/product.card.printing.entity';
import { TCGdbMTGPrintingService } from 'src/tcgdb/modules/tcgdb/api/mtg/printing/tcgdb.mtg.printing.service';
import { ProductLineService } from 'src/tcgcommerce/modules/product/line/product.line.service';

@Injectable()
export class ProductCardPrintingService {

    constructor(
        @InjectRepository(ProductCardPrinting) private productCardPrintingRepository: Repository<ProductCardPrinting>,
        private tcgdbMTGPrintingService: TCGdbMTGPrintingService,
        private productLineService: ProductLineService
    ) { }

    async getProductCardPrinting(productCardPrintingId: string) {
        let productCardPrinting = await this.productCardPrintingRepository.findOne({
            where: { 
                productCardPrintingId: productCardPrintingId 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrinting == null) {
            return null;
        }

        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
    }

    async getProductCardPrintingByName(productCardPrintingName: string) {
        let productCardPrinting = await this.productCardPrintingRepository.findOne({
            where: { 
                productCardPrintingName: productCardPrintingName 
            } 
        });

        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrinting == null) {
            return null;
        }

        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
    }

    async getProductCardPrintingsByProductLineCode(productLineCode: string) {

        productLineCode = productLineCode.toUpperCase();
        
        let productLine = await this.productLineService.getProductLineByCode(productLineCode);

        if (productLine == null) {
            return null;
        }

        let productLineId = productLine.productLineId;

        let productCardPrintings = await this.productCardPrintingRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrintings == null) {
            return null;
        }
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    async getProductCardPrintingsByProductLineId(productLineId: string) {

        let productCardPrintings = await this.productCardPrintingRepository.find({
            where: { 
                productLineId: productLineId 
            },
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrintings == null) {
            return null;
        }
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });
            
            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    

    async getProductCardPrintings() {
        let productCardPrintings = await this.productCardPrintingRepository.find({
            order: { 
                productCardPrintingDisplayOrder: 'ASC' 
            }
        });
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productCardPrintings == null) {
            return null;
        }
        
        let productCardPrintingDTOs: ProductCardPrintingDTO[] = [];

        for(let i = 0; i < productCardPrintings.length; i++) {
            let productCardPrinting = productCardPrintings[i];
            let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });
            
            productCardPrintingDTOs.push(productCardPrintingDTO);
        }

        return productCardPrintingDTOs;
    }

    async getProductCardPrintingByNameAndProductLineId(name: string, productLineId: string) {
        let productCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingName: name,
                productLineId: productLineId 
            } 
        });
        
        if (productCardPrinting == null) {
            return null;
        }

        let productCardPrintingDTO: ProductCardPrintingDTO = ({ ...productCardPrinting });

        return productCardPrintingDTO;
        
    }

    async createProductCardPrinting(createProductCardPrintingDTO: CreateProductCardPrintingDTO) {

        //CHECK TO SEE IF THE PRODUCT CARD VARIANT ALREADY EXISTS;
        let productCardPrinting = await this.getProductCardPrintingByNameAndProductLineId(createProductCardPrintingDTO.productCardPrintingName, createProductCardPrintingDTO.productLineId);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productCardPrinting != null) {
            return null;
        }
        
        let newProductCardPrinting = this.productCardPrintingRepository.create({ ...createProductCardPrintingDTO });
        newProductCardPrinting = await this.productCardPrintingRepository.save(newProductCardPrinting);

        let productCardPrintingDTO = this.getProductCardPrinting(newProductCardPrinting.productCardPrintingId);
        
        return productCardPrintingDTO;
        
    }

    async updateProductCardPrinting(updateProductCardPrintingDTO: UpdateProductCardPrintingDTO) {
                        
        let existingProductCardPrinting = await this.productCardPrintingRepository.findOne({ 
            where: { 
                productCardPrintingId: updateProductCardPrintingDTO.productCardPrintingId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductCardPrinting) {
            return null; 
        }

        existingProductCardPrinting.productCardPrintingName = updateProductCardPrintingDTO.productCardPrintingName;
        existingProductCardPrinting.productCardPrintingDisplayOrder = updateProductCardPrintingDTO.productCardPrintingDisplayOrder;
        existingProductCardPrinting.productCardPrintingIsActive = updateProductCardPrintingDTO.productCardPrintingIsActive;
        existingProductCardPrinting.productCardPrintingUpdateDate = new Date();
        
        await this.productCardPrintingRepository.save(existingProductCardPrinting);

        let productCardPrintingDTO = this.getProductCardPrinting(existingProductCardPrinting.productCardPrintingId);

        return productCardPrintingDTO;
    
    }

    //BULK CREATE PRODUCT CARD PRINTINGS;
    async createProductCardPrintingsByProductLineName(productLineName: string) {
        //TO DO: CREATE PRODUCT CARD PRINTINGS;
        if (productLineName == "mtg") {
            return this.createTCGdbMTGProductCardPrintings();
        } else {
            return null;
        }
    }

    async createTCGdbMTGProductCardPrintings() {

        //GET THE PRODUCT LINE ID FOR MTG;
        let productLine = await this.productLineService.getProductLineByCode("MTG");
        
        if (productLine == null) {
            return null;
        }
        
        //GET THE PRODUCT CARD PRINTINGS FROM TCGDB;
        let tcgdbMTGProductCardPrintings = await this.tcgdbMTGPrintingService.getTCGdbMTGPrintings();
        
        if (tcgdbMTGProductCardPrintings == null) {
            return null;
        }

        let productCardPrintingRecordCount = 0;

        for(let i = 0; i < tcgdbMTGProductCardPrintings.length; i++) {
            let tcgdbMTGProductCardPrinting = tcgdbMTGProductCardPrintings[i];
            
            let createProductCardPrintingDTO = new CreateProductCardPrintingDTO();
            createProductCardPrintingDTO.productLineId = productLine.productLineId;
            createProductCardPrintingDTO.productCardPrintingTCGdbId = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingId;
            createProductCardPrintingDTO.productCardPrintingTCGPlayerId = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingTCGPlayerId;
            createProductCardPrintingDTO.productCardPrintingName = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingName;
            createProductCardPrintingDTO.productCardPrintingDisplayOrder = tcgdbMTGProductCardPrinting.tcgdbMTGPrintingDisplayOrder;
            createProductCardPrintingDTO.productCardPrintingIsActive = true;
            
            await this.createProductCardPrinting(createProductCardPrintingDTO);

            productCardPrintingRecordCount++; 
        }

        return productCardPrintingRecordCount;
    }
    
    
}