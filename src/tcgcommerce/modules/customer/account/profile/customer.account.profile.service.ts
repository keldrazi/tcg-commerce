import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAccountProfile } from 'src/typeorm/entities/tcgcommerce/modules/customer/account/profile/customer.account.profile.entity';
import { CreateCustomerAccountProfileDTO, UpdateCustomerAccountProfileDTO, CustomerAccountProfileDTO } from './dto/customer.account.profile.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { CustomerAccountVerificationService } from 'src/tcgcommerce/modules/customer/account/verification/customer.account.verification.service';


@Injectable()
export class CustomerAccountProfileService {

    constructor(
        @InjectRepository(CustomerAccountProfile) private customerAccountProfileRepository: Repository<CustomerAccountProfile>,
        private errorMessageService: ErrorMessageService,
        private customerAccountVerificationService: CustomerAccountVerificationService,
    ) { }

    async getCustomerAccountProfileById(customerAccountProfileId: string) {
        let customerAccountProfile = await this.customerAccountProfileRepository.findOne({ 
            where: { 
                customerAccountProfileId: customerAccountProfileId
            } 
        });
        
        if (customerAccountProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_PROFILE_NOT_FOUND', 'Customer account profile was not found');
        }

        let customerAccountProfileDTO:CustomerAccountProfileDTO = ({ ...customerAccountProfile });

        return customerAccountProfileDTO;
        
    }

    async getCustomerAccountProfilesByCommerceAccountId(commerceAccountId: string) {
        
        let customerAccountProfileDTOs: CustomerAccountProfileDTO[] = [];
        
        let customerAccountProfiles = await this.customerAccountProfileRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId
            } 
        });

        if (customerAccountProfiles == null) {
            return customerAccountProfileDTOs;
        }

        for(let i = 0; i < customerAccountProfiles.length; i++) {
            let customerAccountProfile = customerAccountProfiles[i];
            let customerAccountProfileDTO:CustomerAccountProfileDTO = ({ ...customerAccountProfile });

            customerAccountProfileDTOs.push(customerAccountProfileDTO);
        }

        return customerAccountProfileDTOs;

    }

    async getCustomerAccountProfileByCustomerAccountUserId(customerAccountUserId: string) {
        let customerAccountProfile = await this.customerAccountProfileRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUserId
            } 
        });
        
        if (customerAccountProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_PROFILE_NOT_FOUND', 'Customer account profile was not found');
        }

        let customerAccountProfileDTO:CustomerAccountProfileDTO = ({ ...customerAccountProfile });

        return customerAccountProfileDTO;
        
    }

    async createCustomerAccountProfile(customerAccountProfile: CreateCustomerAccountProfileDTO) {
        let checkCustomerAccountProfile = await this.customerAccountProfileRepository.findOne({ 
            where: { 
                commerceAccountId: customerAccountProfile.commerceAccountId, 
                customerAccountUserId: customerAccountProfile.customerAccountUserId 
            } 
        });

        if(checkCustomerAccountProfile != null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_PROFILE_ALREADY_EXISTS', 'Customer account profile already exists');
        }

        let newCustomerAccountProfile = this.customerAccountProfileRepository.create({ ...customerAccountProfile });
        newCustomerAccountProfile = await this.customerAccountProfileRepository.save(newCustomerAccountProfile);

        let customerAccountProfileDTO = await this.getCustomerAccountProfileById(newCustomerAccountProfile.customerAccountProfileId);

        return customerAccountProfileDTO;
    }

    async updateCustomerAccountProfile(customerAccountProfile: UpdateCustomerAccountProfileDTO) {
        let updateCustomerAccountProfile = await this.customerAccountProfileRepository.findOne({ 
            where: { 
                customerAccountProfileId: customerAccountProfile.customerAccountProfileId 
            } 
        });
        
        if (updateCustomerAccountProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_PROFILE_NOT_FOUND', 'Customer account profile was not found');
        }

        updateCustomerAccountProfile = { ...updateCustomerAccountProfile, ...customerAccountProfile };
        updateCustomerAccountProfile.customerAccountProfileUpdateDate = new Date();

        updateCustomerAccountProfile = await this.customerAccountProfileRepository.save(updateCustomerAccountProfile);

        let customerAccountProfileDTO = await this.getCustomerAccountProfileById(updateCustomerAccountProfile.customerAccountProfileId);

        return customerAccountProfileDTO;
    }

    async deleteCustomerAccountProfile(customerAccountProfileId: string) {
        let customerAccountProfile = await this.customerAccountProfileRepository.findOne({ 
            where: { 
                customerAccountProfileId: customerAccountProfileId
            } 
        });

        if (customerAccountProfile == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_PROFILE_NOT_FOUND', 'Customer account profile was not found');
        }

        customerAccountProfile.customerAccountProfileIsActive = false;
        customerAccountProfile.customerAccountProfileUpdateDate = new Date();
        
        customerAccountProfile = await this.customerAccountProfileRepository.save(customerAccountProfile);

        let customerAccountProfileDTO = await this.getCustomerAccountProfileById(customerAccountProfile.customerAccountProfileId);

        return customerAccountProfileDTO;
    }   
}