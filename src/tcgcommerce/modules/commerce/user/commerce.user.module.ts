import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceUserService } from './commerce.user.service';
import { CommerceUserController } from './commerce.user.controller';
import { CommerceUser } from 'src/typeorm/entities/tcgcommerce/modules/commerce/user/commerce.user.entity';
import { CommerceUserVerificationModule } from './verification/commerce.user.verification.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceUser]),
        CommerceUserVerificationModule,
        ErrorMessageModule
    ],
    controllers: [CommerceUserController],
    providers: [CommerceUserService],
    exports: [CommerceUserService]
})
export class CommerceUserModule {}
