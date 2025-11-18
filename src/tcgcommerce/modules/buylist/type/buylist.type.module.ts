import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistTypeService } from './buylist.type.service';
import { BuylistTypeController } from './buylist.type.controller';
import { BuylistType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/type/buylist.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistType]),
        ErrorMessageModule
    ],
    controllers: [BuylistTypeController],
    providers: [BuylistTypeService],
    exports: [BuylistTypeService]
})
export class BuylistTypeModule {}
