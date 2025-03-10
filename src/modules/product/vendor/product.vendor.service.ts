import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendor } from 'src/typeorm/entities/modules/product/vendor/product.vendor.entity';

@Injectable()
export class ProductVendorService {

    constructor(
        @InjectRepository(ProductVendor) private productVendorRepository: Repository<ProductVendor>,
    ) { }

    async getProductVendors() {
        let productVendors = await this.productVendorRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(productVendors == null) {
            return null;
        }
        
        let productVendorDTOs: ProductVendorDTO[] = [];

        for(let i = 0; i < productVendors.length; i++) {
            let productVendor = productVendors[i];
            let productVendorDTO = new ProductVendorDTO();
            productVendorDTO.productVendorId = productVendor.productVendorId;
            productVendorDTO.productVendorName = productVendor.productVendorName;
    
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

        let productVendorDTO = new ProductVendorDTO();
        productVendorDTO.productVendorId = productVendor.productVendorId;
        productVendorDTO.productVendorName = productVendor.productVendorName;
        
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

        let productVendorDTO = new ProductVendorDTO();
        productVendorDTO.productVendorId = newProductVendor.productVendorId;
        productVendorDTO.productVendorName = newProductVendor.productVendorName;

        return productVendorDTO;
        
    }
    
}