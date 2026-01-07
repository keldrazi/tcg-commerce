import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductVendorDTO, UpdateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendor } from 'src/typeorm/entities/tcgcommerce/modules/product/vendor/product.vendor.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ProductVendorService {

    constructor(
        @InjectRepository(ProductVendor) private productVendorRepository: Repository<ProductVendor>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getProductVendorById(productVendorId: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorId: productVendorId
            } 
        });
        
        if (productVendor == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });        
        
        return productVendorDTO;
        
    }

    async getProductVendors() {
        let productVendors = await this.productVendorRepository.find({
            where: {
                productVendorIsActive: true
            },
            order: {
                productVendorName: 'ASC'
            }
        });
        
        let productVendorDTOs: ProductVendorDTO[] = [];
        
        if(productVendors == null) {
            return productVendorDTOs;
        }
        
        for(let i = 0; i < productVendors.length; i++) {
            let productVendor = productVendors[i];
            let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   

            productVendorDTOs.push(productVendorDTO);
        }

        return productVendorDTOs;
    }
    
    async getProductVendorByName(productVendorName: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorName: productVendorName 
            } 
        });
        
        if (productVendor == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }

    async getProductVendorByCode(productVendorCode: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorCode: productVendorCode 
            } 
        });
        
        if (productVendor == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }
    
    async createProductVendor(createProductVendorDTO: CreateProductVendorDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorName: createProductVendorDTO.productVendorName 
            } 
        });
        
        if (productVendor != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_ALREADY_EXISTS', 'Product vendor already exists');
        }
        
        productVendor = this.productVendorRepository.create({ ...createProductVendorDTO });
        productVendor = await this.productVendorRepository.save(productVendor);

        let productVendorDTO = this.getProductVendorById(productVendor.productVendorId);

        return productVendorDTO;
        
    }

    async updateProductVendor(updateProductVendorDTO: UpdateProductVendorDTO) {
                
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorId: updateProductVendorDTO.productVendorId
            } 
        });

        if (!productVendor) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'Product vendor was not found');
        }

        productVendor.productVendorName = updateProductVendorDTO.productVendorName;
        productVendor.productVendorCode = updateProductVendorDTO.productVendorCode;
        productVendor.productVendorIsActive = updateProductVendorDTO.productVendorIsActive;
        productVendor.productVendorUpdateDate = new Date();
        
        await this.productVendorRepository.save(productVendor);

        let productVendorDTO = this.getProductVendorById(productVendor.productVendorId);
        
        return productVendorDTO;
    
    }
    
}