import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImportModule } from 'src/typeorm/entities/tcgcommerce/modules/import/module/import.module.entity';
import { CreateImportModuleDTO, UpdateImportModuleDTO, ImportModuleDTO } from './dto/import.module.dto';

@Injectable()
export class ImportModuleService {

    constructor(
        @InjectRepository(ImportModule) private importModuleRepository: Repository<ImportModule>,
    ) { }

    async getImportModule(importModuleId: string) {
        let importModule = await this.importModuleRepository.findOne({ 
            where: { 
                importModuleId : importModuleId
            } 
        });
        
        if (!importModule) {
            return null;
        }

        let importModuleDTO = new ImportModuleDTO();
        importModuleDTO.importModuleId = importModule.importModuleId;
        importModuleDTO.applicationModuleId = importModule.applicationModuleId;
        importModuleDTO.commerceAccountId = importModule.commerceAccountId;
        importModuleDTO.importModuleSettings = importModule.importModuleSettings;
        importModuleDTO.importModuleRoles = importModule.importModuleRoles;
        importModuleDTO.importModuleIsActive = importModule.importModuleIsActive;
        importModuleDTO.importModuleCreateDate = importModule.importModuleCreateDate;
        importModuleDTO.importModuleUpdateDate = importModule.importModuleUpdateDate;

        return importModuleDTO;
        
    }

    async getImportModuleByCommerceAccountId(commerceAccountId: string) {
        let importModule = await this.importModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (!importModule) {
            return null;
        }

        let importModuleDTO = new ImportModuleDTO();
        importModuleDTO.importModuleId = importModule.importModuleId;
        importModuleDTO.applicationModuleId = importModule.applicationModuleId;
        importModuleDTO.commerceAccountId = importModule.commerceAccountId;
        importModuleDTO.importModuleSettings = importModule.importModuleSettings;
        importModuleDTO.importModuleRoles = importModule.importModuleRoles;
        importModuleDTO.importModuleIsActive = importModule.importModuleIsActive;
        importModuleDTO.importModuleCreateDate = importModule.importModuleCreateDate;
        importModuleDTO.importModuleUpdateDate = importModule.importModuleUpdateDate;

        return importModuleDTO;
        
    }

    async getImportModules() {
        let importModules = await this.importModuleRepository.find();
        
        if (importModules == null) {
            return [];
        }

        let importModuleDTOs: ImportModuleDTO[] = [];

        for(let i = 0; i < importModules.length; i++) {
            let importModule = importModules[i];
            let importModuleDTO = new ImportModuleDTO();
            importModuleDTO.importModuleId = importModule.importModuleId;
            importModuleDTO.applicationModuleId = importModule.applicationModuleId;
            importModuleDTO.commerceAccountId = importModule.commerceAccountId;
            importModuleDTO.importModuleSettings = importModule.importModuleSettings;
            importModuleDTO.importModuleRoles = importModule.importModuleRoles;
            importModuleDTO.importModuleIsActive = importModule.importModuleIsActive;
            importModuleDTO.importModuleCreateDate = importModule.importModuleCreateDate;
            importModuleDTO.importModuleUpdateDate = importModule.importModuleUpdateDate;

            importModuleDTOs.push(importModuleDTO);

        }

        return importModuleDTOs;
        
    }

    async createImportModule(createImportModuleDTO: CreateImportModuleDTO) {
        let newImportModule = this.importModuleRepository.create({ ...createImportModuleDTO });
        newImportModule = await this.importModuleRepository.save(newImportModule);

        let importModuleDTO = await this.getImportModule(newImportModule.importModuleId);

        return importModuleDTO;
    }

    async updateImportModule(updateImportModuleDTO: UpdateImportModuleDTO) {
            
        let existingImportModule = await this.importModuleRepository.findOne({ 
            where: { 
                importModuleId: updateImportModuleDTO.importModuleId
            } 
        });

        //TO DO: RETUNR AN ERROR IF PRODUCT MODULE NOT FOUND;
        if (!existingImportModule) {
            return null; 
        }

        existingImportModule.importModuleSettings = updateImportModuleDTO.importModuleSettings;
        existingImportModule.importModuleRoles = updateImportModuleDTO.importModuleRoles;
        existingImportModule.importModuleIsActive = updateImportModuleDTO.importModuleIsActive;
        existingImportModule.importModuleUpdateDate = new Date();
        
        await this.importModuleRepository.save(existingImportModule);

        let importModuleDTO = await this.getImportModule(existingImportModule.importModuleId);
        
        return importModuleDTO;
    }
    
}