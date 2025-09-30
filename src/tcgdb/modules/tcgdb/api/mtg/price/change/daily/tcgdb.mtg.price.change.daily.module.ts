import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceChangeDailyController } from './tcgdb.mtg.price.change.daily.controller';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPricePreviousDailyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/previous/daily/tcgdb.mtg.price.previous.daily.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceChangeDaily } from "src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceChangeDaily]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPricePreviousDailyModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPriceChangeDailyController],
    providers: [TCGdbMTGPriceChangeDailyService],
    exports: [TCGdbMTGPriceChangeDailyService],
})

export class TCGdbMTGPriceChangeDailyModule {}