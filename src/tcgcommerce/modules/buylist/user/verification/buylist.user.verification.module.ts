import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistUserVerificationService } from './buylist.user.verification.service';
import { BuylistUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/buylist/user/verification/buylist.user.verification.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistUserVerification]),
        ErrorMessageModule,
    ],
    controllers: [],
    providers: [BuylistUserVerificationService],
    exports: [BuylistUserVerificationService]
})
export class BuylistUserVerificationModule {}