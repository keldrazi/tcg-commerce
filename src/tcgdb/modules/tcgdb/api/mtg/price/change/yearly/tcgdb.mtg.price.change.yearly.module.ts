import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceChangeYearlyController } from './tcgdb.mtg.price.change.yearly.controller';
import { TCGdbMTGPriceChangeYearlyService } from './tcgdb.mtg.price.change.yearly.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGSetModule} from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceChangeYearly } from "src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/price/change/yearly/tcgdb.mtg.price.change.yearly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceChangeYearly]),
        TCGdbMTGPriceCurrentModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbMTGSetModule,
    ], 
    controllers: [TCGdbMTGPriceChangeYearlyController],
    providers: [TCGdbMTGPriceChangeYearlyService],
    exports: [TCGdbMTGPriceChangeYearlyService],
})

export class TCGdbMTGPriceChangeYearlyModule {}