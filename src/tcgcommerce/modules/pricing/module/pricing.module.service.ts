import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PricingModule } from 'src/typeorm/entities/tcgcommerce/modules/pricing/module/pricing.module.entity';
import { CreatePricingModuleDTO, UpdatePricingModuleDTO, PricingModuleDTO } from './dto/pricing.module.dto';

@Injectable()
export class PricingModuleService {

    constructor(
        @InjectRepository(PricingModule) private pricingModuleRepository: Repository<PricingModule>,
    ) { }

    async getPricingModule(pricingModuleId: string) {
        let pricingModule = await this.pricingModuleRepository.findOne({ 
            where: { 
                pricingModuleId : pricingModuleId
            } 
        });
        
        if (!pricingModule) {
            return null;
        }

        let pricingModuleDTO: PricingModuleDTO = ({ ...pricingModule });

        return pricingModuleDTO;
        
    }

    async getPricingModuleByCommerceAccountId(commerceAccountId: string) {
        let pricingModule = await this.pricingModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!pricingModule) {
            return null;
        }

        let pricingModuleDTO: PricingModuleDTO = ({ ...pricingModule });

        return pricingModuleDTO;
        
    }

    async getPricingModules() {
        let pricingModules = await this.pricingModuleRepository.find();
        
        if (pricingModules == null) {
            return [];
        }

        let pricingModuleDTOs: PricingModuleDTO[] = [];

        for(let i = 0; i < pricingModules.length; i++) {
            let pricingModule = pricingModules[i];
            let pricingModuleDTO: PricingModuleDTO = ({ ...pricingModule });

            pricingModuleDTOs.push(pricingModuleDTO);

        }

        return pricingModuleDTOs;
        
    }

    async createPricingModule(createPricingModuleDTO: CreatePricingModuleDTO) {
        let newPricingModule = this.pricingModuleRepository.create({ ...createPricingModuleDTO });
        newPricingModule = await this.pricingModuleRepository.save(newPricingModule);

        let pricingModuleDTO = await this.getPricingModule(newPricingModule.pricingModuleId);

        return pricingModuleDTO;
    }

    async updatePricingModule(updatePricingModuleDTO: UpdatePricingModuleDTO) {
            
        let existingPricingModule = await this.pricingModuleRepository.findOne({ 
            where: { 
                pricingModuleId: updatePricingModuleDTO.pricingModuleId
            } 
        });

        //TO DO: RETURN AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingPricingModule) {
            return null; 
        }

        existingPricingModule.pricingModuleSettings = updatePricingModuleDTO.pricingModuleSettings;
        existingPricingModule.pricingModuleRoles = updatePricingModuleDTO.pricingModuleRoles;
        existingPricingModule.pricingModuleIsActive = updatePricingModuleDTO.pricingModuleIsActive;
        existingPricingModule.pricingModuleUpdateDate = new Date();
        
        await this.pricingModuleRepository.save(existingPricingModule);

        let pricingModuleDTO = await this.getPricingModule(existingPricingModule.pricingModuleId);
        
        return pricingModuleDTO;
    }
    
}