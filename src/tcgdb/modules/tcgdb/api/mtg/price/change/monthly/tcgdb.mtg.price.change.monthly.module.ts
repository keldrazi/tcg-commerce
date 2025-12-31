import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';
import { TCGdbMTGPriceChangeMonthlyService } from './tcgdb.mtg.price.change.monthly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';

@Module({
    imports: [
        TCGdbAPIUtilModule,
        HttpModule,
        ConfigModule,
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPriceChangeMonthlyService],
    exports: [TCGdbMTGPriceChangeMonthlyService],
})

export class TCGdbMTGPriceChangeMonthlyModule {}