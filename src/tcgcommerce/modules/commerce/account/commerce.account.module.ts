import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountService } from './commerce.account.service';
import { CommerceAccountController } from './commerce.account.controller';
import { CommerceAccount } from 'src/typeorm/entities/tcgcommerce/modules/commerce/account/commerce.account.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommerceAccount]),
        ErrorMessageModule
    ],
    controllers: [CommerceAccountController],
    providers: [CommerceAccountService],
    exports: [CommerceAccountService]
})
export class CommerceAccountModule {}
