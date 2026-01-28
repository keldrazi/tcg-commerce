import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePOSVendorDTO, UpdatePOSVendorDTO, POSVendorDTO } from './dto/pos.vendor.dto';
import { POSVendor } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/pos.vendor.entity';

@Injectable()
export class POSVendorService {

    constructor(
        @InjectRepository(POSVendor) private posVendorRepository: Repository<POSVendor>,
    ) { }

    async getPOSVendor(posVendorId: string): Promise<POSVendorDTO> {
        let posVendor = await this.posVendorRepository.findOneOrFail({ 
            where: { 
                posVendorId: posVendorId
            } 
        });
        
        let posVendorDTO:POSVendorDTO = ({ ...posVendor });        
        
        return posVendorDTO;
        
    }

    async getPOSVendors(): Promise<POSVendorDTO[]> {
        let posVendors = await this.posVendorRepository.find({
            where: {
                posVendorIsActive: true
            },
            order: {
                posVendorName: 'ASC'
            }
        });
        
        let posVendorDTOs: POSVendorDTO[] = [];
        
        if(!posVendors) {
            return posVendorDTOs;
        }
        
        for(let i = 0; i < posVendors.length; i++) {
            let posVendor = posVendors[i];
            let posVendorDTO:POSVendorDTO = ({ ...posVendor });   

            posVendorDTOs.push(posVendorDTO);
        }

        return posVendorDTOs;
    }
    
    async getPOSVendorByName(name: string): Promise<POSVendorDTO> {
        let posVendor = await this.posVendorRepository.findOneOrFail({ 
            where: { 
                posVendorName: name 
            } 
        });
        
        let posVendorDTO:POSVendorDTO = ({ ...posVendor });   
        
        return posVendorDTO;
        
    }

    async getPOSVendorByCode(code: string): Promise<POSVendorDTO> {
        let posVendor = await this.posVendorRepository.findOneOrFail({ 
            where: { 
                posVendorCode: code 
            } 
        });

        let posVendorDTO:POSVendorDTO = ({ ...posVendor });   
        
        return posVendorDTO;
        
    }
    
    async createPOSVendor(createPOSVendorDTO: CreatePOSVendorDTO): Promise<POSVendorDTO> {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let posVendor = await this.posVendorRepository.findOne({ 
            where: { 
                posVendorName: createPOSVendorDTO.posVendorName 
            } 
        });
        
        if (posVendor != null) {
            throw new ConflictException('POS vendor already exists');
        }
        
        posVendor = this.posVendorRepository.create({ ...createPOSVendorDTO });
        posVendor = await this.posVendorRepository.save(posVendor);

        let posVendorDTO = this.getPOSVendor(posVendor.posVendorId);

        return posVendorDTO;
        
    }

    async updatePOSVendor(updatePOSVendorDTO: UpdatePOSVendorDTO): Promise<POSVendorDTO> {
                
        let posVendor = await this.posVendorRepository.findOneOrFail({ 
            where: { 
                posVendorId: updatePOSVendorDTO.posVendorId
            } 
        });

        posVendor.posVendorName = updatePOSVendorDTO.posVendorName;
        posVendor.posVendorDescription = updatePOSVendorDTO.posVendorDescription;
        posVendor.posVendorCode = updatePOSVendorDTO.posVendorCode;
        posVendor.posVendorURL = updatePOSVendorDTO.posVendorURL;
        posVendor.posVendorIsActive = updatePOSVendorDTO.posVendorIsActive;
        posVendor.posVendorUpdateDate = new Date();
        
        await this.posVendorRepository.save(posVendor);

        let posVendorDTO = this.getPOSVendor(posVendor.posVendorId);

        return posVendorDTO;
    
    }
    
}