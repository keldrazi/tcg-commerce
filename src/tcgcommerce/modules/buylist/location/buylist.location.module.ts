import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistLocationService } from './buylist.location.service';
import { BuylistLocationController } from './buylist.location.controller';
import { BuylistLocation } from 'src/typeorm/entities/tcgcommerce/modules/buylist/location/buylist.location.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistLocation]),
        ErrorMessageModule
    ],
    controllers: [BuylistLocationController],
    providers: [BuylistLocationService],
    exports: [BuylistLocationService]
})
export class BuylistLocationModule {}
