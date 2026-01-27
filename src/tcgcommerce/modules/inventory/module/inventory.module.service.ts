import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryModule } from 'src/typeorm/entities/tcgcommerce/modules/inventory/module/inventory.module.entity';
import { CreateInventoryModuleDTO, UpdateInventoryModuleDTO, InventoryModuleDTO } from './dto/inventory.module.dto';

@Injectable()
export class InventoryModuleService {

    constructor(
        @InjectRepository(InventoryModule) private inventoryModuleRepository: Repository<InventoryModule>,
    ) { }

    async getInventoryModuleById(inventoryModuleId: string): Promise<InventoryModuleDTO> {
        let inventoryModule = await this.inventoryModuleRepository.findOneOrFail({ 
            where: { 
                inventoryModuleId : inventoryModuleId
            } 
        });

        let inventoryModuleDTO: InventoryModuleDTO = ({ ...inventoryModule });

        return inventoryModuleDTO;

    }

    async getInventoryModuleByCommerceAccountId(commerceAccountId: string): Promise<InventoryModuleDTO> {
        let inventoryModule = await this.inventoryModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });

        let inventoryModuleDTO: InventoryModuleDTO = ({ ...inventoryModule });

        return inventoryModuleDTO;
        
    }


    async getInventoryModules(): Promise<InventoryModuleDTO[]> {
        let inventoryModules = await this.inventoryModuleRepository.find();
        
        if (inventoryModules == null) {
            return [];
        }

        let inventoryModuleDTOs: InventoryModuleDTO[] = [];

        for(let i = 0; i < inventoryModules.length; i++) {
            let inventoryModule = inventoryModules[i];
            let inventoryModuleDTO: InventoryModuleDTO = ({ ...inventoryModule });

            inventoryModuleDTOs.push(inventoryModuleDTO);

        }

        return inventoryModuleDTOs;
        
    }

    async createInventoryModule(createInventoryModuleDTO: CreateInventoryModuleDTO): Promise<InventoryModuleDTO> {
        let inventoryModule = await this.inventoryModuleRepository.findOne({
            where: {
                commerceAccountId: createInventoryModuleDTO.commerceAccountId
            }
        });

        if (inventoryModule != null) {
            throw new ConflictException('Inventory module already exists');
        }


        inventoryModule = this.inventoryModuleRepository.create({ ...createInventoryModuleDTO });
        inventoryModule = await this.inventoryModuleRepository.save(inventoryModule);

        let inventoryModuleDTO = await this.getInventoryModuleById(inventoryModule.inventoryModuleId);

        return inventoryModuleDTO;
    }

    async updateInventoryModule(updateInventoryModuleDTO: UpdateInventoryModuleDTO): Promise<InventoryModuleDTO> {
        
        let inventoryModule = await this.inventoryModuleRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: updateInventoryModuleDTO.commerceAccountId
            } 
        });

        inventoryModule.inventoryModuleSettings = updateInventoryModuleDTO.inventoryModuleSettings;
        inventoryModule.inventoryModuleRoles = updateInventoryModuleDTO.inventoryModuleRoles;
        inventoryModule.inventoryModuleIsActive = updateInventoryModuleDTO.inventoryModuleIsActive;
        inventoryModule.inventoryModuleUpdateDate = new Date();
        
        await this.inventoryModuleRepository.save(inventoryModule);

        let inventoryModuleDTO = await this.getInventoryModuleById(inventoryModule.inventoryModuleId);
        
        return inventoryModuleDTO;
    }
    
}