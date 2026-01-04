import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistLocationDTO, UpdateBuylistLocationDTO, BuylistLocationDTO } from './dto/buylist.location.dto';
import { BuylistLocation } from 'src/typeorm/entities/tcgcommerce/modules/buylist/location/buylist.location.entity';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class BuylistLocationService {

    constructor(
        @InjectRepository(BuylistLocation) private buylistLocationRepository: Repository<BuylistLocation>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getBuylistLocationById(buylistLocationId: string) {
        let buylistLocation = await this.buylistLocationRepository.findOne({ 
            where: { 
                buylistLocationId: buylistLocationId 
            } 
        });
        
        if (buylistLocation == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_LOCATION_NOT_FOUND', 'Buylist location was not found');
        }

        let buylistLocationDTO: BuylistLocationDTO = ({ ...buylistLocation });

        return buylistLocationDTO;
        
    }

    async getBuylistLocationsByCommerceAccountId(commerceAccountId: string) {
        let buylistLocations = await this.buylistLocationRepository.find({
            where: {
                commerceAccountId: commerceAccountId
            }
        });
        
        let buylistLocationDTOs: BuylistLocationDTO[] = [];

        if(buylistLocations == null) {
            return buylistLocationDTOs;
        }
        
        for(let i = 0; i < buylistLocations.length; i++) {
            let buylistLocation = buylistLocations[i];
            let buylistLocationDTO: BuylistLocationDTO = ({ ...buylistLocation });

            buylistLocationDTOs.push(buylistLocationDTO);
        }

        return buylistLocationDTOs;
    }
    
    async getBuylistLocationByName(name: string) {
        let buylistLocation = await this.buylistLocationRepository.findOne({ 
            where: { 
                buylistLocationName: name 
            } 
        });
        
        if (buylistLocation == null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_LOCATION_NOT_FOUND', 'Buylist location was not found');
        }

        let buylistLocationDTO: BuylistLocationDTO = ({ ...buylistLocation });

        return buylistLocationDTO;
        
    }
    
    async createBuylistLocation(createBuylistLocationDTO: CreateBuylistLocationDTO) {
    
        //CHECK TO SEE IF THE BUYLIST LOCATION ALREADY EXISTS;
        let buylistLocation = await this.buylistLocationRepository.findOne({ 
            where: { 
                buylistLocationName: createBuylistLocationDTO.buylistLocationName 
            } 
        });
        
        if (buylistLocation != null) {
            return this.errorMessageService.createErrorMessage('BUYLIST_LOCATION_EXISTS', 'Buylist location with name already exists');
        }
        
        buylistLocation = this.buylistLocationRepository.create({ ...createBuylistLocationDTO });
        buylistLocation = await this.buylistLocationRepository.save(buylistLocation);

        let buylistLocationDTO = await this.getBuylistLocationById(buylistLocation.buylistLocationId);
        
        return buylistLocationDTO;
        
    }

    async updateBuylistLocation(updateBuylistLocationDTO: UpdateBuylistLocationDTO) {
                    
        let buylistLocation = await this.buylistLocationRepository.findOne({ 
            where: { 
                buylistLocationId: updateBuylistLocationDTO.buylistLocationId 
            } 
        });    
        
        if (!buylistLocation) {
            return this.errorMessageService.createErrorMessage('BUYLIST_LOCATION_NOT_FOUND', 'Buylist location was not found');
        }

        buylistLocation.buylistLocationName = updateBuylistLocationDTO.buylistLocationName;
        buylistLocation.buylistLocationCode = updateBuylistLocationDTO.buylistLocationCode;
        buylistLocation.buylistLocationIsActive = updateBuylistLocationDTO.buylistLocationIsActive;
        buylistLocation.buylistLocationUpdateDate = new Date();
        
        await this.buylistLocationRepository.save(buylistLocation);

        let buylistLocationDTO = await this.getBuylistLocationById(buylistLocation.buylistLocationId);

        return buylistLocationDTO;
    
    }
    
}