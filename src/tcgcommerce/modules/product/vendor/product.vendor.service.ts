import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductVendorDTO, UpdateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendor } from 'src/typeorm/entities/tcgcommerce/modules/product/vendor/product.vendor.entity';

@Injectable()
export class ProductVendorService {

    constructor(
        @InjectRepository(ProductVendor) private productVendorRepository: Repository<ProductVendor>,
    ) { }

    async getProductVendorById(productVendorId: string): Promise<ProductVendorDTO> {
        let productVendor = await this.productVendorRepository.findOneOrFail({ 
            where: { 
                productVendorId: productVendorId
            } 
        });
        
        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });        
        
        return productVendorDTO;
        
    }

    async getProductVendors(): Promise<ProductVendorDTO[]> {
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
    
    async getProductVendorByName(productVendorName: string): Promise<ProductVendorDTO> {
        let productVendor = await this.productVendorRepository.findOneOrFail({ 
            where: { 
                productVendorName: productVendorName 
            } 
        });
        
        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }

    async getProductVendorByCode(productVendorCode: string): Promise<ProductVendorDTO> {
        let productVendor = await this.productVendorRepository.findOneOrFail({ 
            where: { 
                productVendorCode: productVendorCode 
            } 
        });
        
        let productVendorDTO:ProductVendorDTO = ({ ...productVendor });   
        
        return productVendorDTO;
        
    }
    
    async createProductVendor(createProductVendorDTO: CreateProductVendorDTO): Promise<ProductVendorDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let productVendor = await this.productVendorRepository.findOne({ 
            where: { 
                productVendorName: createProductVendorDTO.productVendorName 
            } 
        });
        
        if (productVendor) {
            throw new ConflictException('Product vendor already exists');
        }
        
        productVendor = this.productVendorRepository.create({ ...createProductVendorDTO });
        productVendor = await this.productVendorRepository.save(productVendor);

        let productVendorDTO = await this.getProductVendorById(productVendor.productVendorId);

        return productVendorDTO;
        
    }

    async updateProductVendor(updateProductVendorDTO: UpdateProductVendorDTO): Promise<ProductVendorDTO> {
                
        let productVendor = await this.productVendorRepository.findOneOrFail({ 
            where: { 
                productVendorId: updateProductVendorDTO.productVendorId
            } 
        });

        productVendor.productVendorName = updateProductVendorDTO.productVendorName;
        productVendor.productVendorCode = updateProductVendorDTO.productVendorCode;
        productVendor.productVendorIsActive = updateProductVendorDTO.productVendorIsActive;
        productVendor.productVendorUpdateDate = new Date();
        
        await this.productVendorRepository.save(productVendor);

        let productVendorDTO = await this.getProductVendorById(productVendor.productVendorId);
        
        return productVendorDTO;
    
    }
    
}