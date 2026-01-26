import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerUserVerificationService } from './customer.user.verification.service';
import { CustomerUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/customer/user/verification/customer.user.verification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerUserVerification]),
    ],
    controllers: [],
    providers: [CustomerUserVerificationService],
    exports: [CustomerUserVerificationService]
})
export class CustomerUserVerificationModule {}