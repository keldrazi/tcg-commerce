import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceLocation } from 'src/typeorm/entities/modules/commerce/location/commerce.location.entity';
import { CreateCommerceLocationDTO, CommerceLocationDTO } from './dto/commerce.location.dto';

@Injectable()
export class CommerceLocationService {

    constructor(
        @InjectRepository(CommerceLocation) private commerceLocationRepository: Repository<CommerceLocation>,
    ) { }

    async getCommerceLocation(commerceLocationId: string) {
        let commerceLocation = await this.commerceLocationRepository.findOne({ where: { commerceLocationId } });
        
        if (!commerceLocation) {
            return null;
        }

        let commerceLocationDTO = new CommerceLocationDTO();
        commerceLocationDTO.commerceLocationId = commerceLocation.commerceLocationId;
        commerceLocationDTO.commerceLocationName = commerceLocation.commerceLocationName;
        commerceLocationDTO.commerceLocationEmail = commerceLocation.commerceLocationEmail;
        commerceLocationDTO.commerceLocationRoles = commerceLocation.commerceLocationRoles;
        commerceLocationDTO.commerceLocationIsActive = commerceLocation.commerceLocationIsActive;
        commerceLocationDTO.commerceLocationCreateDate = commerceLocation.commerceLocationCreateDate;
        commerceLocationDTO.commerceLocationUpdateDate = commerceLocation.commerceLocationUpdateDate;

        return commerceLocationDTO;
        
    }

    async createCommerceLocation(commerceLocation: CreateCommerceLocationDTO) {
        let newCommerceLocation = this.commerceLocationRepository.create({ ...commerceLocation });
        newCommerceLocation = await this.commerceLocationRepository.save(newCommerceLocation);

        let commerceLocationDTO = new CommerceLocationDTO();
        commerceLocationDTO.commerceLocationId = newCommerceLocation.commerceLocationId;
        commerceLocationDTO.commerceLocationName = newCommerceLocation.commerceLocationName;
        commerceLocationDTO.commerceLocationEmail = newCommerceLocation.commerceLocationEmail;
        commerceLocationDTO.commerceLocationRoles = commerceLocation.commerceLocationRoles;
        commerceLocationDTO.commerceLocationIsActive = newCommerceLocation.commerceLocationIsActive;
        commerceLocationDTO.commerceLocationCreateDate = newCommerceLocation.commerceLocationCreateDate;
        commerceLocationDTO.commerceLocationUpdateDate = newCommerceLocation.commerceLocationUpdateDate;

        return commerceLocationDTO;
    }
    
}