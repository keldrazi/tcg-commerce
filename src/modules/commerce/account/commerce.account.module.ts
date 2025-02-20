import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommerceAccountService } from './commerce.account.service';
import { CommerceAccountController } from './commerce.account.controller';

@Module({
    imports: [
        //TypeOrmModule.forFeature([TCGDatabaseUser])
    ],
    controllers: [CommerceAccountController],
    providers: [CommerceAccountService],
    exports: [CommerceAccountService]
})
export class CommerceAccountModule {}
