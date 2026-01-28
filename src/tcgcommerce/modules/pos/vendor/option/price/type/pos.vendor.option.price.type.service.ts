import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePOSVendorOptionPriceTypeDTO, UpdatePOSVendorOptionPriceTypeDTO, POSVendorOptionPriceTypeDTO } from './dto/pos.vendor.option.price.type.dto';
import { POSVendorOptionPriceType } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/type/pos.vendor.option.price.type.entity';

@Injectable()
export class POSVendorOptionPriceTypeService {

    constructor(
        @InjectRepository(POSVendorOptionPriceType) private posVendorOptionPriceTypeRepository: Repository<POSVendorOptionPriceType>,
    ) { }

    async getPOSVendorOptionPriceType(posVendorOptionPriceTypeId: string): Promise<POSVendorOptionPriceTypeDTO> {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOneOrFail({ 
            where: { 
                posVendorOptionPriceTypeId: posVendorOptionPriceTypeId
            } 
        });
        
        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });        
        
        return posVendorOptionPriceTypeDTO;
        
    }

    async getPOSVendorOptionPriceTypes(posVendorId: string): Promise<POSVendorOptionPriceTypeDTO[]> {
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
    
    async getPOSVendorOptionPriceTypeByName(posVendorId: string, posVendorOptionPriceTypeName: string): Promise<POSVendorOptionPriceTypeDTO> {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOneOrFail({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceTypeName: posVendorOptionPriceTypeName 
            } 
        });
        
        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });   
        
        return posVendorOptionPriceTypeDTO;
        
    }

    async getPOSVendorOptionPriceTypeByCode(posVendorId: string, posVendorOptionPriceTypeCode: string): Promise<POSVendorOptionPriceTypeDTO> {
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOneOrFail({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceTypeCode: posVendorOptionPriceTypeCode 
            } 
        });
        
        let posVendorOptionPriceTypeDTO:POSVendorOptionPriceTypeDTO = ({ ...posVendorOptionPriceType });   
        
        return posVendorOptionPriceTypeDTO;
        
    }
    
    async createPOSVendorOptionPriceType(createPOSVendorOptionPriceTypeDTO: CreatePOSVendorOptionPriceTypeDTO): Promise<POSVendorOptionPriceTypeDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOne({ 
            where: { 
                posVendorOptionPriceTypeName: createPOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeName 
            } 
        });
        
        if (!posVendorOptionPriceType) {
            throw new ConflictException('POS vendor option price type already exists');
        }
        
        posVendorOptionPriceType = this.posVendorOptionPriceTypeRepository.create({ ...createPOSVendorOptionPriceTypeDTO });
        posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.save(posVendorOptionPriceType);

        let posVendorOptionPriceTypeDTO = this.getPOSVendorOptionPriceType(posVendorOptionPriceType.posVendorOptionPriceTypeId);

        return posVendorOptionPriceTypeDTO;
        
    }

    async updatePOSVendorOptionPriceType(updatePOSVendorOptionPriceTypeDTO: UpdatePOSVendorOptionPriceTypeDTO): Promise<POSVendorOptionPriceTypeDTO> {
                
        let posVendorOptionPriceType = await this.posVendorOptionPriceTypeRepository.findOneOrFail({ 
            where: { 
                posVendorOptionPriceTypeId: updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeId
            } 
        });

        posVendorOptionPriceType.posVendorOptionPriceTypeName = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeName;
        posVendorOptionPriceType.posVendorOptionPriceTypeCode = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeCode;
        posVendorOptionPriceType.posVendorOptionPriceTypeIsActive = updatePOSVendorOptionPriceTypeDTO.posVendorOptionPriceTypeIsActive;
        posVendorOptionPriceType.posVendorOptionPriceTypeUpdateDate = new Date();
        
        await this.posVendorOptionPriceTypeRepository.save(posVendorOptionPriceType);

        let posVendorOptionPriceTypeDTO = this.getPOSVendorOptionPriceType(posVendorOptionPriceType.posVendorOptionPriceTypeId);

        return posVendorOptionPriceTypeDTO;
    
    }
    
}