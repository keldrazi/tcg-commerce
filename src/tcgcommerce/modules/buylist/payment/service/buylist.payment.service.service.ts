import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentServiceDTO, UpdateBuylistPaymentServiceDTO, BuylistPaymentServiceDTO } from './dto/buylist.payment.service.dto';
import { BuylistPaymentService } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/service/buylist.payment.service.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistPaymentServiceService {

    constructor(
        @InjectRepository(BuylistPaymentService) private buylistPaymentServiceRepository: Repository<BuylistPaymentService>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistPaymentServiceById(buylistPaymentServiceId: string) {
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceId: buylistPaymentServiceId 
            } 
        });
        
        if (buylistPaymentService == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_SERVICE_NOT_FOUND', 'Buylist payment service was not found');
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }

    async getBuylistPaymentServices() {
        let buylistPaymentServices = await this.buylistPaymentServiceRepository.find();
        
        let buylistPaymentServiceDTOs: BuylistPaymentServiceDTO[] = [];
       
        if(buylistPaymentServices == null) {
            buylistPaymentServiceDTOs;
        }
        
        for(let i = 0; i < buylistPaymentServices.length; i++) {
            let buylistPaymentService = buylistPaymentServices[i];
            let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

            buylistPaymentServiceDTOs.push(buylistPaymentServiceDTO);
        }

        return buylistPaymentServiceDTOs;
    }
    
    async getBuylistPaymentServiceByName(name: string) {
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceName: name 
            } 
        });
        
        if (buylistPaymentService == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_SERVICE_NOT_FOUND', 'Buylist payment service was not found');
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }
    
    async createBuylistPaymentService(createBuylistPaymentServiceDTO: CreateBuylistPaymentServiceDTO) {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceName: createBuylistPaymentServiceDTO.buylistPaymentServiceName 
            } 
        });
        
        if (buylistPaymentService != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_SERVICE_EXISTS', 'Buylist payment service with name already exists');
        }
        
        buylistPaymentService = this.buylistPaymentServiceRepository.create({ ...createBuylistPaymentServiceDTO });
        buylistPaymentService = await this.buylistPaymentServiceRepository.save(buylistPaymentService);

        let buylistPaymentServiceDTO = await this.getBuylistPaymentServiceById(buylistPaymentService.buylistPaymentServiceId);
        
        return buylistPaymentServiceDTO;
        
    }

    async updateBuylistPaymentService(updateBuylistPaymentServiceDTO: UpdateBuylistPaymentServiceDTO) {
                    
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceId: updateBuylistPaymentServiceDTO.buylistPaymentServiceId 
            } 
        });
            
        if (!buylistPaymentService) {
            return this.errorMessageService.createErrorMessage('BUYLIST_PAYMENT_SERVICE_NOT_FOUND', 'Buylist payment service was not found');
        }

        buylistPaymentService.buylistPaymentServiceName = updateBuylistPaymentServiceDTO.buylistPaymentServiceName;
        buylistPaymentService.buylistPaymentServiceCode = updateBuylistPaymentServiceDTO.buylistPaymentServiceCode;
        buylistPaymentService.buylistPaymentServiceIsActive = updateBuylistPaymentServiceDTO.buylistPaymentServiceIsActive;
        buylistPaymentService.buylistPaymentServiceUpdateDate = new Date();
        
        await this.buylistPaymentServiceRepository.save(buylistPaymentService);

        let buylistPaymentServiceDTO = await this.getBuylistPaymentServiceById(buylistPaymentService.buylistPaymentServiceId);

        return buylistPaymentServiceDTO;
    
    }
    
}