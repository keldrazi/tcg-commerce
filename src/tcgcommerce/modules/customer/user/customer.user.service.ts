import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUser } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/customer.user.entity';
import { CreateCustomerUserDTO, UpdateCustomerUserDTO, CustomerUserDTO } from './dto/customer.user.dto';
import * as bcrypt from 'bcrypt';
import { CustomerUserVerificationService } from 'src/tcgcommerce/modules/customer/user/verification/customer.user.verification.service';


@Injectable()
export class CustomerUserService {

    constructor(
        @InjectRepository(CustomerUser) private customerUserRepository: Repository<CustomerUser>,
        private customerUserVerificationService: CustomerUserVerificationService,
    ) { }

    async getCustomerUserById(customerUserId: string): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId
            } 
        });

        let customerUserDTO:CustomerUserDTO = ({ ...customerUser });

        return customerUserDTO;
        
    }

    async getCustomerUsersByCommerceAccountId(commerceAccountId: string): Promise<CustomerUserDTO[]> {
        
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

    async createCustomerUser(createCustomerUserDTO: CreateCustomerUserDTO): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOne({ 
            where: { 
                commerceAccountId: createCustomerUserDTO.commerceAccountId, 
                customerUserEmail: createCustomerUserDTO.customerUserEmail 
            } 
        });

        if(customerUser != null) {
            throw new ConflictException('Customer user already exists');
        }

        let customerUserPasswordHash = await this.hashPassword(createCustomerUserDTO.customerUserPassword);
        createCustomerUserDTO.customerUserPassword = customerUserPasswordHash;

        customerUser = this.customerUserRepository.create({ ...createCustomerUserDTO });
        customerUser = await this.customerUserRepository.save(customerUser);

        await this.customerUserVerificationService.createCustomerUserVerification(customerUser.commerceAccountId, customerUser.customerUserId, 'CUSTOMER_USER_REGISTRATION');

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async updateCustomerUser(updateCustomerUserDTO: UpdateCustomerUserDTO): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: updateCustomerUserDTO.customerUserId 
            } 
        });

        customerUser.customerUserEmail = updateCustomerUserDTO.customerUserEmail;
        customerUser.customerUserIsActive = updateCustomerUserDTO.customerUserIsActive;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async deleteCustomerUser(customerUserId: string): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });

        customerUser.customerUserIsActive = false;
        customerUser.customerUserUpdateDate = new Date();
        
        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async passwordResetCustomerUser(commerceAccountId: string, customerUserEmail: string): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                commerceAccountId: commerceAccountId,
                customerUserEmail: customerUserEmail 
            } 
        });

        await this.customerUserVerificationService.createCustomerUserVerification(commerceAccountId, customerUser.customerUserId, 'CUSTOMER_USER_PASSWORD_RESET');

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async updateCustomerUserPassword(customerUserId: string, customerUserPassword: string): Promise<CustomerUserDTO> {
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId
            } 
        });

        let customerUserPasswordHash = await this.hashPassword(customerUserPassword);
        customerUser.customerUserPassword = customerUserPasswordHash;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;
    }

    async verifyCustomerUser(commerceAccountId: string, customerUserId: string, customerUserVerificationCode: string): Promise<CustomerUserDTO> {
        let isVerified = await this.customerUserVerificationService.verifyCustomerUserVerification(commerceAccountId, customerUserId, customerUserVerificationCode, 'CUSTOMER_USER_REGISTRATION');

        if(!isVerified) {
            throw new ConflictException('Customer user verification failed');
        }

        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });

        customerUser.customerUserIsVerified = true;
        customerUser.customerUserUpdateDate = new Date();

        customerUser = await this.customerUserRepository.save(customerUser);

        let customerUserDTO = await this.getCustomerUserById(customerUser.customerUserId);

        return customerUserDTO;

    }

    async verifyCustomerUserPassword(commerceAccountId: string, customerUserId: string, customerUserVerificationCode: string, customerUserPassword: string): Promise<CustomerUserDTO> {
        
        let customerUser = await this.customerUserRepository.findOneOrFail({ 
            where: { 
                customerUserId: customerUserId 
            } 
        });
        
        let isVerified = await this.customerUserVerificationService.verifyCustomerUserVerification(commerceAccountId, customerUserId, customerUserVerificationCode, 'CUSTOMER_USER_PASSWORD_RESET');

        if(!isVerified) {
            throw new ConflictException('Customer user verification failed');
        }

        let customerUserDTO = await this.updateCustomerUserPassword(customerUserId, customerUserPassword);
        
        return customerUserDTO;

    }

    async hashPassword(customerUserPassword: string): Promise<string> {
        let customerUserPasswordHash = await bcrypt.hash(customerUserPassword, 10);

        return customerUserPasswordHash;
    }    
}