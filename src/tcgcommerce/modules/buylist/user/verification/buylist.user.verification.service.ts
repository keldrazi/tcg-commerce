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

    
      
}