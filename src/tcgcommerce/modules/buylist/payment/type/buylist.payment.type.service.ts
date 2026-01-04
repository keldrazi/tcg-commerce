import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentTypeDTO, UpdateBuylistPaymentTypeDTO, BuylistPaymentTypeDTO } from './dto/buylist.payment.type.dto';
import { BuylistPaymentType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/type/buylist.payment.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistPaymentTypeService {

    constructor(
        @InjectRepository(BuylistPaymentType) private buylistPaymentTypeRepository: Repository<BuylistPaymentType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistPaymentTypeById(buylistPaymentTypeId: string) {
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeId: buylistPaymentTypeId 
            } 
        });
        
        if (buylistPaymentType == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_TYPE_NOT_FOUND', 'Buylist payment type was not found');
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }

    async getBuylistPaymentTypes() {
        let buylistPaymentTypes = await this.buylistPaymentTypeRepository.find();
        
        let buylistPaymentTypeDTOs: BuylistPaymentTypeDTO[] = [];
        
        if(buylistPaymentTypes == null) {
            return buylistPaymentTypeDTOs;
        }
        
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
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_TYPE_NOT_FOUND', 'Buylist payment type was not found');
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }
    
    async createBuylistPaymentType(createBuylistPaymentTypeDTO: CreateBuylistPaymentTypeDTO) {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeName: createBuylistPaymentTypeDTO.buylistPaymentTypeName 
            } 
        });
        
        if (buylistPaymentType != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_TYPE_EXISTS', 'Buylist payment type with name already exists');
        }
        
        buylistPaymentType = this.buylistPaymentTypeRepository.create({ ...createBuylistPaymentTypeDTO });
        buylistPaymentType = await this.buylistPaymentTypeRepository.save(buylistPaymentType);

        let buylistPaymentTypeDTO = await this.getBuylistPaymentTypeById(buylistPaymentType.buylistPaymentTypeId);
        
        return buylistPaymentTypeDTO;
        
    }

    async updateBuylistPaymentType(updateBuylistPaymentTypeDTO: UpdateBuylistPaymentTypeDTO) {
                    
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeId: updateBuylistPaymentTypeDTO.buylistPaymentTypeId 
            } 
        });
        
        if (!buylistPaymentType) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_TYPE_NOT_FOUND', 'Buylist payment type was not found');
        }

        buylistPaymentType.buylistPaymentTypeName = updateBuylistPaymentTypeDTO.buylistPaymentTypeName;
        buylistPaymentType.buylistPaymentTypeCode = updateBuylistPaymentTypeDTO.buylistPaymentTypeCode;
        buylistPaymentType.buylistPaymentTypeIsActive = updateBuylistPaymentTypeDTO.buylistPaymentTypeIsActive;
        buylistPaymentType.buylistPaymentTypeUpdateDate = new Date();
        
        await this.buylistPaymentTypeRepository.save(buylistPaymentType);

        let buylistPaymentTypeDTO = await this.getBuylistPaymentTypeById(buylistPaymentType.buylistPaymentTypeId);
        
        return buylistPaymentTypeDTO;
    
    }
    
}