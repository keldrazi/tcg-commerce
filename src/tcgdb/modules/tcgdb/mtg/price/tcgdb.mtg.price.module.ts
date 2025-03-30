import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPriceService } from './tcgdb.mtg.price.service';
import { TCGdbMTGPriceController } from "./tcgdb.mtg.price.controller";
import { TCGPlayerMTGPriceModule } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGPrice } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/price/tcgdb.mtg.price.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPrice]),
        TCGPlayerMTGPriceModule,
        TCGdbMTGCardModule,
    ], 
    controllers: [TCGdbMTGPriceController],
    providers: [TCGdbMTGPriceService],
    exports: [TCGdbMTGPriceService],
})

export class TCGdbMTGPriceModule {}