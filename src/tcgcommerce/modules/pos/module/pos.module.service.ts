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
        let posModule = await this.posModuleRepository.findOneOrFail({ 
            where: { 
                posModuleId : posModuleId
            } 
        });
        
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
        let posModule = await this.posModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

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

        let posModuleDTOs: POSModuleDTO[] = [];

        if(!posModules) {
            return posModuleDTOs;
        }

        for(let i = 0; i < posModules.length; i++) {
            let posModule = posModules[i];
            let posModuleDTO = ({ ...posModule });

            posModuleDTOs.push(posModuleDTO);

        }

        return posModuleDTOs;
        
    }

    async createPOSModule(createPOSModuleDTO: CreatePOSModuleDTO): Promise<POSModuleDTO> {
        
        let posModule = await this.posModuleRepository.findOne({
            where: {
                commerceAccountId : createPOSModuleDTO.commerceAccountId
            } 
        });

        if(posModule) {
            throw new ConflictException('POS module already exists');
        }

        posModule = this.posModuleRepository.create({ ...createPOSModuleDTO });
        await this.posModuleRepository.save(posModule);

        let posModuleDTO = await this.getPOSModule(posModule.posModuleId);

        return posModuleDTO;
    }

    async updatePOSModule(updatePOSModuleDTO: UpdatePOSModuleDTO): Promise<POSModuleDTO> {
            
        let posModule = await this.posModuleRepository.findOneOrFail({ 
            where: { 
                posModuleId: updatePOSModuleDTO.posModuleId
            } 
        });

        posModule.posModuleSettings = updatePOSModuleDTO.posModuleSettings;
        posModule.posModuleRoles = updatePOSModuleDTO.posModuleRoles;
        posModule.posModuleIsActive = updatePOSModuleDTO.posModuleIsActive;
        posModule.posModuleUpdateDate = new Date();
        
        await this.posModuleRepository.save(posModule);

        let posModuleDTO = await this.getPOSModule(posModule.posModuleId);
        
        return posModuleDTO;
    }
    
}