import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceLocation } from 'src/typeorm/entities/tcgcommerce/modules/commerce/location/commerce.location.entity';
import { CreateCommerceLocationDTO, CommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';

@Injectable()
export class CommerceLocationService {

    constructor(
        @InjectRepository(CommerceLocation) private commerceLocationRepository: Repository<CommerceLocation>,
    ) { }

    async getCommerceLocationById(commerceLocationId: string) {
        let commerceLocation = await this.commerceLocationRepository.findOneOrFail({ 
            where: { 
                commerceLocationId : commerceLocationId
            } 
        });

        let commerceLocationDTO: CommerceLocationDTO = ({ ...commerceLocation });

        return commerceLocationDTO;
        
    }

    async getActiveCommerceLocationsByCommerceAccountId(commerceAccountId: string) {
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

    async getCommerceLocationsByCommerceAccountId(commerceAccountId: string) {
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

        let commerceLocation = await this.commerceLocationRepository.findOne({ 
            where: {
                commerceAccountId : createCommerceLocationDTO.commerceAccountId, 
                commerceLocationName : createCommerceLocationDTO.commerceLocationName
            } 
        });

        if(commerceLocation != null) {
            throw new ConflictException('Commerce location already exists');
        }

        //CHECK FOR DEFAULT LOCATION;
        if(createCommerceLocationDTO.commerceLocationIsDefault) {
            let defaultCommerceLocation = await this.commerceLocationRepository.findOne({ 
                where: {
                    commerceAccountId : createCommerceLocationDTO.commerceAccountId, 
                    commerceLocationIsDefault : true
                } 
            });

            if(defaultCommerceLocation != null) {
                defaultCommerceLocation.commerceLocationIsDefault = false;
                await this.commerceLocationRepository.save(defaultCommerceLocation);
            }
        }

        commerceLocation = this.commerceLocationRepository.create({ ...createCommerceLocationDTO });
        commerceLocation = await this.commerceLocationRepository.save(commerceLocation);

        let commerceLocationDTO = await this.getCommerceLocationById(commerceLocation.commerceLocationId);

        return commerceLocationDTO;
    }

    async updateCommerceLocation(updateCommerceLocationDTO: UpdateCommerceLocationDTO) {
        let commerceLocation = await this.commerceLocationRepository.findOneOrFail({
            where: {
                commerceLocationId: updateCommerceLocationDTO.commerceLocationId
            }
        });

        //CHECK FOR DEFAULT LOCATION;
        if(updateCommerceLocationDTO.commerceLocationIsDefault) {
            let defaultCommerceLocation = await this.commerceLocationRepository.findOne({ 
                where: {
                    commerceAccountId : updateCommerceLocationDTO.commerceAccountId, 
                    commerceLocationIsDefault : true
                } 
            });

            if(defaultCommerceLocation != null) {
                defaultCommerceLocation.commerceLocationIsDefault = false;
                await this.commerceLocationRepository.save(defaultCommerceLocation);
            }
        }

        commerceLocation.commerceLocationName = updateCommerceLocationDTO.commerceLocationName;
        commerceLocation.commerceLocationAddress = updateCommerceLocationDTO.commerceLocationAddress;
        commerceLocation.commerceLocationCity = updateCommerceLocationDTO.commerceLocationCity;
        commerceLocation.commerceLocationState = updateCommerceLocationDTO.commerceLocationState;
        commerceLocation.commerceLocationZip = updateCommerceLocationDTO.commerceLocationZip;
        commerceLocation.commerceLocationPhoneNumber = updateCommerceLocationDTO.commerceLocationPhoneNumber;
        commerceLocation.commerceLocationIsDefault = updateCommerceLocationDTO.commerceLocationIsDefault;
        commerceLocation.commerceLocationIsActive = updateCommerceLocationDTO.commerceLocationIsActive;
        commerceLocation.commerceLocationUpdateDate = new Date();

        commerceLocation = await this.commerceLocationRepository.save(commerceLocation);

        let commerceLocationDTO = await this.getCommerceLocationById(commerceLocation.commerceLocationId);
        
        return commerceLocationDTO;
    }
    
}