import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAccountUser } from 'src/typeorm/entities/tcgcommerce/modules/customer/account/user/customer.account.user.entity';
import { CreateCustomerAccountUserDTO, UpdateCustomerAccountUserDTO, CustomerAccountUserDTO } from './dto/customer.account.user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { CustomerAccountVerificationService } from 'src/tcgcommerce/modules/customer/account/verification/customer.account.verification.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class CustomerAccountUserService {

    constructor(
        @InjectRepository(CustomerAccountUser) private customerAccountUserRepository: Repository<CustomerAccountUser>,
        private errorMessageService: ErrorMessageService,
        private customerAccountVerificationService: CustomerAccountVerificationService,
    ) { }

    async getCustomerAccountUserById(customerAccountUserId: string) {
        let customerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUserId
            } 
        });
        
        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        let customerAccountUserDTO:CustomerAccountUserDTO = ({ ...customerAccountUser });

        return customerAccountUserDTO;
        
    }

    async getCustomerAccountUsersByCommerceAccountId(commerceAccountId: string) {
        
        let customerAccountUserDTOs: CustomerAccountUserDTO[] = [];
        
        let customerAccountUsers = await this.customerAccountUserRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId
            } 
        });

        if (customerAccountUsers == null) {
            return customerAccountUserDTOs;
        }

        for(let i = 0; i < customerAccountUsers.length; i++) {
            let customerAccountUser = customerAccountUsers[i];
            let customerAccountUserDTO:CustomerAccountUserDTO = ({ ...customerAccountUser });

            customerAccountUserDTOs.push(customerAccountUserDTO);
        }

        return customerAccountUserDTOs;

    }

    async createCustomerAccountUser(customerAccountUser: CreateCustomerAccountUserDTO) {
        let checkCustomerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                commerceAccountId: customerAccountUser.commerceAccountId, 
                customerAccountUserEmail: customerAccountUser.customerAccountUserEmail 
            } 
        });

        if(checkCustomerAccountUser != null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_ALREADY_EXISTS', 'Customer account user already exists');
        }

        let customerAccountUserPasswordHash = await this.hashPassword(customerAccountUser.customerAccountUserPassword);
        customerAccountUser.customerAccountUserPassword = customerAccountUserPasswordHash;

        let newCustomerAccountUser = this.customerAccountUserRepository.create({ ...customerAccountUser });
        newCustomerAccountUser = await this.customerAccountUserRepository.save(newCustomerAccountUser);

        await this.customerAccountVerificationService.createCustomerAccountVerification(newCustomerAccountUser.commerceAccountId, newCustomerAccountUser.customerAccountUserId, 'CUSTOMER_ACCOUNT_USER_REGISTRATION');

        let customerAccountUserDTO = await this.getCustomerAccountUserById(newCustomerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;
    }

    async updateCustomerAccountUser(customerAccountUser: UpdateCustomerAccountUserDTO) {
        let updateCustomerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUser.customerAccountUserId 
            } 
        });
        
        if (updateCustomerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        updateCustomerAccountUser.customerAccountUserEmail = customerAccountUser.customerAccountUserEmail;
        updateCustomerAccountUser.customerAccountUserIsActive = customerAccountUser.customerAccountUserIsActive;
        updateCustomerAccountUser.customerAccountUserUpdateDate = new Date();

        updateCustomerAccountUser = await this.customerAccountUserRepository.save(updateCustomerAccountUser);

        let customerAccountUserDTO = await this.getCustomerAccountUserById(updateCustomerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;
    }

    async deleteCustomerAccountUser(customerAccountUserId: string) {
        let customerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUserId 
            } 
        });

        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        customerAccountUser.customerAccountUserIsActive = false;
        customerAccountUser.customerAccountUserUpdateDate = new Date();
        
        customerAccountUser = await this.customerAccountUserRepository.save(customerAccountUser);

        let customerAccountUserDTO = await this.getCustomerAccountUserById(customerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;
    }

    async passwordResetCustomerAccountUser(commerceAccountId: string, customerAccountUserEmail: string) {
        let customerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                commerceAccountId, customerAccountUserEmail 
            } 
        });

        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        await this.customerAccountVerificationService.createCustomerAccountVerification(commerceAccountId, customerAccountUser.customerAccountUserId, 'CUSTOMER_ACCOUNT_USER_PASSWORD_RESET');

        let customerAccountUserDTO = await this.getCustomerAccountUserById(customerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;
    }

    async updateCustomerAccountUserPassword(customerAccountUserId: string, customerAccountUserPassword: string) {
        let customerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUserId
            } 
        });

        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        let customerAccountUserPasswordHash = await this.hashPassword(customerAccountUserPassword);
        customerAccountUser.customerAccountUserPassword = customerAccountUserPasswordHash;
        customerAccountUser.customerAccountUserUpdateDate = new Date();

        customerAccountUser = await this.customerAccountUserRepository.save(customerAccountUser);

        let customerAccountUserDTO = await this.getCustomerAccountUserById(customerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;
    }

    async verifyCustomerAccountUser(commerceAccountId: string, customerAccountUserId: string, customerAccountVerificationCode: string) {
        let isVerified = await this.customerAccountVerificationService.verifyCustomerAccountVerification(commerceAccountId, customerAccountUserId, customerAccountVerificationCode, 'CUSTOMER_ACCOUNT_USER_REGISTRATION');

        if(!isVerified) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_VERIFICATION_FAILED', 'Customer account user verification failed');
        }

        let customerAccountUser = await this.customerAccountUserRepository.findOne({ where: { customerAccountUserId } });

        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        customerAccountUser.customerAccountUserIsVerified = true;
        customerAccountUser.customerAccountUserUpdateDate = new Date();

        customerAccountUser = await this.customerAccountUserRepository.save(customerAccountUser);

        let customerAccountUserDTO = await this.getCustomerAccountUserById(customerAccountUser.customerAccountUserId);

        return customerAccountUserDTO;

    }

    async verifyCustomerAccountUserPassword(commerceAccountId: string, customerAccountUserId: string, customerAccountVerificationCode: string, customerAccountUserPassword: string) {
        
        let customerAccountUser = await this.customerAccountUserRepository.findOne({ 
            where: { 
                customerAccountUserId: customerAccountUserId 
            } 
        });

        if (customerAccountUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }
        
        let isVerified = await this.customerAccountVerificationService.verifyCustomerAccountVerification(commerceAccountId, customerAccountUserId, customerAccountVerificationCode, 'CUSTOMER_ACCOUNT_USER_PASSWORD_RESET');

        if(!isVerified || isVerified instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_VERIFICATION_FAILED', 'Customer account user verification failed');
        }

        
        let customerAccountUserDTO = await this.updateCustomerAccountUserPassword(customerAccountUserId, customerAccountUserPassword);
        
        return customerAccountUserDTO;

    }

    async hashPassword(customerAccountUserPassword: string){
        let customerAccountUserPasswordHash = await bcrypt.hash(customerAccountUserPassword, 10);

        return customerAccountUserPasswordHash;
    }    
}