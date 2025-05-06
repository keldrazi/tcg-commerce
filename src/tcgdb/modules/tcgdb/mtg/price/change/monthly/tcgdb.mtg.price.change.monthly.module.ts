import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceChangeMonthlyController } from './tcgdb.mtg.price.change.monthly.controller';
import { TCGdbMTGPriceChangeMonthlyService } from './tcgdb.mtg.price.change.monthly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceChangeMonthly } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/change/monthly/tcgdb.mtg.price.change.monthly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceChangeMonthly]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPriceChangeMonthlyController],
    providers: [TCGdbMTGPriceChangeMonthlyService],
    exports: [TCGdbMTGPriceChangeMonthlyService],
})

export class TCGdbMTGPriceChangeMonthlyModule {}