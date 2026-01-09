import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryModule } from 'src/typeorm/entities/tcgcommerce/modules/inventory/module/inventory.module.entity';
import { CreateInventoryModuleDTO, UpdateInventoryModuleDTO, InventoryModuleDTO } from './dto/inventory.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class InventoryModuleService {

    constructor(
        @InjectRepository(InventoryModule) private inventoryModuleRepository: Repository<InventoryModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getInventoryModuleById(inventoryModuleId: string) {
        let inventoryModule = await this.inventoryModuleRepository.findOne({ 
            where: { 
                inventoryModuleId : inventoryModuleId
            } 
        });
        
        if (inventoryModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Inventory module was not found');
        }

        let inventoryModuleDTO: InventoryModuleDTO = ({ ...inventoryModule });

        return inventoryModuleDTO;

    }

    async getInventoryModuleByCommerceAccountId(commerceAccountId: string) {
        let inventoryModule = await this.inventoryModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (inventoryModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Inventory module was not found');
        }

        let inventoryModuleDTO: InventoryModuleDTO = ({ ...inventoryModule });

        return inventoryModuleDTO;
        
    }


    async getInventoryModules() {
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

    async createInventoryModule(createInventoryModuleDTO: CreateInventoryModuleDTO) {
        let inventoryModule = await this.inventoryModuleRepository.findOne({
            where: {
                commerceAccountId: createInventoryModuleDTO.commerceAccountId
            }
        });

        if (inventoryModule != null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_EXISTS', 'Inventory module already exists');
        }


        inventoryModule = this.inventoryModuleRepository.create({ ...createInventoryModuleDTO });
        inventoryModule = await this.inventoryModuleRepository.save(inventoryModule);

        let inventoryModuleDTO = await this.getInventoryModuleById(inventoryModule.inventoryModuleId);

        return inventoryModuleDTO;
    }

    async updateInventoryModule(updateInventoryModuleDTO: UpdateInventoryModuleDTO) {
        
        let inventoryModule = await this.inventoryModuleRepository.findOne({ 
            where: { 
                commerceAccountId: updateInventoryModuleDTO.commerceAccountId
            } 
        });

        if (inventoryModule == null) {
            return this.errorMessageService.createErrorMessage('REPORT_MODULE_NOT_FOUND', 'Inventory module was not found');
        }

        inventoryModule.inventoryModuleSettings = updateInventoryModuleDTO.inventoryModuleSettings;
        inventoryModule.inventoryModuleRoles = updateInventoryModuleDTO.inventoryModuleRoles;
        inventoryModule.inventoryModuleIsActive = updateInventoryModuleDTO.inventoryModuleIsActive;
        inventoryModule.inventoryModuleUpdateDate = new Date();
        
        await this.inventoryModuleRepository.save(inventoryModule);

        let inventoryModuleDTO = await this.getInventoryModuleById(inventoryModule.inventoryModuleId);
        
        return inventoryModuleDTO;
    }
    
}