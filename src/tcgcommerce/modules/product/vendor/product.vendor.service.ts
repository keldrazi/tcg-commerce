import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductVendorDTO, UpdateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendor } from 'src/typeorm/entities/tcgcommerce/modules/product/vendor/product.vendor.entity';

@Injectable()
export class ProductVendorService {

    constructor(
        @InjectRepository(ProductVendor) private productVendorRepository: Repository<ProductVendor>,
    ) { }

    async getProductVendor(productVendorId: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorId: productVendorId 
            } 
        });
        
        if (productVendor == null) {
            return null;
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });        
        
        return productVendorDTO;
        
    }

    async getProductVendors() {
        let productVendors = await this.productVendorRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productVendors == null) {
            return null;
        }
        
        let productVendorDTOs: ProductVendorDTO[] = [];

        for(let i = 0; i < productVendors.length; i++) {
            let productVendor = productVendors[i];
            let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   

            productVendorDTOs.push(productVendorDTO);
        }

        return productVendorDTOs;
    }
    
    async getProductVendorByName(name: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorName: name 
            } 
        });
        
        if (productVendor == null) {
            return null;
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }

    async getProductVendorByCode(code: string) {
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorCode: code 
            } 
        });
        
        if (productVendor == null) {
            return null;
        }

        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }
    
    async createProductVendor(createProductVendorDTO: CreateProductVendorDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productVendor = await this.getProductVendorByName(createProductVendorDTO.productVendorName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (productVendor != null) {
            return null;
        }
        
        let newProductVendor = this.productVendorRepository.create({ ...createProductVendorDTO });
        newProductVendor = await this.productVendorRepository.save(newProductVendor);

        let productVendorDTO = this.getProductVendor(newProductVendor.productVendorId);

        return productVendorDTO;
        
    }

    async updateProductVendor(updateProductVendorDTO: UpdateProductVendorDTO) {
                
        let existingProductVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorId: updateProductVendorDTO.productVendorId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductVendor) {
            return null; 
        }

        existingProductVendor.productVendorName = updateProductVendorDTO.productVendorName;
        existingProductVendor.productVendorIsActive = updateProductVendorDTO.productVendorIsActive;
        existingProductVendor.productVendorUpdateDate = new Date();
        
        await this.productVendorRepository.save(existingProductVendor);

        let productVendorDTO = this.getProductVendor(existingProductVendor.productVendorId);

        return productVendorDTO;
    
    }
    
}