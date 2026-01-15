import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FullfilmentModule } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/module/fullfilment.module.entity';
import { CreateFullfilmentModuleDTO, UpdateFullfilmentModuleDTO, FullfilmentModuleDTO } from './dto/fullfilment.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class FullfilmentModuleService {

    constructor(
        @InjectRepository(FullfilmentModule) private fullfilmentModuleRepository: Repository<FullfilmentModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getFullfilmentModule(fullfilmentModuleId: string) {
        let fullfilmentModule = await this.fullfilmentModuleRepository.findOne({ 
            where: { 
                fullfilmentModuleId : fullfilmentModuleId
            } 
        });
        
        if (fullfilmentModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Fullfilment module was not found for fullfilmentModuleId: ' + fullfilmentModuleId);
        }

        let fullfilmentModuleDTO :FullfilmentModuleDTO = ({ ...fullfilmentModule})

        return fullfilmentModuleDTO;
        
    }

    async getFullfilmentModules() {
        let fullfilmentModules = await this.fullfilmentModuleRepository.find();
        
        if (fullfilmentModules == null) {
            return [];
        }

        let fullfilmentModuleDTOs: FullfilmentModuleDTO[] = [];

        for(let i = 0; i < fullfilmentModules.length; i++) {
            let fullfilmentModule = fullfilmentModules[i];
            let fullfilmentModuleDTO :FullfilmentModuleDTO = ({ ...fullfilmentModule})

            fullfilmentModuleDTOs.push(fullfilmentModuleDTO);

        }

        return fullfilmentModuleDTOs;
        
    }

    async createFullfilmentModule(createFullfilmentModuleDTO: CreateFullfilmentModuleDTO) {
        
        let newFullfilmentModule = this.fullfilmentModuleRepository.create({ ...createFullfilmentModuleDTO });
        newFullfilmentModule = await this.fullfilmentModuleRepository.save(newFullfilmentModule);

        let fullfilmentModuleDTO = await this.getFullfilmentModule(newFullfilmentModule.fullfilmentModuleId);

        return fullfilmentModuleDTO;
    }

    async updateFullfilmentModule(updateFullfilmentModuleDTO: UpdateFullfilmentModuleDTO) {
            
        let existingFullfilmentModule = await this.fullfilmentModuleRepository.findOne({ 
            where: { 
                fullfilmentModuleId: updateFullfilmentModuleDTO.fullfilmentModuleId
            } 
        });

        if (existingFullfilmentModule == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_MODULE_NOT_FOUND', 'Fullfilment module was not found for fullfilmentModuleId: ' + updateFullfilmentModuleDTO.fullfilmentModuleId);
        }

        existingFullfilmentModule.fullfilmentModuleSettings = updateFullfilmentModuleDTO.fullfilmentModuleSettings;
        existingFullfilmentModule.fullfilmentModuleRoles = updateFullfilmentModuleDTO.fullfilmentModuleRoles;
        existingFullfilmentModule.fullfilmentModuleIsActive = updateFullfilmentModuleDTO.fullfilmentModuleIsActive;
        existingFullfilmentModule.fullfilmentModuleUpdateDate = new Date();
        
        await this.fullfilmentModuleRepository.save(existingFullfilmentModule);

        let fullfilmentModuleDTO = await this.getFullfilmentModule(existingFullfilmentModule.fullfilmentModuleId);
        
        return fullfilmentModuleDTO;
    }

}