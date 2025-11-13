import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuylistLocationDTO, UpdateBuylistLocationDTO, BuylistLocationDTO } from './dto/buylist.location.dto';
import { BuylistLocation } from 'src/typeorm/entities/tcgcommerce/modules/buylist/location/buylist.location.entity';

@Injectable()
export class BuylistLocationService {

    constructor(
        @InjectRepository(BuylistLocation) private buylistLocationRepository: Repository<BuylistLocation>,
    ) { }

    async getBuylistLocationById(buylistLocationId: string) {
        let buylistLocation = await this.buylistLocationRepository.findOne({ 
            where: { 
                buylistLocationId: buylistLocationId 
            } 
        });
        
        if (buylistLocation == null) {
            return null;
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
        
        //TO DO: CREATE AN ERROR TO RETURN;
        if(buylistLocations == null) {
            return null;
        }
        
        let buylistLocationDTOs: BuylistLocationDTO[] = [];

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
            return null;
        }

        let buylistLocationDTO: BuylistLocationDTO = ({ ...buylistLocation });

        return buylistLocationDTO;
        
    }
    
    async createBuylistLocation(createBuylistLocationDTO: CreateBuylistLocationDTO) {
    
        //CHECK TO SEE IF THE BUYLIST LOCATION ALREADY EXISTS;
        let buylistLocation = await this.getBuylistLocationByName(createBuylistLocationDTO.buylistLocationName);
        
        //TO DO: RETURN AN ERROR FOR DUPLICATE BUYLIST LOCATION;
        if (buylistLocation != null) {
            return null;
        }
        
        let newBuylistLocation = this.buylistLocationRepository.create({ ...createBuylistLocationDTO });
        newBuylistLocation = await this.buylistLocationRepository.save(newBuylistLocation);

        let buylistLocationDTO = this.getBuylistLocationById(newBuylistLocation.buylistLocationId);
        
        return buylistLocationDTO;
        
    }

    async updateBuylistLocation(updateBuylistLocationDTO: UpdateBuylistLocationDTO) {
                    
        let existingBuylistLocation = await this.getBuylistLocationById(updateBuylistLocationDTO.buylistLocationId);
            
        //TO DO: RETURN AN ERROR IF BUYLIST LOCATION NOT FOUND;
        if (!existingBuylistLocation) {
            return null; 
        }

        existingBuylistLocation.buylistLocationName = updateBuylistLocationDTO.buylistLocationName;
        existingBuylistLocation.buylistLocationCode = updateBuylistLocationDTO.buylistLocationCode;
        existingBuylistLocation.buylistLocationIsActive = updateBuylistLocationDTO.buylistLocationIsActive;
        existingBuylistLocation.buylistLocationUpdateDate = new Date();
        
        await this.buylistLocationRepository.save(existingBuylistLocation);

        let buylistLocationDTO = this.getBuylistLocationById(existingBuylistLocation.buylistLocationId);

        return buylistLocationDTO;
    
    }
    
}