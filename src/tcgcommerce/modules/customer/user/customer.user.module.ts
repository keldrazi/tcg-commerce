import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerUserService } from './customer.user.service';
import { CustomerUserController } from './customer.user.controller';
import { CustomerUser } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/customer.user.entity';
import { CustomerUserVerificationModule } from 'src/tcgcommerce/modules/customer/user/verification/customer.user.verification.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerUser]),
        CustomerUserVerificationModule,
    ],
    controllers: [CustomerUserController],
    providers: [CustomerUserService],
    exports: [CustomerUserService]
})
export class CustomerUserModule {}
