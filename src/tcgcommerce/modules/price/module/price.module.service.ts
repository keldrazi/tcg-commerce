import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceModule } from 'src/typeorm/entities/tcgcommerce/modules/price/module/price.module.entity';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO, PriceModuleDTO } from './dto/price.module.dto';

@Injectable()
export class PriceModuleService {

    constructor(
        @InjectRepository(PriceModule) private priceModuleRepository: Repository<PriceModule>,
    ) { }

    async getPriceModule(priceModuleId: string) {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId : priceModuleId
            } 
        });
        
        if (!priceModule) {
            return null;
        }

        let priceModuleDTO: PriceModuleDTO = ({ ...priceModule });

        return priceModuleDTO;
        
    }

    async getPriceModuleByCommerceAccountId(commerceAccountId: string) {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!priceModule) {
            return null;
        }

        let priceModuleDTO: PriceModuleDTO = ({ ...priceModule });

        return priceModuleDTO;
        
    }

    async getPriceModules() {
        let priceModules = await this.priceModuleRepository.find();
        
        if (priceModules == null) {
            return [];
        }

        let priceModuleDTOs: PriceModuleDTO[] = [];

        for(let i = 0; i < priceModules.length; i++) {
            let priceModule = priceModules[i];
            let priceModuleDTO: PriceModuleDTO = ({ ...priceModule });

            priceModuleDTOs.push(priceModuleDTO);

        }

        return priceModuleDTOs;
        
    }

    async createPriceModule(createPriceModuleDTO: CreatePriceModuleDTO) {
        let newPriceModule = this.priceModuleRepository.create({ ...createPriceModuleDTO });
        newPriceModule = await this.priceModuleRepository.save(newPriceModule);

        let priceModuleDTO = await this.getPriceModule(newPriceModule.priceModuleId);

        return priceModuleDTO;
    }

    async updatePriceModule(updatePriceModuleDTO: UpdatePriceModuleDTO) {
            
        let existingPriceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId: updatePriceModuleDTO.priceModuleId
            } 
        });

        //TO DO: RETURN AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingPriceModule) {
            return null; 
        }

        existingPriceModule.priceModuleSettings = updatePriceModuleDTO.priceModuleSettings;
        existingPriceModule.priceModuleRoles = updatePriceModuleDTO.priceModuleRoles;
        existingPriceModule.priceModuleIsActive = updatePriceModuleDTO.priceModuleIsActive;
        existingPriceModule.priceModuleUpdateDate = new Date();
        
        await this.priceModuleRepository.save(existingPriceModule);

        let priceModuleDTO = await this.getPriceModule(existingPriceModule.priceModuleId);
        
        return priceModuleDTO;
    }
    
}