import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO, BuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';

@Injectable()
export class BuylistTypeService {

    constructor(
        @InjectRepository(BuylistType) private buylistTypeRepository: Repository<BuylistType>,
    ) { }

    async getBuylistTypeById(buylistTypeId: string): Promise<BuylistTypeDTO> {
        let buylistType = await this.buylistTypeRepository.findOneOrFail({ 
            where: { 
                buylistTypeId: buylistTypeId 
            } 
        });
        
        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }

    async getBuylistTypes(): Promise<BuylistTypeDTO[]> {
        let buylistTypes = await this.buylistTypeRepository.find();
        
        let buylistTypeDTOs: BuylistTypeDTO[] = [];

        if(!buylistTypes) {
            return buylistTypeDTOs;
        }
        
        for(let i = 0; i < buylistTypes.length; i++) {
            let buylistType = buylistTypes[i];
            let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

            buylistTypeDTOs.push(buylistTypeDTO);
        }

        return buylistTypeDTOs;
    }
    
    async getBuylistTypeByName(buylistTypeName: string): Promise<BuylistTypeDTO> {
        let buylistType = await this.buylistTypeRepository.findOneOrFail({ 
            where: { 
                buylistTypeName: buylistTypeName 
            } 
        });
        
        let buylistTypeDTO: BuylistTypeDTO = ({ ...buylistType });

        return buylistTypeDTO;
        
    }
    
    async createBuylistType(createBuylistTypeDTO: CreateBuylistTypeDTO): Promise<BuylistTypeDTO> {
    
        let buylistType = await this.buylistTypeRepository.findOne({ 
            where: { 
                buylistTypeName: createBuylistTypeDTO.buylistTypeName 
            } 
        });

        if (buylistType) {
            throw new ConflictException('Buylist type already exists');
        }
        
        buylistType = this.buylistTypeRepository.create({ ...createBuylistTypeDTO });
        buylistType = await this.buylistTypeRepository.save(buylistType);

        let buylistTypeDTO = await this.getBuylistTypeById(buylistType.buylistTypeId);
        
        return buylistTypeDTO;
        
    }

    async updateBuylistType(updateBuylistTypeDTO: UpdateBuylistTypeDTO): Promise<BuylistTypeDTO> {
                    
        let buylistType = await this.buylistTypeRepository.findOneOrFail({ 
            where: { 
                buylistTypeId: updateBuylistTypeDTO.buylistTypeId 
            } 
        });
            
        buylistType.buylistTypeName = updateBuylistTypeDTO.buylistTypeName;
        buylistType.buylistTypeCode = updateBuylistTypeDTO.buylistTypeCode;
        buylistType.buylistTypeIsActive = updateBuylistTypeDTO.buylistTypeIsActive;
        buylistType.buylistTypeUpdateDate = new Date();
        
        await this.buylistTypeRepository.save(buylistType);

        let buylistTypeDTO = await this.getBuylistTypeById(buylistType.buylistTypeId);
        
        return buylistTypeDTO;
    
    }
    
}