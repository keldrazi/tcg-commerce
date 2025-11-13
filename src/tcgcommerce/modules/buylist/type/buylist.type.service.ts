import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO, BuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';

@Injectable()
export class BuylistTypeService {

    constructor(
        @InjectRepository(BuylistType) private buylistTypeRepository: Repository<BuylistType>,
    ) { }

    async getBuylistTypeById(buylistTypeId: string) {
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeId: buylistTypeId 
            } 
        });
        
        if (buylistType == null) {
            return null;
        }

        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }

    async getBuylistTypes() {
        let buylistTypes = await this.buylistTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistTypes == null) {
            return null;
        }
        
        let buylistTypeDTOs: BuylistTypeDTO[] = [];

        for(let i = 0; i < buylistTypes.length; i++) {
            let buylistType = buylistTypes[i];
            let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

            buylistTypeDTOs.push(buylistTypeDTO);
        }

        return buylistTypeDTOs;
    }
    
    async getBuylistTypeByName(name: string) {
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeName: name 
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
            return null;
        }
        
        let newBuylistType = this.buylistTypeRepository.create({ ...createBuylistTypeDTO });
        newBuylistType = await this.buylistTypeRepository.save(newBuylistType);

        let buylistTypeDTO = this.getBuylistTypeById(newBuylistType.buylistTypeId);
        
        return buylistTypeDTO;
        
    }

    async updateBuylistType(updateBuylistTypeDTO: UpdateBuylistTypeDTO) {
                    
        let existingBuylistType = await this.getBuylistTypeById(updateBuylistTypeDTO.buylistTypeId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistType) {
            return null; 
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