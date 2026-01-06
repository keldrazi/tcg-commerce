import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUser } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/customer.user.entity';
import { CreateCustomerUserDTO, UpdateCustomerUserDTO, CustomerUserDTO } from './dto/customer.user.dto';
import * as bcrypt from 'bcrypt';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { CustomerUserVerificationService } from 'src/tcgcommerce/modules/customer/user/verification/customer.user.verification.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';


@Injectable()
export class CustomerUserService {

    constructor(
        @InjectRepository(CustomerUser) private customerUserRepository: Repository<CustomerUser>,
        private errorMessageService: ErrorMessageService,
        private customerUserVerificationService: CustomerUserVerificationService,
    ) { }

    async getCustomerUserById(customerUserId: string) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: customerUserId
            } 
        });
        
        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        let customerUserDTO:CustomerUserDTO = ({ ...customerUser });

        return customerUserDTO;
        
    }

    async getCustomerUsersByCommerceAccountId(commerceAccountId: string) {
        
        let customerUserDTOs: CustomerUserDTO[] = [];
        
        let customerUsers = await this.customerUserRepository.find({ 
            where: { 
                commerceAccountId: commerceAccountId
            } 
        });

        if (customerUsers == null) {
            return customerUserDTOs;
        }

        for(let i = 0; i < customerUsers.length; i++) {
            let customerUser = customerUsers[i];
            let customerUserDTO:CustomerUserDTO = ({ ...customerUser });

            customerUserDTOs.push(customerUserDTO);
        }

        return customerUserDTOs;

    }

    async createCustomerUser(createCustomerUserDTO: CreateCustomerUserDTO) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                commerceAccountId: createCustomerUserDTO.commerceAccountId, 
                customerUserEmail: createCustomerUserDTO.customerUserEmail 
            } 
        });

        if(customerUser != null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_ALREADY_EXISTS', 'Customer user already exists');
        }

        let customerUserPasswordHash = await this.hashPassword(createCustomerUserDTO.customerUserPassword);
        createCustomerUserDTO.customerUserPassword = customerUserPasswordHash;

        customerUser = this.customerUserRepository.create({ ...createCustomerUserDTO });
        customerUser = await this.customerUserRepository.save(customerUser);

        await this.customerUserVerificationService.createCustomerUserVerification(customerUser.commerceAccountId, customerUser.customerUserId, 'CUSTOMER_USER_REGISTRATION');

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async updateCustomerUser(updateCustomerUserDTO: UpdateCustomerUserDTO) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: updateCustomerUserDTO.customerUserId 
            } 
        });
        
        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_NOT_FOUND', 'Customer user was not found');
        }

        customerUser.customerUserEmail = updateCustomerUserDTO.customerUserEmail;
        customerUser.customerUserIsActive = updateCustomerUserDTO.customerUserIsActive;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async deleteCustomerUser(customerUserId: string) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });

        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_NOT_FOUND', 'Customer user was not found');
        }

        customerUser.customerUserIsActive = false;
        customerUser.customerUserUpdateDate = new Date();
        
        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async passwordResetCustomerUser(commerceAccountId: string, customerUserEmail: string) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId,
                customerUserEmail: customerUserEmail 
            } 
        });

        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_NOT_FOUND', 'Customer user was not found');
        }

        await this.customerUserVerificationService.createCustomerUserVerification(commerceAccountId, customerUser.customerUserId, 'CUSTOMER_USER_PASSWORD_RESET');

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async updateCustomerUserPassword(customerUserId: string, customerUserPassword: string) {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: customerUserId
            } 
        });

        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_USER_NOT_FOUND', 'Customer account user was not found');
        }

        let customerUserPasswordHash = await this.hashPassword(customerUserPassword);
        customerUser.customerUserPassword = customerUserPasswordHash;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async verifyCustomerUser(commerceAccountId: string, customerUserId: string, customerUserVerificationCode: string) {
        let isVerified = await this.customerUserVerificationService.verifyCustomerUserVerification(commerceAccountId, customerUserId, customerUserVerificationCode, 'CUSTOMER_USER_REGISTRATION');

        if(!isVerified || isVerified instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_VERIFICATION_FAILED', 'Customer user verification failed');
        }

        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });

        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_NOT_FOUND', 'Customer user was not found');
        }

        customerUser.customerUserIsVerified = true;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;

    }

    async verifyCustomerUserPassword(commerceAccountId: string, customerUserId: string, customerUserVerificationCode: string, customerUserPassword: string) {
        
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });

        if (customerUser == null) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_NOT_FOUND', 'Customer user was not found');
        }
        
        let isVerified = await this.customerUserVerificationService.verifyCustomerUserVerification(commerceAccountId, customerUserId, customerUserVerificationCode, 'CUSTOMER_USER_PASSWORD_RESET');

        if(!isVerified || isVerified instanceof ErrorMessageDTO) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_VERIFICATION_FAILED', 'Customer user verification failed');
        }

        let customerUserDTO = await this.updateCustomerUserPassword(customerUserId, customerUserPassword);
        
        return customerUserDTO;

    }

    async hashPassword(customerUserPassword: string){
        let customerUserPasswordHash = await bcrypt.hash(customerUserPassword, 10);

        return customerUserPasswordHash;
    }    
}