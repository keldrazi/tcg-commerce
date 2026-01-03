import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePOSVendorOptionPriceDTO, UpdatePOSVendorOptionPriceDTO, POSVendorOptionPriceDTO } from './dto/pos.vendor.option.price.dto';
import { POSVendorOptionPrice } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/pos.vendor.option.price.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class POSVendorOptionPriceService {

    constructor(
        @InjectRepository(POSVendorOptionPrice) private posVendorOptionPriceRepository: Repository<POSVendorOptionPrice>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getPOSVendorOptionPrice(posVendorOptionPriceId: string) {
        let posVendorOptionPrice = await this.posVendorOptionPriceRepository.findOne({ 
            where: { 
                posVendorOptionPriceId: posVendorOptionPriceId
            } 
        });
        
        if (posVendorOptionPrice == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceDTO:POSVendorOptionPriceDTO = ({ ...posVendorOptionPrice });        
        
        return posVendorOptionPriceDTO;
        
    }

    async getPOSVendorOptionPrices(posVendorId: string) {
        let posVendorOptionPrices = await this.posVendorOptionPriceRepository.find({
            where: {
                posVendorId,
                posVendorOptionPriceIsActive: true
            },
            order: {
                posVendorOptionPriceName: 'ASC'
            }
        });
        
        let posVendorOptionPriceDTOs: POSVendorOptionPriceDTO[] = [];
        
        if(posVendorOptionPrices == null) {
            return posVendorOptionPriceDTOs;
        }
        
        for(let i = 0; i < posVendorOptionPrices.length; i++) {
            let posVendorOptionPrice = posVendorOptionPrices[i];
            let posVendorOptionPriceDTO:POSVendorOptionPriceDTO = ({ ...posVendorOptionPrice });   

            posVendorOptionPriceDTOs.push(posVendorOptionPriceDTO);
        }

        return posVendorOptionPriceDTOs;
    }
    
    async getPOSVendorOptionPriceByName(posVendorId: string, posVendorOptionPriceName: string) {
        let posVendorOptionPrice = await this.posVendorOptionPriceRepository.findOne({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceName: posVendorOptionPriceName 
            } 
        });
        
        if (posVendorOptionPrice == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceDTO:POSVendorOptionPriceDTO = ({ ...posVendorOptionPrice });   
        
        return posVendorOptionPriceDTO;
        
    }

    async getPOSVendorOptionPriceByCode(posVendorId: string, posVendorOptionPriceCode: string) {
        let posVendorOptionPrice = await this.posVendorOptionPriceRepository.findOne({ 
            where: { 
                posVendorId: posVendorId,
                posVendorOptionPriceCode: posVendorOptionPriceCode 
            } 
        });
        
        if (posVendorOptionPrice == null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        let posVendorOptionPriceDTO:POSVendorOptionPriceDTO = ({ ...posVendorOptionPrice });   
        
        return posVendorOptionPriceDTO;
        
    }
    
    async createPOSVendorOptionPrice(createPOSVendorOptionPriceDTO: CreatePOSVendorOptionPriceDTO) {
    
        //CHECK TO SEE IF THE PRODUCT CARD TYPE ALREADY EXISTS;
        let posVendorOptionPrice = await this.posVendorOptionPriceRepository.findOne({ 
            where: { 
                posVendorOptionPriceName: createPOSVendorOptionPriceDTO.posVendorOptionPriceName 
            } 
        });
        
        if (posVendorOptionPrice != null) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_ALREADY_EXISTS', 'POS vendor already exists');
        }
        
        posVendorOptionPrice = this.posVendorOptionPriceRepository.create({ ...createPOSVendorOptionPriceDTO });
        posVendorOptionPrice = await this.posVendorOptionPriceRepository.save(posVendorOptionPrice);

        let posVendorOptionPriceDTO = this.getPOSVendorOptionPrice(posVendorOptionPrice.posVendorOptionPriceId);

        return posVendorOptionPriceDTO;
        
    }

    async updatePOSVendorOptionPrice(updatePOSVendorOptionPriceDTO: UpdatePOSVendorOptionPriceDTO) {
                
        let posVendorOptionPrice = await this.posVendorOptionPriceRepository.findOne({ 
            where: { 
                posVendorOptionPriceId: updatePOSVendorOptionPriceDTO.posVendorOptionPriceId
            } 
        });

        if (!posVendorOptionPrice) {
            return this.errorMessageService.createErrorMessage('PRODUCT_VENDOR_NOT_FOUND', 'POS vendor was not found');
        }

        posVendorOptionPrice.posVendorOptionPriceName = updatePOSVendorOptionPriceDTO.posVendorOptionPriceName;
        posVendorOptionPrice.posVendorOptionPriceCode = updatePOSVendorOptionPriceDTO.posVendorOptionPriceCode;
        posVendorOptionPrice.posVendorOptionPriceIsActive = updatePOSVendorOptionPriceDTO.posVendorOptionPriceIsActive;
        posVendorOptionPrice.posVendorOptionPriceUpdateDate = new Date();
        
        await this.posVendorOptionPriceRepository.save(posVendorOptionPrice);

        let posVendorOptionPriceDTO = this.getPOSVendorOptionPrice(posVendorOptionPrice.posVendorOptionPriceId);

        return posVendorOptionPriceDTO;
    
    }
    
}