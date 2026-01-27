import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistModule } from 'src/typeorm/entities/tcgcommerce/modules/buylist/module/buylist.module.entity';
import { CreateBuylistModuleDTO, UpdateBuylistModuleDTO, BuylistModuleDTO } from './dto/buylist.module.dto';

@Injectable()
export class BuylistModuleService {

    constructor(
        @InjectRepository(BuylistModule) private buylistModuleRepository: Repository<BuylistModule>
    ) { }

    async getBuylistModuleById(buylistModuleId: string): Promise<BuylistModuleDTO> {
        let buylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                buylistModuleId : buylistModuleId
            } 
        });
        
        if (buylistModule == null) {
            throw new NotFoundException('Buylist module was not found');
        }

        let buylistModuleDTO :BuylistModuleDTO = ({ ...buylistModule})

        return buylistModuleDTO;
        
    }

    async getBuylistModuleByCommerceAccountId(commerceAccountId: string): Promise<BuylistModuleDTO> {
        let buylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (buylistModule == null) {
            throw new NotFoundException('Buylist module was not found');
        }

        let buylistModuleDTO :BuylistModuleDTO = ({ ...buylistModule})

        return buylistModuleDTO;
        
    }

    async getBuylistModules(): Promise<BuylistModuleDTO[]> {
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

    async createBuylistModule(createBuylistModuleDTO: CreateBuylistModuleDTO): Promise<BuylistModuleDTO> {
        
        let buylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                commerceAccountId : createBuylistModuleDTO.commerceAccountId
            } 
        });

        buylistModule = this.buylistModuleRepository.create({ ...createBuylistModuleDTO });
        buylistModule = await this.buylistModuleRepository.save(buylistModule);

        let buylistModuleDTO = await this.getBuylistModuleById(buylistModule.buylistModuleId);

        return buylistModuleDTO;
    }

    async updateBuylistModule(updateBuylistModuleDTO: UpdateBuylistModuleDTO): Promise<BuylistModuleDTO> {
            
        let buylistModule = await this.buylistModuleRepository.findOne({ 
            where: { 
                buylistModuleId: updateBuylistModuleDTO.buylistModuleId
            } 
        });

        if (buylistModule == null) {
            throw new NotFoundException('Buylist module was not found');
        }

        buylistModule.buylistModuleSettings = updateBuylistModuleDTO.buylistModuleSettings;
        buylistModule.buylistModuleRoles = updateBuylistModuleDTO.buylistModuleRoles;
        buylistModule.buylistModuleIsActive = updateBuylistModuleDTO.buylistModuleIsActive;
        buylistModule.buylistModuleUpdateDate = new Date();
        
        await this.buylistModuleRepository.save(buylistModule);

        let buylistModuleDTO = await this.getBuylistModuleById(buylistModule.buylistModuleId);
        
        return buylistModuleDTO;
    }

}