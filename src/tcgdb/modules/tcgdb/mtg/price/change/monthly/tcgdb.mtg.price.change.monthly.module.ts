import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceChangeWeeklyController } from './tcgdb.mtg.price.change.monthly.controller';
import { TCGdbMTGPriceChangeWeeklyService } from './tcgdb.mtg.price.change.monthly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceChangeWeekly } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/weekly/tcgdb.mtg.price.change.weekly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceChangeWeekly]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPriceChangeWeeklyController],
    providers: [TCGdbMTGPriceChangeWeeklyService],
    exports: [TCGdbMTGPriceChangeWeeklyService],
})

export class TCGdbMTGPriceChangeWeeklyModule {}