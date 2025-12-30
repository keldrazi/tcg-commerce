import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerAccountVerificationService } from './customer.account.verification.service';
import { CustomerAccountVerification } from 'src/typeorm/entities/tcgcommerce/modules/customer/account/verification/customer.account.verification.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerAccountVerification]),
        ErrorMessageModule,
    ],
    controllers: [],
    providers: [CustomerAccountVerificationService],
    exports: [CustomerAccountVerificationService]
})
export class CustomerAccountVerificationModule {}