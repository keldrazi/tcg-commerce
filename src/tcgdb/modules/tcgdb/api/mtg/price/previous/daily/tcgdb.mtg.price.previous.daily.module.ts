import { Module } from "@nestjs/common";
import { TCGdbMTGPricePreviousDailyService } from './tcgdb.mtg.price.previous.daily.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';

@Module({
    imports: [
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPricePreviousDailyService],
    exports: [TCGdbMTGPricePreviousDailyService],
})

export class TCGdbMTGPricePreviousDailyModule {}