import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePOSVendorOptionPriceTypeDTO, UpdatePOSVendorOptionPriceTypeDTO, POSVendorOptionPriceTypeDTO } from './dto/pos.vendor.option.price.type.dto';
import { POSVendorOptionPriceType } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/type/pos.vendor.option.price.type.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class POSVendorOptionPriceTypeService {

    constructor(
        @InjectRepository(POSVendorOptionPriceType) private posVendorOptionPriceTypeRepository: Repository<POSVendorOptionPriceType>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getPOSVendorOptionPriceType(posVendorOptionPriceTypeId: string) {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorOptionPriceTypeId: posVendorOptionPriceTypeId
            } 
        });
        
        if (posVendorOptionPriceType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });        
        
        return posVendorOptionPriceTypeDTO;
        
    }

    async getPOSVendorOptionPriceTypes(posVendorId: string) {
        let posVendorOptionPriceTypes = await this.posVendorOptionPriceTypeRepository.find({
            where: {
                posVendorId,
                posVendorOptionPriceTypeIsActive: true
            },
            order: {
                posVendorOptionPriceTypeName: 'ASC'
            }
        });
        
        let posVendorOptionPriceTypeDTOs: POSVendorOptionPriceTypeDTO[] = [];
        
        if(posVendorOptionPriceTypes == null) {
            return posVendorOptionPriceTypeDTOs;
        }
        
        for(let i = 0; i < posVendorOptionPriceTypes.length; i++) {
            let posVendorOptionPriceType = posVendorOptionPriceTypes[i];
            let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });   

            posVendorOptionPriceTypeDTOs.push(posVendorOptionPriceTypeDTO);
        }

        return posVendorOptionPriceTypeDTOs;
    }
    
    async getPOSVendorOptionPriceTypeByName(posVendorId: string, posVendorOptionPriceTypeName: string) {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceTypeName: posVendorOptionPriceTypeName 
            } 
        });
        
        if (posVendorOptionPriceType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });   
        
        return posVendorOptionPriceTypeDTO;
        
    }

    async getPOSVendorOptionPriceTypeByCode(posVendorId: string, posVendorOptionPriceTypeCode: string) {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceTypeCode: posVendorOptionPriceTypeCode 
            } 
        });
        
        if (posVendorOptionPriceType == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });   
        
        return posVendorOptionPriceTypeDTO;
        
    }
    
    async createPOSVendorOptionPriceType(createPOSVendorOptionPriceTypeDTO: CreatePOSVendorOptionPriceTypeDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorOptionPriceTypeName: createPOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeName 
            } 
        });
        
        if (posVendorOptionPriceType != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_ALREADY_EXISTS', 'POS vendor already exists');
        }
        
        posVendorOptionPriceType = this.posVendorOptionPriceTypeRepository.create({ ...createPOSVendorOptionPriceTypeDTO });
        posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.save(posVendorOptionPriceType);

        let posVendorOptionPriceTypeDTO = this.getPOSVendorOptionPriceType(posVendorOptionPriceType.posVendorOptionPriceTypeId);

        return posVendorOptionPriceTypeDTO;
        
    }

    async updatePOSVendorOptionPriceType(updatePOSVendorOptionPriceTypeDTO: UpdatePOSVendorOptionPriceTypeDTO) {
                
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorOptionPriceTypeId: updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeId
            } 
        });

        if (!posVendorOptionPriceType) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        posVendorOptionPriceType.posVendorOptionPriceTypeName = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeName;
        posVendorOptionPriceType.posVendorOptionPriceTypeCode = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeCode;
        posVendorOptionPriceType.posVendorOptionPriceTypeIsActive = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeIsActive;
        posVendorOptionPriceType.posVendorOptionPriceTypeUpdateDate = new Date();
        
        await this.posVendorOptionPriceTypeRepository.save(posVendorOptionPriceType);

        let posVendorOptionPriceTypeDTO = this.getPOSVendorOptionPriceType(posVendorOptionPriceType.posVendorOptionPriceTypeId);

        return posVendorOptionPriceTypeDTO;
    
    }
    
}