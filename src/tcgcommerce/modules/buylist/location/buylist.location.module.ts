import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistLocationService } from './buylist.location.service';
import { BuylistLocationController } from './buylist.location.controller';
import { BuylistLocation } from 'src/typeorm/entities/tcgcommerce/modules/buylist/location/buylist.location.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistLocation])
    ],
    controllers: [BuylistLocationController],
    providers: [BuylistLocationService],
    exports: [BuylistLocationService]
})
export class BuylistLocationModule {}
