import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountTokenService } from './commerce.account.token.service';
import { CommerceAccountTokenController } from './commerce.account.token.controller';
import { CommerceAccountToken } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/token/commerce.account.token.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccountToken]),
        ErrorMessageModule
    ],
    controllers: [CommerceAccountTokenController],
    providers: [CommerceAccountTokenService],
    exports: [CommerceAccountTokenService]
})
export class CommerceAccountTokenModule {}