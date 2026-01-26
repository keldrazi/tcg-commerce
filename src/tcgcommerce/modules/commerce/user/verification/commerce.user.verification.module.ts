import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceUserVerificationService } from './commerce.user.verification.service';
import { CommerceUserVerification } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/verification/commerce.user.verification.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceUserVerification]),
    ],
    controllers: [],
    providers: [CommerceUserVerificationService],
    exports: [CommerceUserVerificationService]
})
export class CommerceUserVerificationModule {}