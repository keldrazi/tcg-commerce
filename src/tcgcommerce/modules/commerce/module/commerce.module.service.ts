import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceModule } from 'src/typeorm/entities/tcgcommerce/modules/commerce/module/commerce.module.entity';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO, CommerceModuleDTO } from './dto/commerce.module.dto';

@Injectable()
export class CommerceModuleService {

    constructor(
        @InjectRepository(CommerceModule) private commerceModuleRepository: Repository<CommerceModule>,
    ) { }

    async getCommerceModuleById(commerceModuleId: string): Promise<CommerceModuleDTO> {
        let commerceModule = await this.commerceModuleRepository.findOneOrFail({ 
            where: { 
                commerceModuleId : commerceModuleId
            } 
        });

        let commerceModuleDTO :CommerceModuleDTO = ({ ...commerceModule})

        return commerceModuleDTO;
        
    }

    async getCommerceModuleByCommerceAccountId(commerceAccountId: string): Promise<CommerceModuleDTO> {
        let commerceModule = await this.commerceModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let commerceModuleDTO :CommerceModuleDTO = ({ ...commerceModule})

        return commerceModuleDTO;
        
    }

    async getCommerceModules(): Promise<CommerceModuleDTO[]> {
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

    async createCommerceModule(createCommerceModuleDTO: CreateCommerceModuleDTO): Promise<CommerceModuleDTO> {
        
        let commerceModule = await this.commerceModuleRepository.findOne({ 
            where: { 
                commerceAccountId: createCommerceModuleDTO.commerceAccountId
            } 
        });

        if (commerceModule != null) {
            throw new ConflictException('Commerce module already exists');
        }
        
        commerceModule = this.commerceModuleRepository.create({ ...createCommerceModuleDTO });
        commerceModule = await this.commerceModuleRepository.save(commerceModule);

        let commerceModuleDTO = await this.getCommerceModuleById(commerceModule.commerceModuleId);

        return commerceModuleDTO;
    }

    async updateCommerceModule(updateCommerceModuleDTO: UpdateCommerceModuleDTO): Promise<CommerceModuleDTO> {
            
        let commerceModule = await this.commerceModuleRepository.findOneOrFail({ 
            where: { 
                commerceModuleId: updateCommerceModuleDTO.commerceModuleId
            } 
        });

        commerceModule.commerceModuleSettings = updateCommerceModuleDTO.commerceModuleSettings;
        commerceModule.commerceModuleRoles = updateCommerceModuleDTO.commerceModuleRoles;
        commerceModule.commerceModuleIsActive = updateCommerceModuleDTO.commerceModuleIsActive;
        commerceModule.commerceModuleUpdateDate = new Date();
        
        await this.commerceModuleRepository.save(commerceModule);

        let commerceModuleDTO = await this.getCommerceModuleById(commerceModule.commerceModuleId);
        
        return commerceModuleDTO;
    }

}