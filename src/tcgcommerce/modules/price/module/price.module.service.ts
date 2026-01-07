import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceModule } from 'src/typeorm/entities/tcgcommerce/modules/price/module/price.module.entity';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO, PriceModuleDTO } from './dto/price.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class PriceModuleService {

    constructor(
        @InjectRepository(PriceModule) private priceModuleRepository: Repository<PriceModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getPriceModuleById(priceModuleId: string) {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId : priceModuleId
            } 
        });
        
        if (priceModule == null) {
            return this.errorMessageService.createErrorMessage('PRICE_MODULE_NOT_FOUND', 'Price module was not found');
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
        
        if (priceModule == null) {
            return this.errorMessageService.createErrorMessage('PRICE_MODULE_NOT_FOUND', 'Price module was not found');
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
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : createPriceModuleDTO.commerceAccountId
            } 
        });

        if (priceModule != null) {
            return this.errorMessageService.createErrorMessage('PRICE_MODULE_ALREADY_EXISTS', 'Price module already exists');
        }
        
        priceModule = this.priceModuleRepository.create({ ...createPriceModuleDTO });
        priceModule = await this.priceModuleRepository.save(priceModule);

        let priceModuleDTO = await this.getPriceModuleById(priceModule.priceModuleId);

        return priceModuleDTO;
    }

    async updatePriceModule(updatePriceModuleDTO: UpdatePriceModuleDTO) {
            
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId: updatePriceModuleDTO.priceModuleId
            } 
        });

        if (priceModule == null) {
            return this.errorMessageService.createErrorMessage('PRICE_MODULE_NOT_FOUND', 'Price module was not found');
        }

        priceModule.priceModuleSettings = updatePriceModuleDTO.priceModuleSettings;
        priceModule.priceModuleRoles = updatePriceModuleDTO.priceModuleRoles;
        priceModule.priceModuleIsActive = updatePriceModuleDTO.priceModuleIsActive;
        priceModule.priceModuleUpdateDate = new Date();
        
        await this.priceModuleRepository.save(priceModule);

        let priceModuleDTO = await this.getPriceModuleById(priceModule.priceModuleId);
        
        return priceModuleDTO;
    }
    
}