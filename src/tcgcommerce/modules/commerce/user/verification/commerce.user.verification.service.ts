import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/verification/commerce.user.verification.entity';
import { CommerceUserVerificationDTO } from './dto/commerce.user.verification.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { create } from 'axios';


@Injectable()
export class CommerceUserVerificationService {

    constructor(
        @InjectRepository(CommerceUserVerification) private commerceUserVerificationRepository: Repository<CommerceUserVerification>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async createCommerceUserVerification(commerceAccountId: string, commerceUserId: string, commerceUserVerificationType: string) {

        let commerceUserVerificationCode = await this.createCommerceUserVerificationCode();
        let commerceUserVerificationCodeExpires = new Date();
        commerceUserVerificationCodeExpires.setMinutes(commerceUserVerificationCodeExpires.getMinutes() + 15);

        const commerceUserVerification = this.commerceUserVerificationRepository.create({
            commerceAccountId: commerceAccountId,
            commerceUserId: commerceUserId,
            commerceUserVerificationType: commerceUserVerificationType,
            commerceUserVerificationCode: commerceUserVerificationCode,
            commerceUserVerificationCodeExpires: commerceUserVerificationCodeExpires,
            commerceUserVerificationCodeIsValid: true,
        });

        await this.commerceUserVerificationRepository.save(commerceUserVerification);

        let commerceUserVerificationDTO = new CommerceUserVerificationDTO();
        commerceUserVerificationDTO.commerceAccountId = commerceUserVerification.commerceAccountId;
        commerceUserVerificationDTO.commerceUserId = commerceUserVerification.commerceUserId;
        commerceUserVerificationDTO.commerceUserVerificationId = commerceUserVerification.commerceUserVerificationId;
        commerceUserVerificationDTO.commerceUserVerificationCode = commerceUserVerification.commerceUserVerificationCode;
        commerceUserVerificationDTO.commerceUserVerificationCodeExpires = commerceUserVerification.commerceUserVerificationCodeExpires;
        commerceUserVerificationDTO.commerceUserVerificationCodeIsValid = commerceUserVerification.commerceUserVerificationCodeIsValid;
        commerceUserVerificationDTO.commerceUserVerificationCreateDate = commerceUserVerification.commerceUserVerificationCreateDate;
        commerceUserVerificationDTO.commerceUserVerificationUpdateDate = commerceUserVerification.commerceUserVerificationUpdateDate;

        //TO DO: SEND EMAIL WITH VERIFICATION CODE;
        
        return commerceUserVerificationDTO;

    }

    async verifyCommerceUserVerification(commerceAccountId: string, commerceUserId: string, commerceUserVerificationCode: string, commerceUserVerificationType: string) {

        let commerceUserVerification = await this.commerceUserVerificationRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId, 
                commerceUserId: commerceUserId, 
                commerceUserVerificationCode: commerceUserVerificationCode, 
                commerceUserVerificationType: commerceUserVerificationType 
            } 
        });

        let now = new Date();
        if (commerceUserVerification == null || !commerceUserVerification.commerceUserVerificationCodeIsValid || commerceUserVerification.commerceUserVerificationCodeExpires < now) {
            return false;
        }

        commerceUserVerification.commerceUserVerificationCodeIsValid = false;
        commerceUserVerification.commerceUserVerificationUpdateDate = new Date();

        await this.commerceUserVerificationRepository.save(commerceUserVerification);

        return true;
    }

    async createCommerceUserVerificationCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let verificationCodePartA = '';
        let verificationCodePartB = '';
        
        for (let i = 0; i < 3; i++) {
            verificationCodePartA += characters.charAt(Math.floor(Math.random() * characters.length));
            verificationCodePartB += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        let commerceUserVerificationCode = `${verificationCodePartA} ${verificationCodePartB}`;
        
        return commerceUserVerificationCode;
    }

}