import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLineDTO, UpdateProductLineDTO, ProductLineDTO } from './dto/product.line.dto';
import { ProductLine } from 'src/typeorm/entities/tcgcommerce/modules/product/line/product.line.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ProductLineService {

    constructor(
        @InjectRepository(ProductLine) private productLineRepository: Repository<ProductLine>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getProductLine(productLineId: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineId: productLineId 
            } 
        });
        
        if (productLine == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }

    async getProductLines() {
        let productLines = await this.productLineRepository.find({
            where: {
                productLineIsActive: true
            },  
            order: {
                productLineName: 'ASC'
            }
        });
        
        let productLineDTOs: ProductLineDTO[] = [];

        if(productLines == null) {
            return productLineDTOs;
        }
        
        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO: ProductLineDTO = ({ ...productLine });

            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
    }

    async getProductLinesByVendor(productVendorId: string) {
        let productLines = await this.productLineRepository.find({ 
            where: { 
                productVendorId: productVendorId,
                productLineIsActive: true 
            }, 
            order: {
                productLineName: 'ASC'
            }
        });

        let productLineDTOs: ProductLineDTO[] = [];
        
        if (productLines == null) {
            productLineDTOs ;
        }

        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO: ProductLineDTO = ({ ...productLine });

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
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }

    async getProductLineByCode(code: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineCode: code 
            } 
        });
        
        if (productLine == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }
    
    async createProductLine(createProductLineDTO: CreateProductLineDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineName: createProductLineDTO.productLineName 
            } 
        });
        
        if (productLine != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_ALREADY_EXISTS', 'Product line already exists');
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

        if (!existingProductLine) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
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