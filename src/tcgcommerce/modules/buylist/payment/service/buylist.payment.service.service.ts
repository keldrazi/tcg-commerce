import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistPaymentServiceDTO, UpdateBuylistPaymentServiceDTO, BuylistPaymentServiceDTO } from './dto/buylist.payment.service.dto';
import { BuylistPaymentService } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/service/buylist.payment.service.entity';

@Injectable()
export class BuylistPaymentServiceService {

    constructor(
        @InjectRepository(BuylistPaymentService) private buylistPaymentServiceRepository: Repository<BuylistPaymentService>,
    ) { }

    async getBuylistPaymentServiceById(buylistPaymentServiceId: string): Promise<BuylistPaymentServiceDTO> {
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceId: buylistPaymentServiceId 
            } 
        });
        
        if (buylistPaymentService == null) {
            throw new NotFoundException('Buylist payment service was not found');
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }

    async getBuylistPaymentServices(): Promise<BuylistPaymentServiceDTO[]> {
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
    
    async getBuylistPaymentServiceByName(name: string): Promise<BuylistPaymentServiceDTO> {
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceName: name 
            } 
        });
        
        if (buylistPaymentService == null) {
            throw new NotFoundException('Buylist payment service was not found');
        }

        let buylistPaymentServiceDTO: BuylistPaymentServiceDTO = ({ ...buylistPaymentService });

        return buylistPaymentServiceDTO;
        
    }
    
    async createBuylistPaymentService(createBuylistPaymentServiceDTO: CreateBuylistPaymentServiceDTO): Promise<BuylistPaymentServiceDTO> {
    
        //CHECK TO SEE IF THE BUYLIST TYPE ALREADY EXISTS;
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceName: createBuylistPaymentServiceDTO.buylistPaymentServiceName 
            } 
        });
        
        if (buylistPaymentService != null) {
            throw new ConflictException('Buylist payment service with name already exists');
        }
        
        buylistPaymentService = this.buylistPaymentServiceRepository.create({ ...createBuylistPaymentServiceDTO });
        buylistPaymentService = await this.buylistPaymentServiceRepository.save(buylistPaymentService);

        let buylistPaymentServiceDTO = await this.getBuylistPaymentServiceById(buylistPaymentService.buylistPaymentServiceId);
        
        return buylistPaymentServiceDTO;
        
    }

    async updateBuylistPaymentService(updateBuylistPaymentServiceDTO: UpdateBuylistPaymentServiceDTO): Promise<BuylistPaymentServiceDTO> {
                    
        let buylistPaymentService = await this.buylistPaymentServiceRepository.findOne({ 
            where: { 
                buylistPaymentServiceId: updateBuylistPaymentServiceDTO.buylistPaymentServiceId 
            } 
        });
            
        if (!buylistPaymentService) {
            throw new NotFoundException('Buylist payment service was not found');
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