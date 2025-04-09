import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceCurrentService } from './tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentController } from "./tcgdb.mtg.price.current.controller";
import { TCGdbMTGPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGPlayerMTGPriceModule } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGPriceCurrent } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPriceCurrent]),
        TCGPlayerMTGPriceModule,
        TCGdbMTGCardModule,
        TCGdbMTGPriceHistoryModule,
    ], 
    controllers: [TCGdbMTGPriceCurrentController],
    providers: [TCGdbMTGPriceCurrentService],
    exports: [TCGdbMTGPriceCurrentService],
})

export class TCGdbMTGPriceCurrentModule {}