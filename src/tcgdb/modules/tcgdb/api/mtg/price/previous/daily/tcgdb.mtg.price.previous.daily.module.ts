import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPricePreviousDailyController } from './tcgdb.mtg.price.previous.daily.controller';
import { TCGdbMTGPricePreviousDailyService } from './tcgdb.mtg.price.previous.daily.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPricePreviousDaily } from "src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/price/previous/daily/tcgdb.mtg.price.previous.daily.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPricePreviousDaily]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPricePreviousDailyController],
    providers: [TCGdbMTGPricePreviousDailyService],
    exports: [TCGdbMTGPricePreviousDailyService],
})

export class TCGdbMTGPricePreviousDailyModule {}