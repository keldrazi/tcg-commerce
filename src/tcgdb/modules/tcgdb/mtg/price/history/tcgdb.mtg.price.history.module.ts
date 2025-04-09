import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceHistoryService } from './tcgdb.mtg.price.history.service';
import { TCGdbMTGPriceHistoryController } from "./tcgdb.mtg.price.history.controller";
import { TCGPlayerMTGPriceModule } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGPriceHistory } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceHistory]),
        TCGPlayerMTGPriceModule,
        TCGdbMTGCardModule,
    ], 
    controllers: [TCGdbMTGPriceHistoryController],
    providers: [TCGdbMTGPriceHistoryService],
    exports: [TCGdbMTGPriceHistoryService],
})

export class TCGdbMTGPriceHistoryModule {}