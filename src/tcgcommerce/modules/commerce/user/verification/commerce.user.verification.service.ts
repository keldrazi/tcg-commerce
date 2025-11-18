import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommerceUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/verification/commerce.user.verification.entity';
import { CommerceUserVerificationDTO } from './dto/commerce.user.verification.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class CommerceUserVerificationService {

    constructor(
        @InjectRepository(CommerceUserVerification) private commerceUserVerificationRepository: Repository<CommerceUserVerification>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async createCommerceUserVerification(commerceAccountId: string, commerceUserId: string, commerceUserVerificationType: string) {

        let commerceUserVerificationCode = Math.floor(100000 + Math.random() * 900000);
        let commerceUserVerificationCodeExpires = new Date();
        commerceUserVerificationCodeExpires.setMinutes(commerceUserVerificationCodeExpires.getMinutes() + 15);

        const commerceUserVerification = this.commerceUserVerificationRepository.create({
            commerceAccountId: commerceAccountId,
            commerceUserId: commerceUserId,
            commerceUserVerificationType: commerceUserVerificationType,
            commerceUserVerificationCode: commerceUserVerificationCode,
            commerceUserVerificationCodeExpires: commerceUserVerificationCodeExpires,
            commerceUserVerificationCodeIsUsed: false,
        });

        await this.commerceUserVerificationRepository.save(commerceUserVerification);

        let commerceUserVerificationDTO = new CommerceUserVerificationDTO();
        commerceUserVerificationDTO.commerceAccountId = commerceUserVerification.commerceAccountId;
        commerceUserVerificationDTO.commerceUserId = commerceUserVerification.commerceUserId;
        commerceUserVerificationDTO.commerceUserVerificationId = commerceUserVerification.commerceUserVerificationId;
        commerceUserVerificationDTO.commerceUserVerificationCode = commerceUserVerification.commerceUserVerificationCode;
        commerceUserVerificationDTO.commerceUserVerificationCodeExpires = commerceUserVerification.commerceUserVerificationCodeExpires;
        commerceUserVerificationDTO.commerceUserVerificationCodeIsUsed = commerceUserVerification.commerceUserVerificationCodeIsUsed;
        commerceUserVerificationDTO.commerceUserVerificationCreateDate = commerceUserVerification.commerceUserVerificationCreateDate;
        commerceUserVerificationDTO.commerceUserVerificationUpdateDate = commerceUserVerification.commerceUserVerificationUpdateDate;

        //TO DO: SEND EMAIL WITH VERIFICATION CODE;
        
        return commerceUserVerificationDTO;

    }

    async verifyCommerceUserVerification(commerceAccountId: string, commerceUserId: string, commerceUserVerificationCode: number, commerceUserVerificationType: string) {

        let commerceUserVerification = await this.commerceUserVerificationRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId, 
                commerceUserId: commerceUserId, 
                commerceUserVerificationCode: commerceUserVerificationCode, 
                commerceUserVerificationType: commerceUserVerificationType 
            } 
        });

        let now = new Date();
        if (commerceUserVerification == null || commerceUserVerification.commerceUserVerificationCodeIsUsed || commerceUserVerification.commerceUserVerificationCodeExpires < now) {
            return false;
        }

        commerceUserVerification.commerceUserVerificationCodeIsUsed = true;
        commerceUserVerification.commerceUserVerificationUpdateDate = new Date();

        await this.commerceUserVerificationRepository.save(commerceUserVerification);

        return true;
    }

}