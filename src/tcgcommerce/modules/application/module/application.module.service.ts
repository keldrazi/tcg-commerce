import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationModule } from 'src/typeorm/entities/tcgcommerce/modules/application/module/application.module.entity';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO, ApplicationModuleDTO } from './dto/application.module.dto';

@Injectable()
export class ApplicationModuleService {

    constructor(
        @InjectRepository(ApplicationModule) private applicationModuleRepository: Repository<ApplicationModule>,
    ) { }

    async getApplicationModuleById(applicationModuleId: string): Promise<ApplicationModuleDTO>{
        let applicationModule = await this.applicationModuleRepository.findOneOrFail({ 
            where: { 
                applicationModuleId : applicationModuleId
            } 
        });
        
        let applicationModuleDTO: ApplicationModuleDTO = ({ ...applicationModule });

        return applicationModuleDTO;
        
    }

    async getApplicationModules(): Promise<ApplicationModuleDTO[]>{
        let applicationModules = await this.applicationModuleRepository.find();
        
        let applicationModuleDTOs: ApplicationModuleDTO[] = [];

        if (!applicationModules) {
            return applicationModuleDTOs;
        }

        for(let i = 0; i < applicationModules.length; i++) {
            let applicationModule = applicationModules[i];
            let applicationModuleDTO: ApplicationModuleDTO = ({ ...applicationModule });

            applicationModuleDTOs.push(applicationModuleDTO);

        }

        return applicationModuleDTOs;
        
    }

    async createApplicationModule(createApplicationModuleDTO: CreateApplicationModuleDTO): Promise<ApplicationModuleDTO> {
        
        let applicationModule = await this.applicationModuleRepository.findOne({ 
            where: { 
                applicationModuleName : createApplicationModuleDTO.applicationModuleName
            } 
        });
        
        if(applicationModule) {
            throw new ConflictException('Application module already exists');
        }
        
        applicationModule = this.applicationModuleRepository.create({ ...createApplicationModuleDTO });
        applicationModule = await this.applicationModuleRepository.save(applicationModule);

        let applicationModuleDTO = await this.getApplicationModuleById(applicationModule.applicationModuleId);

        return applicationModuleDTO;
    }

    async updateApplicationModule(updateApplicationModuleDTO: UpdateApplicationModuleDTO): Promise<ApplicationModuleDTO> {
        let applicationModule = await this.applicationModuleRepository.findOneOrFail({
            where: {    
                applicationModuleId: updateApplicationModuleDTO.applicationModuleId
            }
        });
 
        applicationModule.applicationModuleName = updateApplicationModuleDTO.applicationModuleName;
        applicationModule.applicationModuleDescription = updateApplicationModuleDTO.applicationModuleDescription;
        applicationModule.applicationModuleIsActive = updateApplicationModuleDTO.applicationModuleIsActive;

        await this.applicationModuleRepository.save(applicationModule);     
        let applicationModuleDTO = await this.getApplicationModuleById(applicationModule.applicationModuleId);

        return applicationModuleDTO;
    }
    
}