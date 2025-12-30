import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAccountVerification } from 'src/typeorm/entities/tcgcommerce/modules/customer/account/verification/customer.account.verification.entity';
import { CustomerAccountVerificationDTO } from './dto/customer.account.verification.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class CustomerAccountVerificationService {

    constructor(
        @InjectRepository(CustomerAccountVerification) private customerAccountVerificationRepository: Repository<CustomerAccountVerification>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async createCustomerAccountVerification(commerceAccountId: string, customerAccountUserId: string, customerAccountVerificationType: string) {

        let customerAccountVerificationCode = this.createCustomerAccountVerificationCode();
        let customerAccountVerificationCodeExpires = new Date();
        customerAccountVerificationCodeExpires.setMinutes(customerAccountVerificationCodeExpires.getMinutes() + 15);

        const customerAccountVerification = this.customerAccountVerificationRepository.create({
            commerceAccountId: commerceAccountId,
            customerAccountUserId: customerAccountUserId,
            customerAccountVerificationType: customerAccountVerificationType,
            customerAccountVerificationCode: customerAccountVerificationCode,
            customerAccountVerificationCodeExpires: customerAccountVerificationCodeExpires,
            customerAccountVerificationCodeIsValid: true,
        });

        await this.customerAccountVerificationRepository.save(customerAccountVerification);

        let customerAccountVerificationDTO = new CustomerAccountVerificationDTO();
        customerAccountVerificationDTO.commerceAccountId = customerAccountVerification.commerceAccountId;
        customerAccountVerificationDTO.customerAccountUserId = customerAccountVerification.customerAccountUserId;
        customerAccountVerificationDTO.customerAccountVerificationId = customerAccountVerification.customerAccountVerificationId;
        customerAccountVerificationDTO.customerAccountVerificationCode = customerAccountVerification.customerAccountVerificationCode;
        customerAccountVerificationDTO.customerAccountVerificationCodeExpires = customerAccountVerification.customerAccountVerificationCodeExpires;
        customerAccountVerificationDTO.customerAccountVerificationCodeIsValid = customerAccountVerification.customerAccountVerificationCodeIsValid;
        customerAccountVerificationDTO.customerAccountVerificationCreateDate = customerAccountVerification.customerAccountVerificationCreateDate;
        customerAccountVerificationDTO.customerAccountVerificationUpdateDate = customerAccountVerification.customerAccountVerificationUpdateDate;

        //TO DO: SEND EMAIL WITH VERIFICATION CODE;
        
        return customerAccountVerificationDTO;

    }

    async verifyCustomerAccountVerification(commerceAccountId: string, customerAccountUserId: string, customerAccountVerificationCode: string, customerAccountVerificationType: string) {

        let customerAccountVerification = await this.customerAccountVerificationRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId, 
                customerAccountUserId: customerAccountUserId, 
                customerAccountVerificationCode: customerAccountVerificationCode, 
                customerAccountVerificationType: customerAccountVerificationType 
            } 
        });

        let now = new Date();
        if (customerAccountVerification == null || customerAccountVerification.customerAccountVerificationCodeIsValid == false || customerAccountVerification.customerAccountVerificationCodeExpires < now) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_ACCOUNT_VERIFICATION_INVALID_OR_EXPIRED', 'Invalid or expired verification code.');
        }

        customerAccountVerification.customerAccountVerificationCodeIsValid = false;
        customerAccountVerification.customerAccountVerificationUpdateDate = new Date();

        await this.customerAccountVerificationRepository.save(customerAccountVerification);

        return true;
    }

    createCustomerAccountVerificationCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let verificationCodePartA = '';
        let verificationCodePartB = '';
        
        for (let i = 0; i < 3; i++) {
            verificationCodePartA += characters.charAt(Math.floor(Math.random() * characters.length));
            verificationCodePartB += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        let customerAccountVerificationCode = `${verificationCodePartA} ${verificationCodePartB}`;
        
        return customerAccountVerificationCode;
    }

}