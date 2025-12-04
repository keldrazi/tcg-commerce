import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistModule } from 'src/typeorm/entities/tcgcommerce/modules/buylist/module/buylist.module.entity';
import { CreateBuylistModuleDTO, UpdateBuylistModuleDTO, BuylistModuleDTO } from './dto/buylist.module.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistModuleService {

    constructor(
        @InjectRepository(BuylistModule) private buylistModuleRepository: Repository<BuylistModule>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getBuylistModule(buylistModuleId: string) {
        let buylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                buylistModuleId : buylistModuleId
            } 
        });
        
        if (buylistModule == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_MODULE_NOT_FOUND', 'Buylist module was not found');
        }

        let buylistModuleDTO :BuylistModuleDTO = ({ ...buylistModule})

        return buylistModuleDTO;
        
    }

    async getBuylistModules() {
        let buylistModules = await this.buylistModuleRepository.find();
        
        if (buylistModules == null) {
            return [];
        }

        let buylistModuleDTOs: BuylistModuleDTO[] = [];

        for(let i = 0; i < buylistModules.length; i++) {
            let buylistModule = buylistModules[i];
            let buylistModuleDTO :BuylistModuleDTO = ({ ...buylistModule})

            buylistModuleDTOs.push(buylistModuleDTO);

        }

        return buylistModuleDTOs;
        
    }

    async createBuylistModule(createBuylistModuleDTO: CreateBuylistModuleDTO) {
        
        let newBuylistModule = this.buylistModuleRepository.create({ ...createBuylistModuleDTO });
        newBuylistModule = await this.buylistModuleRepository.save(newBuylistModule);

        let buylistModuleDTO = await this.getBuylistModule(newBuylistModule.buylistModuleId);

        return buylistModuleDTO;
    }

    async updateBuylistModule(updateBuylistModuleDTO: UpdateBuylistModuleDTO) {
            
        let existingBuylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                buylistModuleId: updateBuylistModuleDTO.buylistModuleId
            } 
        });

        if (existingBuylistModule == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_MODULE_NOT_FOUND', 'Buylist module was not found');
        }

        existingBuylistModule.buylistModuleSettings = updateBuylistModuleDTO.buylistModuleSettings;
        existingBuylistModule.buylistModuleRoles = updateBuylistModuleDTO.buylistModuleRoles;
        existingBuylistModule.buylistModuleIsActive = updateBuylistModuleDTO.buylistModuleIsActive;
        existingBuylistModule.buylistModuleUpdateDate = new Date();
        
        await this.buylistModuleRepository.save(existingBuylistModule);

        let buylistModuleDTO = await this.getBuylistModule(existingBuylistModule.buylistModuleId);
        
        return buylistModuleDTO;
    }

}