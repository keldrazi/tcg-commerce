import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO, BuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';

@Injectable()
export class BuylistTypeService {

    constructor(
        @InjectRepository(BuylistType) private buylistTypeRepository: Repository<BuylistType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistTypeById(buylistTypeId: string) {
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeId: buylistTypeId 
            } 
        });
        
        if (buylistType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_NOT_FOUND', 'Buylist type was not found');
        }

        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }

    async getBuylistTypes() {
        let buylistTypes = await this.buylistTypeRepository.find();
        
        let buylistTypeDTOs: BuylistTypeDTO[] = [];

        if(buylistTypes == null) {
            return buylistTypeDTOs;
        }
        
        for(let i = 0; i < buylistTypes.length; i++) {
            let buylistType = buylistTypes[i];
            let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

            buylistTypeDTOs.push(buylistTypeDTO);
        }

        return buylistTypeDTOs;
    }
    
    async getBuylistTypeByName(buylistTypeName: string) {
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeName: buylistTypeName 
            } 
        });
        
        if (buylistType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_NOT_FOUND', 'Buylist type was not found');
        }

        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }
    
    async createBuylistType(createBuylistTypeDTO: CreateBuylistTypeDTO) {
    
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeName: createBuylistTypeDTO.buylistTypeName 
            } 
        });

        if (buylistType != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_ALREADY_EXISTS', 'Buylist type already exists');
        }
        
        buylistType = this.buylistTypeRepository.create({ ...createBuylistTypeDTO });
        buylistType = await this.buylistTypeRepository.save(buylistType);

        let buylistTypeDTO = await this.getBuylistTypeById(buylistType.buylistTypeId);
        
        return buylistTypeDTO;
        
    }

    async updateBuylistType(updateBuylistTypeDTO: UpdateBuylistTypeDTO) {
                    
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeId: updateBuylistTypeDTO.buylistTypeId 
            } 
        });
            
        if (!buylistType) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_NOT_FOUND', 'Buylist type was not found');
        }

        buylistType.buylistTypeName = updateBuylistTypeDTO.buylistTypeName;
        buylistType.buylistTypeCode = updateBuylistTypeDTO.buylistTypeCode;
        buylistType.buylistTypeIsActive = updateBuylistTypeDTO.buylistTypeIsActive;
        buylistType.buylistTypeUpdateDate = new Date();
        
        await this.buylistTypeRepository.save(buylistType);

        let buylistTypeDTO = await this.getBuylistTypeById(buylistType.buylistTypeId);
        
        return buylistTypeDTO;
    
    }
    
}