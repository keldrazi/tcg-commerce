import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BuylistUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/buylist/user/verification/buylist.user.verification.entity';
import { BuylistUserVerificationDTO } from './dto/buylist.user.verification.dto';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';


@Injectable()
export class BuylistUserVerificationService {

    constructor(
        @InjectRepository(BuylistUserVerification) private buylistUserVerificationRepository: Repository<BuylistUserVerification>,
        private errorMessageService: ErrorMessageService,
    ) { }

    async createBuylistUserVerification(commerceAccountId: string, buylistUserId: string, buylistUserVerificationType: string) {

        let buylistUserVerificationCode = Math.floor(100000 + Math.random() * 900000);
        let buylistUserVerificationCodeExpires = new Date();
        buylistUserVerificationCodeExpires.setMinutes(buylistUserVerificationCodeExpires.getMinutes() + 15);

        const buylistUserVerification = this.buylistUserVerificationRepository.create({
            commerceAccountId: commerceAccountId,
            buylistUserId: buylistUserId,
            buylistUserVerificationType: buylistUserVerificationType,
            buylistUserVerificationCode: buylistUserVerificationCode,
            buylistUserVerificationCodeExpires: buylistUserVerificationCodeExpires,
            buylistUserVerificationCodeIsUsed: false,
        });

        await this.buylistUserVerificationRepository.save(buylistUserVerification);

        let buylistUserVerificationDTO = new BuylistUserVerificationDTO();
        buylistUserVerificationDTO.commerceAccountId = buylistUserVerification.commerceAccountId;
        buylistUserVerificationDTO.buylistUserId = buylistUserVerification.buylistUserId;
        buylistUserVerificationDTO.buylistUserVerificationId = buylistUserVerification.buylistUserVerificationId;
        buylistUserVerificationDTO.buylistUserVerificationCode = buylistUserVerification.buylistUserVerificationCode;
        buylistUserVerificationDTO.buylistUserVerificationCodeExpires = buylistUserVerification.buylistUserVerificationCodeExpires;
        buylistUserVerificationDTO.buylistUserVerificationCodeIsUsed = buylistUserVerification.buylistUserVerificationCodeIsUsed;
        buylistUserVerificationDTO.buylistUserVerificationCreateDate = buylistUserVerification.buylistUserVerificationCreateDate;
        buylistUserVerificationDTO.buylistUserVerificationUpdateDate = buylistUserVerification.buylistUserVerificationUpdateDate;

        //TO DO: SEND EMAIL WITH VERIFICATION CODE;
        
        return buylistUserVerificationDTO;

    }

    async verifyBuylistUserVerification(commerceAccountId: string, buylistUserId: string, buylistUserVerificationCode: number, buylistUserVerificationType: string) {

        let buylistUserVerification = await this.buylistUserVerificationRepository.findOne({ 
            where: { 
                commerceAccountId: commerceAccountId, 
                buylistUserId: buylistUserId, 
                buylistUserVerificationCode: buylistUserVerificationCode, 
                buylistUserVerificationType: buylistUserVerificationType 
            } 
        });

        let now = new Date();
        if (buylistUserVerification == null || buylistUserVerification.buylistUserVerificationCodeIsUsed || buylistUserVerification.buylistUserVerificationCodeExpires < now) {
            return false;
        }

        buylistUserVerification.buylistUserVerificationCodeIsUsed = true;
        buylistUserVerification.buylistUserVerificationUpdateDate = new Date();

        await this.buylistUserVerificationRepository.save(buylistUserVerification);

        return true;
    }

}