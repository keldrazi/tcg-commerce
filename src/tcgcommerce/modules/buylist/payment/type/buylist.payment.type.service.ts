import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentTypeDTO, UpdateBuylistPaymentTypeDTO, BuylistPaymentTypeDTO } from './dto/buylist.payment.type.dto';
import { BuylistPaymentType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/type/buylist.payment.type.entity';

@Injectable()
export class BuylistPaymentTypeService {

    constructor(
        @InjectRepository(BuylistPaymentType) private buylistPaymentTypeRepository: Repository<BuylistPaymentType>,
    ) { }

    async getBuylistPaymentTypeById(buylistPaymentTypeId: string): Promise<BuylistPaymentTypeDTO> {
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeId: buylistPaymentTypeId 
            } 
        });
        
        if (buylistPaymentType == null) {
            throw new NotFoundException('Buylist payment type was not found');
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }

    async getBuylistPaymentTypes(): Promise<BuylistPaymentTypeDTO[]> {
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
    
    async getBuylistPaymentTypeByName(name: string): Promise<BuylistPaymentTypeDTO> {
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeName: name 
            } 
        });
        
        if (buylistPaymentType == null) {
            throw new NotFoundException('Buylist payment type was not found');
        }

        let buylistPaymentTypeDTO: BuylistPaymentTypeDTO = ({ ...buylistPaymentType });

        return buylistPaymentTypeDTO;
        
    }
    
    async createBuylistPaymentType(createBuylistPaymentTypeDTO: CreateBuylistPaymentTypeDTO): Promise<BuylistPaymentTypeDTO> {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeName: createBuylistPaymentTypeDTO.buylistPaymentTypeName 
            } 
        });
        
        if (buylistPaymentType != null) {
            throw new ConflictException('Buylist payment type with name already exists');
        }
        
        buylistPaymentType = this.buylistPaymentTypeRepository.create({ ...createBuylistPaymentTypeDTO });
        buylistPaymentType = await this.buylistPaymentTypeRepository.save(buylistPaymentType);

        let buylistPaymentTypeDTO = await this.getBuylistPaymentTypeById(buylistPaymentType.buylistPaymentTypeId);
        
        return buylistPaymentTypeDTO;
        
    }

    async updateBuylistPaymentType(updateBuylistPaymentTypeDTO: UpdateBuylistPaymentTypeDTO): Promise<BuylistPaymentTypeDTO> {
                    
        let buylistPaymentType = await this.buylistPaymentTypeRepository.findOne({ 
            where: { 
                buylistPaymentTypeId: updateBuylistPaymentTypeDTO.buylistPaymentTypeId 
            } 
        });
        
        if (!buylistPaymentType) {
            throw new NotFoundException('Buylist payment type was not found');
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