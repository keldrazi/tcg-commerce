import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFullfilmentOrderTypeDTO, UpdateFullfilmentOrderTypeDTO, FullfilmentOrderTypeDTO } from './dto/fullfilment.order.type.dto';
import { FullfilmentOrderType } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/type/fullfilment.order.type.entity';

@Injectable()
export class FullfilmentOrderTypeService {

    constructor(
        @InjectRepository(FullfilmentOrderType) private fullfilmentOrderTypeRepository: Repository<FullfilmentOrderType>,
    ) { }

    async getFullfilmentOrderTypeById(fullfilmentOrderTypeId: string) {
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOneOrFail({ 
            where: { 
                fullfilmentOrderTypeId: fullfilmentOrderTypeId 
            } 
        });

        let fullfilmentOrderTypeDTO: FullfilmentOrderTypeDTO = ({ ...fullfilmentOrderType });

        return fullfilmentOrderTypeDTO;
        
    }

    async getFullfilmentOrderTypes() {
        let fullfilmentOrderTypes = await this.fullfilmentOrderTypeRepository.find();
        
        let fullfilmentOrderTypeDTOs: FullfilmentOrderTypeDTO[] = [];

        if(fullfilmentOrderTypes == null) {
            return fullfilmentOrderTypeDTOs;
        }
        
        for(let i = 0; i < fullfilmentOrderTypes.length; i++) {
            let fullfilmentOrderType = fullfilmentOrderTypes[i];
            let fullfilmentOrderTypeDTO: FullfilmentOrderTypeDTO = ({ ...fullfilmentOrderType });

            fullfilmentOrderTypeDTOs.push(fullfilmentOrderTypeDTO);
        }

        return fullfilmentOrderTypeDTOs;
    }
    
    async getFullfilmentOrderTypeByName(fullfilmentOrderTypeName: string) {
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOneOrFail({ 
            where: { 
                fullfilmentOrderTypeName: fullfilmentOrderTypeName 
            } 
        });

        let fullfilmentOrderTypeDTO: FullfilmentOrderTypeDTO = ({ ...fullfilmentOrderType });

        return fullfilmentOrderTypeDTO;
        
    }

    async getFullfilmentOrderTypeByCode(fullfilmentOrderTypeCode: string) {
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOneOrFail({ 
            where: { 
                fullfilmentOrderTypeCode: fullfilmentOrderTypeCode 
            } 
        });

        let fullfilmentOrderTypeDTO: FullfilmentOrderTypeDTO = ({ ...fullfilmentOrderType });

        return fullfilmentOrderTypeDTO;
        
    }
    
    async createFullfilmentOrderType(createFullfilmentOrderTypeDTO: CreateFullfilmentOrderTypeDTO) {
    
        //CHECK TO SEE IF THE FULLFILMENT ORDER TYPE ALREADY EXISTS;
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOne({ 
            where: { 
                fullfilmentOrderTypeName: createFullfilmentOrderTypeDTO.fullfilmentOrderTypeName
            } 
        });
        
        if (fullfilmentOrderType != null) {
            throw new ConflictException('Fullfilment order type already exists');
        }
        
        fullfilmentOrderType = this.fullfilmentOrderTypeRepository.create({ ...createFullfilmentOrderTypeDTO });
        fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.save(fullfilmentOrderType);

        let fullfilmentOrderTypeDTO = this.getFullfilmentOrderTypeById(fullfilmentOrderType.fullfilmentOrderTypeId);
        
        return fullfilmentOrderTypeDTO;
        
    }

    async updateFullfilmentOrderType(updateFullfilmentOrderTypeDTO: UpdateFullfilmentOrderTypeDTO) {
                    
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOneOrFail({ 
            where: { 
                fullfilmentOrderTypeId: updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeId
            } 
        });

        fullfilmentOrderType.fullfilmentOrderTypeName = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeName;
        fullfilmentOrderType.fullfilmentOrderTypeCode = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeCode;
        fullfilmentOrderType.fullfilmentOrderTypeIsActive = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeIsActive;
        fullfilmentOrderType.fullfilmentOrderTypeUpdateDate = new Date();
        
        await this.fullfilmentOrderTypeRepository.save(fullfilmentOrderType);

        let fullfilmentOrderTypeDTO = this.getFullfilmentOrderTypeById(fullfilmentOrderType.fullfilmentOrderTypeId);
        
        return fullfilmentOrderTypeDTO;
    
    }
    
}