import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceModule } from 'src/typeorm/entities/tcgcommerce/modules/commerce/module/commerce.module.entity';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO, CommerceModuleDTO } from './dto/commerce.module.dto';

@Injectable()
export class CommerceModuleService {

    constructor(
        @InjectRepository(CommerceModule) private commerceModuleRepository: Repository<CommerceModule>,
    ) { }

    async getCommerceModule(commerceModuleId: string) {
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceModuleId : commerceModuleId
            } 
        });
        
        if (!commerceModule) {
            return null;
        }

        let commerceModuleDTO = new CommerceModuleDTO();
        commerceModuleDTO.commerceModuleId = commerceModule.commerceModuleId;
        commerceModuleDTO.applicationModuleId = commerceModule.applicationModuleId;
        commerceModuleDTO.commerceAccountId = commerceModule.commerceAccountId;
        commerceModuleDTO.commerceModuleSettings = commerceModule.commerceModuleSettings;
        commerceModuleDTO.commerceModuleRoles = commerceModule.commerceModuleRoles;
        commerceModuleDTO.commerceModuleIsActive = commerceModule.commerceModuleIsActive;
        commerceModuleDTO.commerceModuleCreateDate = commerceModule.commerceModuleCreateDate;
        commerceModuleDTO.commerceModuleUpdateDate = commerceModule.commerceModuleUpdateDate;

        return commerceModuleDTO;
        
    }

    async getCommerceModuleByCommerceAccountId(commerceAccountId: string) {
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        //TO DO: RETURN AN ERROR IF COMMERCE MODULE NOT FOUND;
        if (!commerceModule) {
            return null;
        }

        let commerceModuleDTO = new CommerceModuleDTO();
        commerceModuleDTO.commerceModuleId = commerceModule.commerceModuleId;
        commerceModuleDTO.applicationModuleId = commerceModule.applicationModuleId;
        commerceModuleDTO.commerceAccountId = commerceModule.commerceAccountId;
        commerceModuleDTO.commerceModuleSettings = commerceModule.commerceModuleSettings;
        commerceModuleDTO.commerceModuleRoles = commerceModule.commerceModuleRoles;
        commerceModuleDTO.commerceModuleIsActive = commerceModule.commerceModuleIsActive;
        commerceModuleDTO.commerceModuleCreateDate = commerceModule.commerceModuleCreateDate;
        commerceModuleDTO.commerceModuleUpdateDate = commerceModule.commerceModuleUpdateDate;

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
            let commerceModuleDTO = new CommerceModuleDTO();
            commerceModuleDTO.commerceModuleId = commerceModule.commerceModuleId;
            commerceModuleDTO.applicationModuleId = commerceModule.applicationModuleId;
            commerceModuleDTO.commerceAccountId = commerceModule.commerceAccountId;
            commerceModuleDTO.commerceModuleSettings = commerceModule.commerceModuleSettings;
            commerceModuleDTO.commerceModuleRoles = commerceModule.commerceModuleRoles;
            commerceModuleDTO.commerceModuleIsActive = commerceModule.commerceModuleIsActive;
            commerceModuleDTO.commerceModuleCreateDate = commerceModule.commerceModuleCreateDate;
            commerceModuleDTO.commerceModuleUpdateDate = commerceModule.commerceModuleUpdateDate;

            commerceModuleDTOs.push(commerceModuleDTO);

        }

        return commerceModuleDTOs;
        
    }

    async createCommerceModule(createCommerceModuleDTO: CreateCommerceModuleDTO) {
        let newCommerceModule = this.commerceModuleRepository.create({ ...createCommerceModuleDTO });
        newCommerceModule = await this.commerceModuleRepository.save(newCommerceModule);

        let commerceModuleDTO = await this.getCommerceModule(newCommerceModule.commerceModuleId);

        return commerceModuleDTO;
    }

    async updateCommerceModule(updateCommerceModuleDTO: UpdateCommerceModuleDTO) {
            
        let existingCommerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceModuleId: updateCommerceModuleDTO.commerceModuleId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingCommerceModule) {
            return null; 
        }

        existingCommerceModule.commerceModuleSettings = updateCommerceModuleDTO.commerceModuleSettings;
        existingCommerceModule.commerceModuleRoles = updateCommerceModuleDTO.commerceModuleRoles;
        existingCommerceModule.commerceModuleIsActive = updateCommerceModuleDTO.commerceModuleIsActive;
        existingCommerceModule.commerceModuleUpdateDate = new Date();
        
        await this.commerceModuleRepository.save(existingCommerceModule);

        let commerceModuleDTO = await this.getCommerceModule(existingCommerceModule.commerceModuleId);
        
        return commerceModuleDTO;
    }

}