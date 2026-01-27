import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModule } from 'src/typeorm/entities/tcgcommerce/modules/product/module/product.module.entity';
import { CreateProductModuleDTO, UpdateProductModuleDTO, ProductModuleDTO } from './dto/product.module.dto';

@Injectable()
export class ProductModuleService {

    constructor(
        @InjectRepository(ProductModule) private productModuleRepository: Repository<ProductModule>,
    ) { }

    async getProductModuleById(productModuleId: string): Promise<ProductModuleDTO> {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId : productModuleId
            } 
        });
        
        if (productModule == null) {
            throw new NotFoundException('Product module not found');
        }

        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

        return productModuleDTO;

    }

    async getProductModuleByCommerceAccountId(commerceAccountId: string): Promise<ProductModuleDTO> {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!productModule) {
            throw new NotFoundException('Product module not found for this commerce account');
        }

        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

        return productModuleDTO;
        
    }


    async getProductModules(): Promise<ProductModuleDTO[]> {
        let productModules = await this.productModuleRepository.find();
        
        if (productModules == null) {
            return [];
        }

        let productModuleDTOs: ProductModuleDTO[] = [];

        for(let i = 0; i < productModules.length; i++) {
            let productModule = productModules[i];
            let productModuleDTO: ProductModuleDTO = ({ ...productModule });

            productModuleDTOs.push(productModuleDTO);

        }

        return productModuleDTOs;
        
    }

    async createProductModule(createProductModuleDTO: CreateProductModuleDTO): Promise<ProductModuleDTO> {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                commerceAccountId : createProductModuleDTO.commerceAccountId
            } 
        });

        if (productModule != null) {
            throw new ConflictException('Product module already exists');
        }
        
        productModule = this.productModuleRepository.create({ ...createProductModuleDTO });
        productModule = await this.productModuleRepository.save(productModule);

        let productModuleDTO = await this.getProductModuleById(productModule.productModuleId);

        return productModuleDTO;
    }

    async updateProductModule(updateProductModuleDTO: UpdateProductModuleDTO): Promise<ProductModuleDTO> {
        
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId: updateProductModuleDTO.productModuleId
            } 
        });

        if (!productModule) {
            throw new NotFoundException('Product module not found');
        }

        productModule.productModuleSettings = updateProductModuleDTO.productModuleSettings;
        productModule.productModuleRoles = updateProductModuleDTO.productModuleRoles;
        productModule.productModuleIsActive = updateProductModuleDTO.productModuleIsActive;
        productModule.productModuleUpdateDate = new Date();
        
        await this.productModuleRepository.save(productModule);

        let productModuleDTO = await this.getProductModuleById(productModule.productModuleId);
        
        return productModuleDTO;
    }
    
}