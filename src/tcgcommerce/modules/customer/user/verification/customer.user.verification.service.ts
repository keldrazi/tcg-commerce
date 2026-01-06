import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/verification/customer.user.verification.entity';
import { CustomerUserVerificationDTO } from './dto/customer.user.verification.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class CustomerUserVerificationService {

    constructor(
        @InjectRepository(CustomerUserVerification) private customerUserVerificationRepository: Repository<CustomerUserVerification>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async createCustomerUserVerification(commerceAccountId: string, customerUserId: string, customerUserVerificationType: string) {

        let customerUserVerificationCode = this.createCustomerUserVerificationCode();
        let customerUserVerificationCodeExpires = new Date();
        customerUserVerificationCodeExpires.setMinutes(customerUserVerificationCodeExpires.getMinutes() + 15);

        const customerUserVerification = this.customerUserVerificationRepository.create({
            commerceAccountId: commerceAccountId,
            customerUserId: customerUserId,
            customerUserVerificationType: customerUserVerificationType,
            customerUserVerificationCode: customerUserVerificationCode,
            customerUserVerificationCodeExpires: customerUserVerificationCodeExpires,
            customerUserVerificationCodeIsValid: true,
        });

        await this.customerUserVerificationRepository.save(customerUserVerification);

        let customerUserVerificationDTO = new CustomerUserVerificationDTO();
        customerUserVerificationDTO.commerceAccountId = customerUserVerification.commerceAccountId;
        customerUserVerificationDTO.customerUserId = customerUserVerification.customerUserId;
        customerUserVerificationDTO.customerUserVerificationId = customerUserVerification.customerUserVerificationId;
        customerUserVerificationDTO.customerUserVerificationCode = customerUserVerification.customerUserVerificationCode;
        customerUserVerificationDTO.customerUserVerificationCodeExpires = customerUserVerification.customerUserVerificationCodeExpires;
        customerUserVerificationDTO.customerUserVerificationCodeIsValid = customerUserVerification.customerUserVerificationCodeIsValid;
        customerUserVerificationDTO.customerUserVerificationCreateDate = customerUserVerification.customerUserVerificationCreateDate;
        customerUserVerificationDTO.customerUserVerificationUpdateDate = customerUserVerification.customerUserVerificationUpdateDate;

        //TO DO: SEND EMAIL WITH VERIFICATION CODE;
        
        return customerUserVerificationDTO;

    }

    async verifyCustomerUserVerification(commerceAccountId: string, customerUserId: string, customerUserVerificationCode: string, customerUserVerificationType: string) {

        let customerUserVerification = await this.customerUserVerificationRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId, 
                customerUserId: customerUserId, 
                customerUserVerificationCode: customerUserVerificationCode, 
                customerUserVerificationType: customerUserVerificationType 
            } 
        });

        let now = new Date();
        if (customerUserVerification == null || customerUserVerification.customerUserVerificationCodeIsValid == false || customerUserVerification.customerUserVerificationCodeExpires < now) {
            return this.errorMessageService.createErrorMessage('CUSTOMER_USER_VERIFICATION_INVALID_OR_EXPIRED', 'Invalid or expired user verification code.');
        }

        customerUserVerification.customerUserVerificationCodeIsValid = false;
        customerUserVerification.customerUserVerificationUpdateDate = new Date();

        await this.customerUserVerificationRepository.save(customerUserVerification);

        return true;
    }

    createCustomerUserVerificationCode(): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let verificationCodePartA = '';
        let verificationCodePartB = '';
        
        for (let i = 0; i < 3; i++) {
            verificationCodePartA += characters.charAt(Math.floor(Math.random() * characters.length));
            verificationCodePartB += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        let customerUserVerificationCode = `${verificationCodePartA} ${verificationCodePartB}`;
        
        return customerUserVerificationCode;
    }

}