import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLineDTO, UpdateProductLineDTO, ProductLineDTO } from './dto/product.line.dto';
import { ProductLine } from 'src/typeorm/entities/tcgcommerce/modules/product/line/product.line.entity';

@Injectable()
export class ProductLineService {

    constructor(
        @InjectRepository(ProductLine) private productLineRepository: Repository<ProductLine>,
    ) { }

    async getProductLine(productLineId: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineId: productLineId 
            } 
        });
        
        if (productLine == null) {
            return null;
        }

        let productLineDTO = new ProductLineDTO();
        productLineDTO.productLineId = productLine.productLineId;
        productLineDTO.productVendorId = productLine.productVendorId;
        productLineDTO.productLineName = productLine.productLineName;
        productLineDTO.productLineCode = productLine.productLineCode;
        productLineDTO.productLineIsActive = productLine.productLineIsActive;
        productLineDTO.productLineCreateDate = productLine.productLineCreateDate;
        productLineDTO.productLineUpdateDate = productLine.productLineUpdateDate;
        
        
        return productLineDTO;
        
    }

    async getProductLines() {
        let productLines = await this.productLineRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productLines == null) {
            return null;
        }
        
        let productLineDTOs: ProductLineDTO[] = [];

        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO = new ProductLineDTO();
            productLineDTO.productLineId = productLine.productLineId;
            productLineDTO.productVendorId = productLine.productVendorId;
            productLineDTO.productLineName = productLine.productLineName;
            productLineDTO.productLineCode = productLine.productLineCode;
            productLineDTO.productLineIsActive = productLine.productLineIsActive;
            productLineDTO.productLineCreateDate = productLine.productLineCreateDate;
            productLineDTO.productLineUpdateDate = productLine.productLineUpdateDate;
            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
    }

    async getProductLinesByVendor(productVendorId: string) {
        let productLines = await this.productLineRepository.find({ 
            where: { 
                productVendorId: productVendorId 
            } 
        });
        
        if (productLines == null) {
            return null;
        }

        let productLineDTOs: ProductLineDTO[] = [];

        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO = new ProductLineDTO();
            productLineDTO.productLineId = productLine.productLineId;
            productLineDTO.productVendorId = productLine.productVendorId;
            productLineDTO.productLineName = productLine.productLineName;
            productLineDTO.productLineCode = productLine.productLineCode;
            productLineDTO.productLineIsActive = productLine.productLineIsActive;
            productLineDTO.productLineCreateDate = productLine.productLineCreateDate;
            productLineDTO.productLineUpdateDate = productLine.productLineUpdateDate;
            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
        
    }
    
    async getProductLineByName(name: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineName: name 
            } 
        });
        
        if (productLine == null) {
            return null;
        }

        let productLineDTO = new ProductLineDTO();
        productLineDTO.productLineId = productLine.productLineId;
        productLineDTO.productVendorId = productLine.productVendorId;
        productLineDTO.productLineName = productLine.productLineName;
        productLineDTO.productLineCode = productLine.productLineCode;
        productLineDTO.productLineIsActive = productLine.productLineIsActive;
        productLineDTO.productLineUpdateDate = productLine.productLineUpdateDate;
        
        return productLineDTO;
        
    }
    
    async createProductLine(createProductLineDTO: CreateProductLineDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productLine = await this.getProductLineByName(createProductLineDTO.productLineName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productLine != null) {
            return null;
        }
        
        let newProductLine = this.productLineRepository.create({ ...createProductLineDTO });
        newProductLine = await this.productLineRepository.save(newProductLine);

        let productLineDTO = this.getProductLine(newProductLine.productLineId);

        return productLineDTO;
        
    }

    async updateProductLine(updateProductLineDTO: UpdateProductLineDTO) {
                
        let existingProductLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineId: updateProductLineDTO.productLineId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductLine) {
            return null; 
        }

        existingProductLine.productLineName = updateProductLineDTO.productLineName;
        existingProductLine.productLineCode = updateProductLineDTO.productLineCode;
        existingProductLine.productLineIsActive = updateProductLineDTO.productLineIsActive;
        existingProductLine.productLineUpdateDate = new Date();
        
        await this.productLineRepository.save(existingProductLine);

        let productLineDTO = this.getProductLine(existingProductLine.productLineId);

        return productLineDTO;
    
    }
    
}