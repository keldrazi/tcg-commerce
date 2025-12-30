import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerAccountUserService } from './customer.account.user.service';
import { CustomerAccountUserController } from './customer.account.user.controller';
import { CustomerAccountUser } from 'src/typeorm/entities/tcgcommerce/modules/customer/account/user/customer.account.user.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';
import { CustomerAccountVerificationModule } from 'src/tcgcommerce/modules/customer/account/verification/customer.account.verification.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerAccountUser]),
        ErrorMessageModule,
        CustomerAccountVerificationModule
    ],
    controllers: [CustomerAccountUserController],
    providers: [CustomerAccountUserService],
    exports: [CustomerAccountUserService]
})
export class CustomerAccountUserModule {}
