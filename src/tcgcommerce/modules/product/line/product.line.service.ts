import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductLineDTO, UpdateProductLineDTO, ProductLineDTO } from './dto/product.line.dto';
import { ProductLine } from 'src/typeorm/entities/tcgcommerce/modules/product/line/product.line.entity';

@Injectable()
export class ProductLineService {

    constructor(
        @InjectRepository(ProductLine) private productLineRepository: Repository<ProductLine>,
    ) { }

    async getProductLineById(productLineId: string): Promise<ProductLineDTO> {
        let productLine = await this.productLineRepository.findOneOrFail({ 
            where: { 
                productLineId: productLineId 
            } 
        });
        
        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }

    async getProductLines(): Promise<ProductLineDTO[]> {
        let productLines = await this.productLineRepository.find({
            where: {
                productLineIsActive: true
            },  
            order: {
                productLineName: 'ASC'
            }
        });
        
        let productLineDTOs: ProductLineDTO[] = [];

        if(!productLines) {
            return productLineDTOs;
        }
        
        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO: ProductLineDTO = ({ ...productLine });

            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
    }

    async getProductLinesByVendor(productVendorId: string): Promise<ProductLineDTO[]> {
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
        
        if (!productLines) {
            return productLineDTOs;
        }

        for(let i = 0; i < productLines.length; i++) {
            let productLine = productLines[i];
            let productLineDTO: ProductLineDTO = ({ ...productLine });

            productLineDTOs.push(productLineDTO);
        }

        return productLineDTOs;
        
    }
    
    async getProductLineByName(productLineName: string): Promise<ProductLineDTO> {
        let productLine = await this.productLineRepository.findOneOrFail({ 
            where: { 
                productLineName: productLineName 
            } 
        });
        
        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }

    async getProductLineByCode(productLineCode: string): Promise<ProductLineDTO> {
        let productLine = await this.productLineRepository.findOneOrFail({ 
            where: { 
                productLineCode: productLineCode 
            } 
        });
        
        let productLineDTO: ProductLineDTO = ({ ...productLine });
        
        return productLineDTO;
        
    }
    
    async createProductLine(createProductLineDTO: CreateProductLineDTO): Promise<ProductLineDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productLine = await this.productLineRepository.findOne({ 
            where: { 
                productLineName: createProductLineDTO.productLineName 
            } 
        });
        
        if (productLine) {
            throw new ConflictException('Product line already exists');
        }
        
        productLine = this.productLineRepository.create({ ...createProductLineDTO });
        productLine = await this.productLineRepository.save(productLine);

        let productLineDTO = await this.getProductLineById(productLine.productLineId);

        return productLineDTO;
        
    }

    async updateProductLine(updateProductLineDTO: UpdateProductLineDTO): Promise<ProductLineDTO> {
                
        let productLine = await this.productLineRepository.findOneOrFail({ 
            where: { 
                productLineId: updateProductLineDTO.productLineId
            } 
        });

        productLine.productLineName = updateProductLineDTO.productLineName;
        productLine.productLineCode = updateProductLineDTO.productLineCode;
        productLine.productLineIsActive = updateProductLineDTO.productLineIsActive;
        productLine.productLineUpdateDate = new Date();
        
        await this.productLineRepository.save(productLine);

        let productLineDTO = await this.getProductLineById(productLine.productLineId);
        
        return productLineDTO;
    
    }
    
}