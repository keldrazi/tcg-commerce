import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFullfilmentOrderTypeDTO, UpdateFullfilmentOrderTypeDTO, FullfilmentOrderTypeDTO } from './dto/fullfilment.order.type.dto';
import { FullfilmentOrderType } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/type/fullfilment.order.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class FullfilmentOrderTypeService {

    constructor(
        @InjectRepository(FullfilmentOrderType) private fullfilmentOrderTypeRepository: Repository<FullfilmentOrderType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getFullfilmentOrderTypeById(fullfilmentOrderTypeId: string) {
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOne({ 
            where: { 
                fullfilmentOrderTypeId: fullfilmentOrderTypeId 
            } 
        });
        
        if (fullfilmentOrderType == null) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_NOT_FOUND', 'Fullfilment order type was not found');
        }

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
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOne({ 
            where: { 
                fullfilmentOrderTypeName: fullfilmentOrderTypeName 
            } 
        });
        
        if (fullfilmentOrderType == null) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_NOT_FOUND', 'Fullfilment order type was not found');
        }

        let fullfilmentOrderTypeDTO: FullfilmentOrderTypeDTO = ({ ...fullfilmentOrderType });

        return fullfilmentOrderTypeDTO;
        
    }

    async getFullfilmentOrderTypeByCode(fullfilmentOrderTypeCode: string) {
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOne({ 
            where: { 
                fullfilmentOrderTypeCode: fullfilmentOrderTypeCode 
            } 
        });
        
        if (fullfilmentOrderType == null) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_NOT_FOUND', 'Fullfilment order type was not found');
        }

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
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_ALREADY_EXISTS', 'Fullfilment order type already exists');
        }
        
        fullfilmentOrderType = this.fullfilmentOrderTypeRepository.create({ ...createFullfilmentOrderTypeDTO });
        fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.save(fullfilmentOrderType);

        let fullfilmentOrderTypeDTO = this.getFullfilmentOrderTypeById(fullfilmentOrderType.fullfilmentOrderTypeId);
        
        return fullfilmentOrderTypeDTO;
        
    }

    async updateFullfilmentOrderType(updateFullfilmentOrderTypeDTO: UpdateFullfilmentOrderTypeDTO) {
                    
        let fullfilmentOrderType = await this.fullfilmentOrderTypeRepository.findOne({ 
            where: { 
                fullfilmentOrderTypeId: updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeId
            } 
        });

        if (!fullfilmentOrderType) {
            return this.errorMessageService.createErrorMessage('FULLFILMENT_ORDER_TYPE_NOT_FOUND', 'Fullfilment order type was not found'); 
        }

        fullfilmentOrderType.fullfilmentOrderTypeName = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeName;
        fullfilmentOrderType.fullfilmentOrderTypeCode = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeCode;
        fullfilmentOrderType.fullfilmentOrderTypeIsActive = updateFullfilmentOrderTypeDTO.fullfilmentOrderTypeIsActive;
        fullfilmentOrderType.fullfilmentOrderTypeUpdateDate = new Date();
        
        await this.fullfilmentOrderTypeRepository.save(fullfilmentOrderType);

        let fullfilmentOrderTypeDTO = this.getFullfilmentOrderTypeById(fullfilmentOrderType.fullfilmentOrderTypeId);
        
        return fullfilmentOrderTypeDTO;
    
    }
    
}