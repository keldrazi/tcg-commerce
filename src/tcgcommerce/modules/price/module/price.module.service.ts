import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceModule } from 'src/typeorm/entities/tcgcommerce/modules/price/module/price.module.entity';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO, PriceModuleDTO } from './dto/price.module.dto';

@Injectable()
export class PriceModuleService {

    constructor(
        @InjectRepository(PriceModule) private priceModuleRepository: Repository<PriceModule>,
    ) { }

    async getPriceModuleById(priceModuleId: string): Promise<PriceModuleDTO> {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId : priceModuleId
            } 
        });
        
        if (priceModule == null) {
            throw new NotFoundException('Price module not found');
        }

        let priceModuleDTO: PriceModuleDTO = ({ ...priceModule });

        return priceModuleDTO;
        
    }

    async getPriceModuleByCommerceAccountId(commerceAccountId: string): Promise<PriceModuleDTO> {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (priceModule == null) {
            throw new NotFoundException('Price module not found for this commerce account');
        }

        let priceModuleDTO: PriceModuleDTO = ({ ...priceModule });

        return priceModuleDTO;
        
    }

    async getPriceModules(): Promise<PriceModuleDTO[]> {
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

    async createPriceModule(createPriceModuleDTO: CreatePriceModuleDTO): Promise<PriceModuleDTO> {
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                commerceAccountId : createPriceModuleDTO.commerceAccountId
            } 
        });

        if (priceModule != null) {
            throw new ConflictException('Price module already exists');
        }
        
        priceModule = this.priceModuleRepository.create({ ...createPriceModuleDTO });
        priceModule = await this.priceModuleRepository.save(priceModule);

        let priceModuleDTO = await this.getPriceModuleById(priceModule.priceModuleId);

        return priceModuleDTO;
    }

    async updatePriceModule(updatePriceModuleDTO: UpdatePriceModuleDTO): Promise<PriceModuleDTO> {
            
        let priceModule = await this.priceModuleRepository.findOne({ 
            where: { 
                priceModuleId: updatePriceModuleDTO.priceModuleId
            } 
        });

        if (priceModule == null) {
            throw new NotFoundException('Price module not found');
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