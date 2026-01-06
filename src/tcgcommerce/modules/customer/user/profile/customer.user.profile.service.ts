import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUserProfile } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/profile/customer.user.profile.entity';
import { CreateCustomerUserProfileDTO, UpdateCustomerUserProfileDTO, CustomerUserProfileDTO } from './dto/customer.user.profile.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';

@Injectable()
export class CustomerUserProfileService {

    constructor(
        @InjectRepository(CustomerUserProfile) private customerUserProfileRepository: Repository<CustomerUserProfile>,
        private errorMessageService: ErrorMessageService
    ) { }

    async getCustomerUserProfileById(customerUserProfileId: string) {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                customerUserProfileId: customerUserProfileId
            } 
        });
        
        if (customerUserProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_PROFILE_NOT_FOUND', 'Customer user profile was not found');
        }

        let customerUserProfileDTO:CustomerUserProfileDTO = ({ ...customerUserProfile });

        return customerUserProfileDTO;
        
    }

    async getCustomerUserProfilesByCommerceAccountId(commerceAccountId: string) {
        
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

    async getCustomerUserProfileByCustomerUserId(customerUserId: string) {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                customerUserId: customerUserId
            } 
        });
        
        if (customerUserProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_PROFILE_NOT_FOUND', 'Customer user profile was not found');
        }

        let customerUserProfileDTO:CustomerUserProfileDTO = ({ ...customerUserProfile });

        return customerUserProfileDTO;
        
    }

    async createCustomerUserProfile(createCustomerUserProfileDTO: CreateCustomerUserProfileDTO) {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                commerceAccountId: createCustomerUserProfileDTO.commerceAccountId, 
                customerUserId: createCustomerUserProfileDTO.customerUserId 
            } 
        });

        if(customerUserProfile != null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_PROFILE_ALREADY_EXISTS', 'Customer user profile already exists');
        }

        customerUserProfile = this.customerUserProfileRepository.create({ ...createCustomerUserProfileDTO });
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }

    async updateCustomerUserProfile(updateCustomerUserProfileDTO: UpdateCustomerUserProfileDTO) {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                customerUserProfileId: updateCustomerUserProfileDTO.customerUserProfileId 
            } 
        });
        
        if (customerUserProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_PROFILE_NOT_FOUND', 'Customer user profile was not found');
        }

        customerUserProfile = { ...updateCustomerUserProfileDTO, ...customerUserProfile };
        customerUserProfile.customerUserProfileUpdateDate = new Date();
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }

    async deleteCustomerUserProfile(customerUserProfileId: string) {
        let customerUserProfile = await this.customerUserProfileRepository.findOne({ 
            where: { 
                customerUserProfileId: customerUserProfileId
            } 
        });

        if (customerUserProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_PROFILE_NOT_FOUND', 'Customer user profile was not found');
        }

        customerUserProfile.customerUserProfileIsActive = false;
        customerUserProfile.customerUserProfileUpdateDate = new Date();
        
        customerUserProfile = await this.customerUserProfileRepository.save(customerUserProfile);

        let customerUserProfileDTO = await this.getCustomerUserProfileById(customerUserProfile.customerUserProfileId);

        return customerUserProfileDTO;
    }   
}