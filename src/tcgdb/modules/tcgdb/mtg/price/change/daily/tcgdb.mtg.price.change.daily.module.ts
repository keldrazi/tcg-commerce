import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceChangeDailyController } from './tcgdb.mtg.price.change.daily.controller';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceChangeDaily } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceChangeDaily]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGCardModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPriceChangeDailyController],
    providers: [TCGdbMTGPriceChangeDailyService],
    exports: [TCGdbMTGPriceChangeDailyService],
})

export class TCGdbMTGPriceChangeDailyModule {}