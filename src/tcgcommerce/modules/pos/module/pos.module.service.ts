import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POSModule } from 'src/typeorm/entities/tcgcommerce/modules/pos/module/pos.module.entity';
import { CreatePOSModuleDTO, UpdatePOSModuleDTO, POSModuleDTO } from './dto/pos.module.dto';

@Injectable()
export class POSModuleService {

    constructor(
        @InjectRepository(POSModule) private posModuleRepository: Repository<POSModule>,
    ) { }

    async getPOSModule(posModuleId: string): Promise<POSModuleDTO> {
        let posModule = await this.posModuleRepository.findOne({ 
            where: { 
                posModuleId : posModuleId
            } 
        });
        
        if (!posModule) {
            throw new NotFoundException('POS module not found');
        }

        let posModuleDTO = new POSModuleDTO();
        posModuleDTO.posModuleId = posModule.posModuleId;
        posModuleDTO.applicationModuleId = posModule.applicationModuleId;
        posModuleDTO.commerceAccountId = posModule.commerceAccountId;
        posModuleDTO.posModuleSettings = posModule.posModuleSettings;
        posModuleDTO.posModuleRoles = posModule.posModuleRoles;
        posModuleDTO.posModuleIsActive = posModule.posModuleIsActive;
        posModuleDTO.posModuleCreateDate = posModule.posModuleCreateDate;
        posModuleDTO.posModuleUpdateDate = posModule.posModuleUpdateDate;

        return posModuleDTO;
        
    }

    async getPOSModuleByCommerceAccountId(commerceAccountId: string): Promise<POSModuleDTO> {
        let posModule = await this.posModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!posModule) {
            throw new NotFoundException('POS module not found for this commerce account');
        }

        let posModuleDTO = new POSModuleDTO();
        posModuleDTO.posModuleId = posModule.posModuleId;
        posModuleDTO.applicationModuleId = posModule.applicationModuleId;
        posModuleDTO.commerceAccountId = posModule.commerceAccountId;
        posModuleDTO.posModuleSettings = posModule.posModuleSettings;
        posModuleDTO.posModuleRoles = posModule.posModuleRoles;
        posModuleDTO.posModuleIsActive = posModule.posModuleIsActive;
        posModuleDTO.posModuleCreateDate = posModule.posModuleCreateDate;
        posModuleDTO.posModuleUpdateDate = posModule.posModuleUpdateDate;

        return posModuleDTO;
        
    }

    async getPOSModules(): Promise<POSModuleDTO[]> {
        let posModules = await this.posModuleRepository.find();
        
        if (posModules == null) {
            return [];
        }

        let posModuleDTOs: POSModuleDTO[] = [];

        for(let i = 0; i < posModules.length; i++) {
            let posModule = posModules[i];
            let posModuleDTO = new POSModuleDTO();
            posModuleDTO.posModuleId = posModule.posModuleId;
            posModuleDTO.applicationModuleId = posModule.applicationModuleId;
            posModuleDTO.commerceAccountId = posModule.commerceAccountId;
            posModuleDTO.posModuleSettings = posModule.posModuleSettings;
            posModuleDTO.posModuleRoles = posModule.posModuleRoles;
            posModuleDTO.posModuleIsActive = posModule.posModuleIsActive;
            posModuleDTO.posModuleCreateDate = posModule.posModuleCreateDate;
            posModuleDTO.posModuleUpdateDate = posModule.posModuleUpdateDate;

            posModuleDTOs.push(posModuleDTO);

        }

        return posModuleDTOs;
        
    }

    async createPOSModule(createPOSModuleDTO: CreatePOSModuleDTO): Promise<POSModuleDTO> {
        let newPOSModule = this.posModuleRepository.create({ ...createPOSModuleDTO });
        newPOSModule = await this.posModuleRepository.save(newPOSModule);

        let posModuleDTO = await this.getPOSModule(newPOSModule.posModuleId);

        return posModuleDTO;
    }

    async updatePOSModule(updatePOSModuleDTO: UpdatePOSModuleDTO): Promise<POSModuleDTO> {
            
        let existingPOSModule = await this.posModuleRepository.findOne({ 
            where: { 
                posModuleId: updatePOSModuleDTO.posModuleId
            } 
        });

        if (!existingPOSModule) {
            throw new NotFoundException('POS module not found');
        }

        existingPOSModule.posModuleSettings = updatePOSModuleDTO.posModuleSettings;
        existingPOSModule.posModuleRoles = updatePOSModuleDTO.posModuleRoles;
        existingPOSModule.posModuleIsActive = updatePOSModuleDTO.posModuleIsActive;
        existingPOSModule.posModuleUpdateDate = new Date();
        
        await this.posModuleRepository.save(existingPOSModule);

        let posModuleDTO = await this.getPOSModule(existingPOSModule.posModuleId);
        
        return posModuleDTO;
    }
    
}