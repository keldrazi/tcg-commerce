import { Module } from "@nestjs/common";
import { TCGdbMTGPriceChangeWeeklyService } from './tcgdb.mtg.price.change.weekly.service';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
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