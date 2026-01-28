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
        let productModule = await this.productModuleRepository.findOneOrFail({ 
            where: { 
                productModuleId : productModuleId
            } 
        });
        
        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

        return productModuleDTO;

    }

    async getProductModuleByCommerceAccountId(commerceAccountId: string): Promise<ProductModuleDTO> {
        let productModule = await this.productModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        let productModuleDTO: ProductModuleDTO = ({ ...productModule });

        return productModuleDTO;
        
    }


    async getProductModules(): Promise<ProductModuleDTO[]> {
        let productModules = await this.productModuleRepository.find();
        
        let productModuleDTOs: ProductModuleDTO[] = [];

        if (productModules == null) {
            return productModuleDTOs;
        }

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

        if (productModule) {
            throw new ConflictException('Product module already exists');
        }
        
        productModule = this.productModuleRepository.create({ ...createProductModuleDTO });
        productModule = await this.productModuleRepository.save(productModule);

        let productModuleDTO = await this.getProductModuleById(productModule.productModuleId);

        return productModuleDTO;
    }

    async updateProductModule(updateProductModuleDTO: UpdateProductModuleDTO): Promise<ProductModuleDTO> {
        
        let productModule = await this.productModuleRepository.findOneOrFail({ 
            where: { 
                productModuleId: updateProductModuleDTO.productModuleId
            } 
        });

        productModule.productModuleSettings = updateProductModuleDTO.productModuleSettings;
        productModule.productModuleRoles = updateProductModuleDTO.productModuleRoles;
        productModule.productModuleIsActive = updateProductModuleDTO.productModuleIsActive;
        productModule.productModuleUpdateDate = new Date();
        
        await this.productModuleRepository.save(productModule);

        let productModuleDTO = await this.getProductModuleById(productModule.productModuleId);
        
        return productModuleDTO;
    }
    
}