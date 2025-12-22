import { Module } from "@nestjs/common";
import { TCGdbMTGPriceChangeMonthlyService } from './tcgdb.mtg.price.change.monthly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';

@Module({
    imports: [
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPriceChangeMonthlyService],
    exports: [TCGdbMTGPriceChangeMonthlyService],
})

export class TCGdbMTGPriceChangeMonthlyModule {}