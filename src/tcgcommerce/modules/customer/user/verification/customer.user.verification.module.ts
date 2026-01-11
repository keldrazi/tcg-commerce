import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerUserVerificationService } from './customer.user.verification.service';
import { CustomerUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/verification/customer.user.verification.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerUserVerification]),
        ErrorMessageModule,
    ],
    controllers: [],
    providers: [CustomerUserVerificationService],
    exports: [CustomerUserVerificationService]
})
export class CustomerUserVerificationModule {}