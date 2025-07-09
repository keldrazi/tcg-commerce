import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';
import { CreateCommerceLocationDTO, CommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';

@Injectable()
export class CommerceLocationService {

    constructor(
        @InjectRepository(CommerceLocation) private commerceLocationRepository: Repository<CommerceLocation>,
    ) { }

    async getCommerceLocation(commerceLocationId: string) {
        let commerceLocation = await this.commerceLocationRepository.findOne({ 
            where: { 
                commerceLocationId : commerceLocationId
            } 
        });

        if (commerceLocation == null) {
            return null;
        }

        let commerceLocationDTO: CommerceLocationDTO = ({ ...commerceLocation });

        return commerceLocationDTO;
        
    }

    async getCommerceLocations(commerceAccountId: string) {
        let commerceLocations = await this.commerceLocationRepository.find({ 
            where: { 
                commerceAccountId : commerceAccountId
            } 
        });
        
        if (commerceLocations == null) {
            return [];
        }

        let commerceLocationDTOs: CommerceLocationDTO[] = [];

        for(let i = 0; i < commerceLocations.length; i++) {
            let commerceLocation = commerceLocations[i];
            let commerceLocationDTO: CommerceLocationDTO = ({ ...commerceLocation });

            commerceLocationDTOs.push(commerceLocationDTO);
        }
        
        return commerceLocationDTOs;
        
    }

    async createCommerceLocation(createCommerceLocationDTO: CreateCommerceLocationDTO) {

        //TO DO: ADD VALIDATION FOR UNIQUE CONSTRAINTS ON COMMERCE LOCATION NAME;
        let newCommerceLocation = this.commerceLocationRepository.create({ ...createCommerceLocationDTO });
        newCommerceLocation = await this.commerceLocationRepository.save(newCommerceLocation);

        let commerceLocationDTO = await this.getCommerceLocation(newCommerceLocation.commerceLocationId);

        return commerceLocationDTO;
    }

    async updateCommerceLocation(updateCommerceLocationDTO: UpdateCommerceLocationDTO) {
        let commerceLocation = await this.commerceLocationRepository.findOne({
            where: {
                commerceLocationId: updateCommerceLocationDTO.commerceLocationId
            }
        });

        //TO DO: CREATE AN ERROR TO RETURN IF COMNERCE LOCATION IS NULL;
        if(commerceLocation == null) {
            return null;
        }
        //TO DO: ADD VALIDATION FOR UNIQUE CONSTRAINTS ON COMMERCE LOCATION NAME;

        commerceLocation.commerceLocationName = updateCommerceLocationDTO.commerceLocationName;
        commerceLocation.commerceLocationAddress = updateCommerceLocationDTO.commerceLocationAddress;
        commerceLocation.commerceLocationCity = updateCommerceLocationDTO.commerceLocationCity;
        commerceLocation.commerceLocationState = updateCommerceLocationDTO.commerceLocationState;
        commerceLocation.commerceLocationZip = updateCommerceLocationDTO.commerceLocationZip;
        commerceLocation.commerceLocationPhoneNumber = updateCommerceLocationDTO.commerceLocationPhoneNumber;
        commerceLocation.commerceLocationIsActive = updateCommerceLocationDTO.commerceLocationIsActive;
        commerceLocation.commerceLocationUpdateDate = new Date();

        commerceLocation = await this.commerceLocationRepository.save(commerceLocation);

        let commerceLocationDTO = await this.getCommerceLocation(commerceLocation.commerceLocationId);

        return commerceLocationDTO;
    }
    
}