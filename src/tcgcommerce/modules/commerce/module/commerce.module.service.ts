import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceModule } from 'src/typeorm/entities/tcgcommerce/modules/commerce/module/commerce.module.entity';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO, CommerceModuleDTO } from './dto/commerce.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceModuleService {

    constructor(
        @InjectRepository(CommerceModule) private commerceModuleRepository: Repository<CommerceModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getCommerceModuleById(commerceModuleId: string) {
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceModuleId : commerceModuleId
            } 
        });
        
        if (commerceModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Commerce module was not found');
        }

        let commerceModuleDTO :CommerceModuleDTO = ({ ...commerceModule})

        return commerceModuleDTO;
        
    }

    async getCommerceModuleByCommerceAccountId(commerceAccountId: string) {
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (commerceModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Commerce module was not found');
        }

        let commerceModuleDTO :CommerceModuleDTO = ({ ...commerceModule})

        return commerceModuleDTO;
        
    }

    async getCommerceModules() {
        let commerceModules = await this.commerceModuleRepository.find();
        
        if (commerceModules == null) {
            return [];
        }

        let commerceModuleDTOs: CommerceModuleDTO[] = [];

        for(let i = 0; i < commerceModules.length; i++) {
            let commerceModule = commerceModules[i];
            let commerceModuleDTO :CommerceModuleDTO = ({ ...commerceModule})

            commerceModuleDTOs.push(commerceModuleDTO);

        }

        return commerceModuleDTOs;
        
    }

    async createCommerceModule(createCommerceModuleDTO: CreateCommerceModuleDTO) {
        
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceModuleDTO.commerceAccountId
            } 
        });

        if (commerceModule != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_EXISTS', 'Commerce module already exists');
        }
        
        commerceModule = this.commerceModuleRepository.create({ ...createCommerceModuleDTO });
        commerceModule = await this.commerceModuleRepository.save(commerceModule);

        let commerceModuleDTO = await this.getCommerceModuleById(commerceModule.commerceModuleId);

        return commerceModuleDTO;
    }

    async updateCommerceModule(updateCommerceModuleDTO: UpdateCommerceModuleDTO) {
            
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceModuleId: updateCommerceModuleDTO.commerceModuleId
            } 
        });

        if (commerceModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Commerce module was not found');
        }

        commerceModule.commerceModuleSettings = updateCommerceModuleDTO.commerceModuleSettings;
        commerceModule.commerceModuleRoles = updateCommerceModuleDTO.commerceModuleRoles;
        commerceModule.commerceModuleIsActive = updateCommerceModuleDTO.commerceModuleIsActive;
        commerceModule.commerceModuleUpdateDate = new Date();
        
        await this.commerceModuleRepository.save(commerceModule);

        let commerceModuleDTO = await this.getCommerceModuleById(commerceModule.commerceModuleId);
        
        return commerceModuleDTO;
    }

}