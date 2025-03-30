import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationModule } from 'src/typeorm/entities/tcgcommerce/modules/application/module/application.module.entity';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO, ApplicationModuleDTO } from './dto/application.module.dto';

@Injectable()
export class ApplicationModuleService {

    constructor(
        @InjectRepository(ApplicationModule) private applicationModuleRepository: Repository<ApplicationModule>,
    ) { }

    async getApplicationModule(applicationModuleId: string) {
        let applicationModule = await this.applicationModuleRepository.findOne({ 
            where: { 
                applicationModuleId : applicationModuleId
            } 
        });
        
        if (!applicationModule) {
            return null;
        }

        let applicationModuleDTO = new ApplicationModuleDTO();
        applicationModuleDTO.applicationModuleId = applicationModule.applicationModuleId;
        applicationModuleDTO.applicationModuleName = applicationModule.applicationModuleName;
        applicationModuleDTO.applicationModuleHandle = applicationModule.applicationModuleHandle;
        applicationModuleDTO.applicationModuleDescription = applicationModule.applicationModuleDescription;
        applicationModuleDTO.applicationModuleSettings = applicationModule.applicationModuleSettings;
        applicationModuleDTO.applicationModuleRoles = applicationModule.applicationModuleRoles;
        applicationModuleDTO.applicationModuleIsActive = applicationModule.applicationModuleIsActive;
        applicationModuleDTO.applicationModuleCreateDate = applicationModule.applicationModuleCreateDate;
        applicationModuleDTO.applicationModuleUpdateDate = applicationModule.applicationModuleUpdateDate;

        return applicationModuleDTO;
        
    }

    async getApplicationModules() {
        let applicationModules = await this.applicationModuleRepository.find();
        
        if (applicationModules == null) {
            return [];
        }

        let applicationModuleDTOs: ApplicationModuleDTO[] = [];

        for(let i = 0; i < applicationModules.length; i++) {
            let applicationModule = applicationModules[i];
            let applicationModuleDTO = new ApplicationModuleDTO();
            applicationModuleDTO.applicationModuleId = applicationModule.applicationModuleId;
            applicationModuleDTO.applicationModuleName = applicationModule.applicationModuleName;
            applicationModuleDTO.applicationModuleHandle = applicationModule.applicationModuleHandle;
            applicationModuleDTO.applicationModuleDescription = applicationModule.applicationModuleDescription;
            applicationModuleDTO.applicationModuleSettings = applicationModule.applicationModuleSettings;
            applicationModuleDTO.applicationModuleRoles = applicationModule.applicationModuleRoles;
            applicationModuleDTO.applicationModuleIsActive = applicationModule.applicationModuleIsActive;
            applicationModuleDTO.applicationModuleCreateDate = applicationModule.applicationModuleCreateDate;
            applicationModuleDTO.applicationModuleUpdateDate = applicationModule.applicationModuleUpdateDate;

            applicationModuleDTOs.push(applicationModuleDTO);

        }

        return applicationModuleDTOs;
        
    }

    async createApplicationModule(createApplicationModuleDTO: CreateApplicationModuleDTO) {
        let newApplicationModule = this.applicationModuleRepository.create({ ...createApplicationModuleDTO });
        newApplicationModule = await this.applicationModuleRepository.save(newApplicationModule);

        let applicationModuleDTO = await this.getApplicationModule(newApplicationModule.applicationModuleId);

        return applicationModuleDTO;
    }

    async updateApplicationModule(updateApplicationModuleDTO: UpdateApplicationModuleDTO) {
        let existingApplicationModule = await this.applicationModuleRepository.findOne({
            where: {    
                applicationModuleId: updateApplicationModuleDTO.applicationModuleId
            }
        });

        //TO DO: THROW AN ERROR IF APPLICATION MODULE NOT FOUND;
        if (!existingApplicationModule) {
            return null; 
        }

        existingApplicationModule.applicationModuleDescription = updateApplicationModuleDTO.applicationModuleDescription;
        existingApplicationModule.applicationModuleSettings = updateApplicationModuleDTO.applicationModuleSettings;
        existingApplicationModule.applicationModuleRoles = updateApplicationModuleDTO.applicationModuleRoles;
        existingApplicationModule.applicationModuleIsActive = updateApplicationModuleDTO.applicationModuleIsActive;

        await this.applicationModuleRepository.save(existingApplicationModule);

        let applicationModuleDTO = await this.getApplicationModule(existingApplicationModule.applicationModuleId);

        return applicationModuleDTO;
    }
    
}