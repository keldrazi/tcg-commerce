import { Module } from "@nestjs/common";
import { TCGdbMTGPriceChangeWeeklyService } from './tcgdb.mtg.price.change.weekly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
        TCGdbAPIUtilModule,
        HttpModule,
        ConfigModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPriceChangeWeeklyService],
    exports: [TCGdbMTGPriceChangeWeeklyService],
})

export class TCGdbMTGPriceChangeWeeklyModule {}