import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationModule } from 'src/typeorm/entities/tcgcommerce/modules/application/module/application.module.entity';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO, ApplicationModuleDTO } from './dto/application.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class ApplicationModuleService {

    constructor(
        @InjectRepository(ApplicationModule) private applicationModuleRepository: Repository<ApplicationModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getApplicationModuleById(applicationModuleId: string) {
        let applicationModule = await this.applicationModuleRepository.findOne({ 
            where: { 
                applicationModuleId : applicationModuleId
            } 
        });
        
        if (applicationModule == null) {
            return this.errorMessageService.createErrorMessage('APPLICATION_MODULE_NOT_FOUND', 'Application module was not found');
        }

        let applicationModuleDTO: ApplicationModuleDTO = ({ ...applicationModule });


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
            let applicationModuleDTO: ApplicationModuleDTO = ({ ...applicationModule });

            applicationModuleDTOs.push(applicationModuleDTO);

        }

        return applicationModuleDTOs;
        
    }

    async createApplicationModule(createApplicationModuleDTO: CreateApplicationModuleDTO) {
        
        let applicationModule = await this.applicationModuleRepository.findOne({ 
            where: { 
                applicationModuleName : createApplicationModuleDTO.applicationModuleName
            } 
        });
        
        if (applicationModule != null) {
            return this.errorMessageService.createErrorMessage('APPLICATION_MODULE_ALREADY_EXISTS', 'Application module already exists');
        }
        
        applicationModule = this.applicationModuleRepository.create({ ...createApplicationModuleDTO });
        applicationModule = await this.applicationModuleRepository.save(applicationModule);

        let applicationModuleDTO = await this.getApplicationModuleById(applicationModule.applicationModuleId);

        return applicationModuleDTO;
    }

    async updateApplicationModule(updateApplicationModuleDTO: UpdateApplicationModuleDTO) {
        let applicationModule = await this.applicationModuleRepository.findOne({
            where: {    
                applicationModuleId: updateApplicationModuleDTO.applicationModuleId
            }
        });
 
        if (applicationModule == null) {
            return this.errorMessageService.createErrorMessage('APPLICATION_MODULE_NOT_FOUND', 'Application module was not found');
        }

        applicationModule.applicationModuleName = updateApplicationModuleDTO.applicationModuleName;
        applicationModule.applicationModuleDescription = updateApplicationModuleDTO.applicationModuleDescription;
        applicationModule.applicationModuleIsActive = updateApplicationModuleDTO.applicationModuleIsActive;

        await this.applicationModuleRepository.save(applicationModule);     
        let applicationModuleDTO = await this.getApplicationModuleById(applicationModule.applicationModuleId);

        return applicationModuleDTO;
    }
    
}