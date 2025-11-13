import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentTypeDTO, UpdateBuylistPaymentTypeDTO, BuylistPaymentTypeDTO } from './dto/buylist.payment.type.dto';
import { BuylistPaymentType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/type/buylist.payment.type.entity';

@Injectable()
export class BuylistPaymentTypeService {

    constructor(
        @InjectRepository(BuylistPaymentType) private buylistPaymentTypeRepository: Repository<BuylistPaymentType>,
    ) { }

    async getBuylistPaymentTypeById(buylistPaymentTypeId: string) {
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeId: buylistPaymentTypeId 
            } 
        });
        
        if (buylistPaymentType == null) {
            return null;
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }

    async getBuylistPaymentTypes() {
        let buylistPaymentTypes = await this.buylistPaymentTypeRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPaymentTypes == null) {
            return null;
        }
        
        let buylistPaymentTypeDTOs: BuylistPaymentTypeDTO[] = [];

        for(let i = 0; i < buylistPaymentTypes.length; i++) {
            let buylistPaymentType = buylistPaymentTypes[i];
            let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

            buylistPaymentTypeDTOs.push(buylistPaymentTypeDTO);
        }

        return buylistPaymentTypeDTOs;
    }
    
    async getBuylistPaymentTypeByName(name: string) {
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeName: name 
            } 
        });
        
        if (buylistPaymentType == null) {
            return null;
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }
    
    async createBuylistPaymentType(createBuylistPaymentTypeDTO: CreateBuylistPaymentTypeDTO) {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentType = await this.getBuylistPaymentTypeByName(createBuylistPaymentTypeDTO.buylistPaymentTypeName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (buylistPaymentType != null) {
            return null;
        }
        
        let newBuylistPaymentType = this.buylistPaymentTypeRepository.create({ ...createBuylistPaymentTypeDTO });
        newBuylistPaymentType = await this.buylistPaymentTypeRepository.save(newBuylistPaymentType);

        let buylistPaymentTypeDTO = this.getBuylistPaymentTypeById(newBuylistPaymentType.buylistPaymentTypeId);
        
        return buylistPaymentTypeDTO;
        
    }

    async updateBuylistPaymentType(updateBuylistPaymentTypeDTO: UpdateBuylistPaymentTypeDTO) {
                    
        let existingBuylistPaymentType = await this.getBuylistPaymentTypeById(updateBuylistPaymentTypeDTO.buylistPaymentTypeId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistPaymentType) {
            return null; 
        }

        existingBuylistPaymentType.buylistPaymentTypeName = updateBuylistPaymentTypeDTO.buylistPaymentTypeName;
        existingBuylistPaymentType.buylistPaymentTypeCode = updateBuylistPaymentTypeDTO.buylistPaymentTypeCode;
        existingBuylistPaymentType.buylistPaymentTypeIsActive = updateBuylistPaymentTypeDTO.buylistPaymentTypeIsActive;
        existingBuylistPaymentType.buylistPaymentTypeUpdateDate = new Date();
        
        await this.buylistPaymentTypeRepository.save(existingBuylistPaymentType);

        let buylistPaymentTypeDTO = this.getBuylistPaymentTypeById(existingBuylistPaymentType.buylistPaymentTypeId);

        return buylistPaymentTypeDTO;
    
    }
    
}