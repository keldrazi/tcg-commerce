import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO, BuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

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
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_NOT_FOUND', 'Buylist type was not found for buylistTypeId: ' + buylistTypeId);
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
            return null;
        }

        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }
    
    async createBuylistType(createBuylistTypeDTO: CreateBuylistTypeDTO) {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistType = await this.getBuylistTypeByName(createBuylistTypeDTO.buylistTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (buylistType != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_ALREADY_EXISTS', 'Buylist type already exists for buylistTypeName: ' + createBuylistTypeDTO.buylistTypeName);
        }
        
        let newBuylistType = this.buylistTypeRepository.create({ ...createBuylistTypeDTO });
        newBuylistType = await this.buylistTypeRepository.save(newBuylistType);

        let buylistTypeDTO = this.getBuylistTypeById(newBuylistType.buylistTypeId);
        
        return buylistTypeDTO;
        
    }

    async updateBuylistType(updateBuylistTypeDTO: UpdateBuylistTypeDTO) {
                    
        let existingBuylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeId: updateBuylistTypeDTO.buylistTypeId 
            } 
        });
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistType) {
            return this.errorMessageService.createErrorMessage('BUYLIST_TYPE_NOT_FOUND', 'Buylist type was not found for buylistTypeId: ' + updateBuylistTypeDTO.buylistTypeId);
        }

        existingBuylistType.buylistTypeName = updateBuylistTypeDTO.buylistTypeName;
        existingBuylistType.buylistTypeCode = updateBuylistTypeDTO.buylistTypeCode;
        existingBuylistType.buylistTypeIsActive = updateBuylistTypeDTO.buylistTypeIsActive;
        existingBuylistType.buylistTypeUpdateDate = new Date();
        
        await this.buylistTypeRepository.save(existingBuylistType);

        let buylistTypeDTO = this.getBuylistTypeById(existingBuylistType.buylistTypeId);

        return buylistTypeDTO;
    
    }
    
}