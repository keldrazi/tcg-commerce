import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistUserService } from './buylist.user.service';
import { BuylistUserController } from './buylist.user.controller';
import { BuylistUser } from 'src/typeorm/entities/tcgcommerce/modules/buylist/user/buylist.user.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistUser]),
        ErrorMessageModule,
    ],
    controllers: [BuylistUserController],
    providers: [BuylistUserService],
    exports: [BuylistUserService]
})
export class BuylistUserModule {}
