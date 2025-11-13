import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentServiceDTO, UpdateBuylistPaymentServiceDTO, BuylistPaymentServiceDTO } from './dto/buylist.payment.service.dto';
import { BuylistPaymentService } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/service/buylist.payment.service.entity';

@Injectable()
export class BuylistPaymentServiceService {

    constructor(
        @InjectRepository(BuylistPaymentService) private buylistPaymentServiceRepository: Repository<BuylistPaymentService>,
    ) { }

    async getBuylistPaymentServiceById(buylistPaymentServiceId: string) {
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceId: buylistPaymentServiceId 
            } 
        });
        
        if (buylistPaymentService == null) {
            return null;
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }

    async getBuylistPaymentServices() {
        let buylistPaymentServices = await this.buylistPaymentServiceRepository.find();
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistPaymentServices == null) {
            return null;
        }
        
        let buylistPaymentServiceDTOs: BuylistPaymentServiceDTO[] = [];

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
            return null;
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }
    
    async createBuylistPaymentService(createBuylistPaymentServiceDTO: CreateBuylistPaymentServiceDTO) {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentService = await this.getBuylistPaymentServiceByName(createBuylistPaymentServiceDTO.buylistPaymentServiceName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE CARD VARIANT;
        if (buylistPaymentService != null) {
            return null;
        }
        
        let newBuylistPaymentService = this.buylistPaymentServiceRepository.create({ ...createBuylistPaymentServiceDTO });
        newBuylistPaymentService = await this.buylistPaymentServiceRepository.save(newBuylistPaymentService);

        let buylistPaymentServiceDTO = this.getBuylistPaymentServiceById(newBuylistPaymentService.buylistPaymentServiceId);
        
        return buylistPaymentServiceDTO;
        
    }

    async updateBuylistPaymentService(updateBuylistPaymentServiceDTO: UpdateBuylistPaymentServiceDTO) {
                    
        let existingBuylistPaymentService = await this.getBuylistPaymentServiceById(updateBuylistPaymentServiceDTO.buylistPaymentServiceId);
            
        //TO DO: RETUNR AN ERROR IF BUYLIST TYPE NOT FOUND;
        if (!existingBuylistPaymentService) {
            return null; 
        }

        existingBuylistPaymentService.buylistPaymentServiceName = updateBuylistPaymentServiceDTO.buylistPaymentServiceName;
        existingBuylistPaymentService.buylistPaymentServiceCode = updateBuylistPaymentServiceDTO.buylistPaymentServiceCode;
        existingBuylistPaymentService.buylistPaymentServiceIsActive = updateBuylistPaymentServiceDTO.buylistPaymentServiceIsActive;
        existingBuylistPaymentService.buylistPaymentServiceUpdateDate = new Date();
        
        await this.buylistPaymentServiceRepository.save(existingBuylistPaymentService);

        let buylistPaymentServiceDTO = this.getBuylistPaymentServiceById(existingBuylistPaymentService.buylistPaymentServiceId);

        return buylistPaymentServiceDTO;
    
    }
    
}