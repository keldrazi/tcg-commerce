import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUserProfile } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/profile/customer.user.profile.entity';
import { CreateCustomerUserProfileDTO, UpdateCustomerUserProfileDTO, CustomerUserProfileDTO } from './dto/customer.user.profile.dto';

@Injectable()
export class CustomerUserProfileService {

    constructor(
        @InjectRepository(CustomerUserProfile) private customerUserProfileRepository: Repository<CustomerUserProfile>,
    ) { }

    async getCustomerUserProfileById(customerUserProfileId: string): Promise<CustomerUserProfileDTO> {
        let customerUserProfile = await this.customerUserProfileRepository.findOneOrFail({ 
            where: { 
                customerUserProfileId: customerUserProfileId
            } 
        });

        let customerUserProfileDTO:CustomerUserProfileDTO = ({ ...customerUserProfile });

        return customerUserProfileDTO;
        
    }

    async getCustomerUserProfilesByCommerceAccountId(commerceAccountId: string): Promise<CustomerUserProfileDTO[]> {
        
        let customerUserProfileDTOs: CustomerUserProfileDTO[] = [];
        
        let customerUserProfiles = await this.customerUserProfileRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId
            } 
        });

        if (customerUserProfiles == null) {
            return customerUserProfileDTOs;
        }

        for(let i = 0; i < customerUserProfiles.length; i++) {
            let customerUserProfile = customerUserProfiles[i];
            let customerUserProfileDTO:CustomerUserProfileDTO = ({ ...customerUserProfile });

            customerUserProfileDTOs.push(customerUserProfileDTO);
        }

        return customerUserProfileDTOs;

    }

    async getCustomerUserProfileByCustomerUserId(customerUserId: string): Promise<CustomerUserProfileDTO> {
        let customerUserProfile = await this.customerUserProfileRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId
            } 
        });

        let customerUserProfileDTO:CustomerUserProfileDTO = ({ ...customerUserProfile });

        return customerUserProfileDTO;
        
    }

    async createCustomerUserProfile(createCustomerUserProfileDTO: CreateCustomerUserProfileDTO): Promise<CustomerUserProfileDTO> {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                commerceAccountId: createCustomerUserProfileDTO.commerceAccountId, 
                customerUserId: createCustomerUserProfileDTO.customerUserId 
            } 
        });

        if(customerUserProfile != null) {
            throw new ConflictException('Customer user profile already exists');
        }

        customerUserProfile = this.customerUserProfileRepository.create({ ...createCustomerUserProfileDTO });
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }

    async updateCustomerUserProfile(updateCustomerUserProfileDTO: UpdateCustomerUserProfileDTO): Promise<CustomerUserProfileDTO> {
        let customerUserProfile = await this.customerUserProfileRepository.findOneOrFail({ 
            where: { 
                customerUserProfileId: updateCustomerUserProfileDTO.customerUserProfileId 
            } 
        });

        customerUserProfile = { ...updateCustomerUserProfileDTO, ...customerUserProfile };
        customerUserProfile.customerUserProfileUpdateDate = new Date();
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }

    async deleteCustomerUserProfile(customerUserProfileId: string): Promise<CustomerUserProfileDTO> {
        let customerUserProfile = await this.customerUserProfileRepository.findOneOrFail({ 
            where: { 
                customerUserProfileId: customerUserProfileId
            } 
        });

        customerUserProfile.customerUserProfileIsActive = false;
        customerUserProfile.customerUserProfileUpdateDate = new Date();
        
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }   
}