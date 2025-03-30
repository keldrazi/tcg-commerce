import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModule } from 'src/typeorm/entities/modules/product/module/product.module.entity';
import { CreateProductModuleDTO, UpdateProductModuleDTO, ProductModuleDTO } from './dto/product.module.dto';

@Injectable()
export class ProductModuleService {

    constructor(
        @InjectRepository(ProductModule) private productModuleRepository: Repository<ProductModule>,
    ) { }

    async getProductModule(productModuleId: string) {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId : productModuleId
            } 
        });
        
        if (!productModule) {
            return null;
        }

        let productModuleDTO = new ProductModuleDTO();
        productModuleDTO.productModuleId = productModule.productModuleId;
        productModuleDTO.applicationModuleId = productModule.applicationModuleId;
        productModuleDTO.commerceAccountId = productModule.commerceAccountId;
        productModuleDTO.productModuleSettings = productModule.productModuleSettings;
        productModuleDTO.productModuleRoles = productModule.productModuleRoles;
        productModuleDTO.productModuleIsActive = productModule.productModuleIsActive;
        productModuleDTO.productModuleCreateDate = productModule.productModuleCreateDate;
        productModuleDTO.productModuleUpdateDate = productModule.productModuleUpdateDate;

        return productModuleDTO;
        
    }

    async getProductModuleByCommerceAccountId(commerceAccountId: string) {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!productModule) {
            return null;
        }

        let productModuleDTO = new ProductModuleDTO();
        productModuleDTO.productModuleId = productModule.productModuleId;
        productModuleDTO.applicationModuleId = productModule.applicationModuleId;
        productModuleDTO.commerceAccountId = productModule.commerceAccountId;
        productModuleDTO.productModuleSettings = productModule.productModuleSettings;
        productModuleDTO.productModuleRoles = productModule.productModuleRoles;
        productModuleDTO.productModuleIsActive = productModule.productModuleIsActive;
        productModuleDTO.productModuleCreateDate = productModule.productModuleCreateDate;
        productModuleDTO.productModuleUpdateDate = productModule.productModuleUpdateDate;

        return productModuleDTO;
        
    }


    async getProductModules() {
        let productModules = await this.productModuleRepository.find();
        
        if (productModules == null) {
            return [];
        }

        let productModuleDTOs: ProductModuleDTO[] = [];

        for(let i = 0; i < productModules.length; i++) {
            let productModule = productModules[i];
            let productModuleDTO = new ProductModuleDTO();
            productModuleDTO.productModuleId = productModule.productModuleId;
            productModuleDTO.applicationModuleId = productModule.applicationModuleId;
            productModuleDTO.commerceAccountId = productModule.commerceAccountId;
            productModuleDTO.productModuleSettings = productModule.productModuleSettings;
            productModuleDTO.productModuleRoles = productModule.productModuleRoles;
            productModuleDTO.productModuleIsActive = productModule.productModuleIsActive;
            productModuleDTO.productModuleCreateDate = productModule.productModuleCreateDate;
            productModuleDTO.productModuleUpdateDate = productModule.productModuleUpdateDate;

            productModuleDTOs.push(productModuleDTO);

        }

        return productModuleDTOs;
        
    }

    async createProductModule(createProductModuleDTO: CreateProductModuleDTO) {
        let newProductModule = this.productModuleRepository.create({ ...createProductModuleDTO });
        newProductModule = await this.productModuleRepository.save(newProductModule);

        let productModuleDTO = await this.getProductModule(newProductModule.productModuleId);

        return productModuleDTO;
    }

    async updateProductModule(updateProductModuleDTO: UpdateProductModuleDTO) {
        
        let existingProductModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId: updateProductModuleDTO.productModuleId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingProductModule) {
            return null; 
        }

        existingProductModule.productModuleSettings = updateProductModuleDTO.productModuleSettings;
        existingProductModule.productModuleRoles = updateProductModuleDTO.productModuleRoles;
        existingProductModule.productModuleIsActive = updateProductModuleDTO.productModuleIsActive;
        existingProductModule.productModuleUpdateDate = new Date();
        
        await this.productModuleRepository.save(existingProductModule);

        let productModuleDTO = await this.getProductModule(existingProductModule.productModuleId);
        
        return productModuleDTO;
    }
    
}