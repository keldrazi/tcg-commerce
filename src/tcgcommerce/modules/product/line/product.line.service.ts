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

    async getProductLineById(productLineId: string) {
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
            productLineDTOs;
        }

        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO: ProductLineDTO = ({ ...productLine });

            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
        
    }
    
    async getProductLineByName(productLineName: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineName: productLineName 
            } 
        });
        
        if (productLine == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }

    async getProductLineByCode(productLineCode: string) {
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineCode: productLineCode 
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
        
        productLine = this.productLineRepository.create({ ...createProductLineDTO });
        productLine = await this.productLineRepository.save(productLine);

        let productLineDTO = this.getProductLineById(productLine.productLineId);

        return productLineDTO;
        
    }

    async updateProductLine(updateProductLineDTO: UpdateProductLineDTO) {
                
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineId: updateProductLineDTO.productLineId
            } 
        });

        if (!productLine) {
            return this.errorMessageService.createErrorMessage('PRODUCT_LINE_NOT_FOUND', 'Product line was not found');
        }

        productLine.productLineName = updateProductLineDTO.productLineName;
        productLine.productLineCode = updateProductLineDTO.productLineCode;
        productLine.productLineIsActive = updateProductLineDTO.productLineIsActive;
        productLine.productLineUpdateDate = new Date();
        
        await this.productLineRepository.save(productLine);

        let productLineDTO = this.getProductLineById(productLine.productLineId);
        
        return productLineDTO;
    
    }
    
}