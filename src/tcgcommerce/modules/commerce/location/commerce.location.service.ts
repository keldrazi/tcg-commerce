import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';
import { CreateCommerceLocationDTO, CommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CommerceLocationService {

    constructor(
        @InjectRepository(CommerceLocation) private commerceLocationRepository: Repository<CommerceLocation>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async getCommerceLocation(commerceLocationId: string) {
        let commerceLocation = await this.commerceLocationRepository.findOne({ 
            where: { 
                commerceLocationId : commerceLocationId
            } 
        });

        if (commerceLocation == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_LOCATION_NOT_FOUND', 'Commerce location was not found for commerceLocationId: ' + commerceLocationId);
        }

        let commerceLocationDTO: CommerceLocationDTO = ({ ...commerceLocation });

        return commerceLocationDTO;
        
    }

    async getActiveCommerceLocations(commerceAccountId: string) {
        let commerceLocations = await this.commerceLocationRepository.find({ 
            where: { 
                commerceAccountId : commerceAccountId,
                commerceLocationIsActive: true
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

        let existingCommerceLocation = await this.commerceLocationRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceLocationDTO.commerceAccountId, 
                commerceLocationName : createCommerceLocationDTO.commerceLocationName
            } 
        });

        if(existingCommerceLocation != null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_LOCATION_EXISTS', 'Commerce location with name already exists: ' + createCommerceLocationDTO.commerceLocationName);
        }

        let newCommerceLocation = this.commerceLocationRepository.create({ ...createCommerceLocationDTO });
        newCommerceLocation = await this.commerceLocationRepository.save(newCommerceLocation);

        let commerceLocationDTO = await this.getCommerceLocation(newCommerceLocation.commerceLocationId);

        return commerceLocationDTO;
    }

    async updateCommerceLocation(updateCommerceLocationDTO: UpdateCommerceLocationDTO) {
        let updateCommerceLocation = await this.commerceLocationRepository.findOne({
            where: {
                commerceLocationId: updateCommerceLocationDTO.commerceLocationId
            }
        });

        if(updateCommerceLocation == null) {
            return this.errorMessageService.createErrorMessage('COMMERCE_LOCATION_NOT_FOUND', 'Commerce location was not found for commerceLocationId: ' + updateCommerceLocationDTO.commerceLocationId);
        }
        
        let existingCommerceLocation = await this.commerceLocationRepository.findOne({ 
            where: {
                commerceAccountId : updateCommerceLocationDTO.commerceAccountId, 
                commerceLocationName : updateCommerceLocationDTO.commerceLocationName
            } 
        });

        if(existingCommerceLocation != null && existingCommerceLocation.commerceLocationId !== updateCommerceLocationDTO.commerceLocationId) {
            return this.errorMessageService.createErrorMessage('COMMERCE_LOCATION_EXISTS', 'Commerce location with name already exists: ' + updateCommerceLocationDTO.commerceLocationName);
        }

        updateCommerceLocation.commerceLocationName = updateCommerceLocationDTO.commerceLocationName;
        updateCommerceLocation.commerceLocationAddress = updateCommerceLocationDTO.commerceLocationAddress;
        updateCommerceLocation.commerceLocationCity = updateCommerceLocationDTO.commerceLocationCity;
        updateCommerceLocation.commerceLocationState = updateCommerceLocationDTO.commerceLocationState;
        updateCommerceLocation.commerceLocationZip = updateCommerceLocationDTO.commerceLocationZip;
        updateCommerceLocation.commerceLocationPhoneNumber = updateCommerceLocationDTO.commerceLocationPhoneNumber;
        updateCommerceLocation.commerceLocationIsActive = updateCommerceLocationDTO.commerceLocationIsActive;
        updateCommerceLocation.commerceLocationUpdateDate = new Date();

        updateCommerceLocation = await this.commerceLocationRepository.save(updateCommerceLocation);

        let commerceLocationDTO = await this.getCommerceLocation(updateCommerceLocation.commerceLocationId);
        
        return commerceLocationDTO;
    }
    
}