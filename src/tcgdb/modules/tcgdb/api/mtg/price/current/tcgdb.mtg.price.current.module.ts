import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGPriceCurrentService } from './tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentController } from "./tcgdb.mtg.price.current.controller";
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGPlayerMTGPriceModule } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        TCGPlayerMTGPriceModule,
        TCGdbMTGCardModule,
        TCGdbMTGPriceHistoryModule,
        TCGdbAPIUtilModule,
        ConfigModule,
    ], 
    controllers: [TCGdbMTGPriceCurrentController],
    providers: [TCGdbMTGPriceCurrentService],
    exports: [TCGdbMTGPriceCurrentService],
})

export class TCGdbMTGPriceCurrentModule {}