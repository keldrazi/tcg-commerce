import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistStatusDTO, UpdateBuylistStatusDTO, BuylistStatusDTO } from './dto/buylist.status.dto';
import { BuylistStatus } from 'src/typeorm/entities/tcgcommerce/modules/buylist/status/buylist.status.entity';

@Injectable()
export class BuylistStatusService {

    constructor(
        @InjectRepository(BuylistStatus) private buylistStatusRepository: Repository<BuylistStatus>,
    ) { }

    async getBuylistStatusById(buylistStatusId: string): Promise<BuylistStatusDTO> {
        let buylistStatus = await this.buylistStatusRepository.findOneOrFail({ 
            where: { 
                buylistStatusId: buylistStatusId 
            } 
        });
        
        let buylistStatusDTO: BuylistStatusDTO = ({ ...buylistStatus });

        return buylistStatusDTO;
        
    }

    async getBuylistStatuses(): Promise<BuylistStatusDTO[]> {
        let buylistStatuses = await this.buylistStatusRepository.find();
        
        let buylistStatusDTOs: BuylistStatusDTO[] = [];

        if(!buylistStatuses) {
            return buylistStatusDTOs;
        }
        
        for(let i = 0; i < buylistStatuses.length; i++) {
            let buylistStatus = buylistStatuses[i];
            let buylistStatusDTO: BuylistStatusDTO = ({ ...buylistStatus });

            buylistStatusDTOs.push(buylistStatusDTO);
        }

        return buylistStatusDTOs;
    }
    
    async getBuylistStatusByName(buylistStatusName: string): Promise<BuylistStatusDTO> {
        let buylistStatus = await this.buylistStatusRepository.findOneOrFail({ 
            where: { 
                buylistStatusName: buylistStatusName 
            } 
        });
        
        let buylistStatusDTO: BuylistStatusDTO = ({ ...buylistStatus });

        return buylistStatusDTO;
        
    }
    
    async createBuylistStatus(createBuylistStatusDTO: CreateBuylistStatusDTO): Promise<BuylistStatusDTO> {
    
        let buylistStatus = await this.buylistStatusRepository.findOne({ 
            where: { 
                buylistStatusName: createBuylistStatusDTO.buylistStatusName 
            } 
        });

        if (buylistStatus) {
            throw new ConflictException('Buylist status already exists');
        }
        
        buylistStatus = this.buylistStatusRepository.create({ ...createBuylistStatusDTO });
        buylistStatus = await this.buylistStatusRepository.save(buylistStatus);

        let buylistStatusDTO = await this.getBuylistStatusById(buylistStatus.buylistStatusId);
        
        return buylistStatusDTO;
        
    }

    async updateBuylistStatus(updateBuylistStatusDTO: UpdateBuylistStatusDTO): Promise<BuylistStatusDTO> {
                    
        let buylistStatus = await this.buylistStatusRepository.findOneOrFail({ 
            where: { 
                buylistStatusId: updateBuylistStatusDTO.buylistStatusId 
            } 
        });
            
        buylistStatus.buylistStatusName = updateBuylistStatusDTO.buylistStatusName;
        buylistStatus.buylistStatusCode = updateBuylistStatusDTO.buylistStatusCode;
        buylistStatus.buylistStatusIsActive = updateBuylistStatusDTO.buylistStatusIsActive;
        buylistStatus.buylistStatusUpdateDate = new Date();
        
        await this.buylistStatusRepository.save(buylistStatus);

        let buylistStatusDTO = await this.getBuylistStatusById(buylistStatus.buylistStatusId);
        
        return buylistStatusDTO;
    
    }
    
}