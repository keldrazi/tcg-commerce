import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModule } from 'src/typeorm/entities/tcgcommerce/modules/product/module/product.module.entity';
import { CreateProductModuleDTO, UpdateProductModuleDTO, ProductModuleDTO } from './dto/product.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ProductModuleService {

    constructor(
        @InjectRepository(ProductModule) private productModuleRepository: Repository<ProductModule>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getProductModuleById(productModuleId: string) {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId : productModuleId
            } 
        });
        
        if (productModule == null) {
            return await this.errorMessageService.createErrorMessage('PRODUCT_MODULE_NOT_FOUND', 'Product module was not found');
        }

        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

        return productModuleDTO;

    }

    async getProductModuleByCommerceAccountId(commerceAccountId: string) {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!productModule) {
            return await this.errorMessageService.createErrorMessage('PRODUCT_MODULE_NOT_FOUND', 'Product module was not found');
        }

        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

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
            let productModuleDTO: ProductModuleDTO = ({ ...productModule });

            productModuleDTOs.push(productModuleDTO);

        }

        return productModuleDTOs;
        
    }

    async createProductModule(createProductModuleDTO: CreateProductModuleDTO) {
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                commerceAccountId : createProductModuleDTO.commerceAccountId
            } 
        });

        if (productModule != null) {
            return await this.errorMessageService.createErrorMessage('PRODUCT_MODULE_ALREADY_EXISTS', 'Product module already exists');
        }
        
        productModule = this.productModuleRepository.create({ ...createProductModuleDTO });
        productModule = await this.productModuleRepository.save(productModule);

        let productModuleDTO = await this.getProductModuleById(productModule.productModuleId);

        return productModuleDTO;
    }

    async updateProductModule(updateProductModuleDTO: UpdateProductModuleDTO) {
        
        let productModule = await this.productModuleRepository.findOne({ 
            where: { 
                productModuleId: updateProductModuleDTO.productModuleId
            } 
        });

        if (!productModule) {
            return this.errorMessageService.createErrorMessage('PRODUCT_MODULE_NOT_FOUND', 'Product module was not found'); 
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