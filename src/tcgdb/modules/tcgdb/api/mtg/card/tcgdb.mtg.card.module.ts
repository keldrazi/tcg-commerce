import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGCardService } from './tcgdb.mtg.card.service';
import { TCGdbMTGCardController } from "./tcgdb.mtg.card.controller";
import { TCGdbMTGSetModule } from 'src/tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { TCGPlayerMTGCardModule } from 'src/tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.module';
import { ScryfallMTGCardModule } from 'src/tcgdb/modules/scryfall/mtg/card/scryfall.mtg.card.module';
import { TCGdbMTGCard } from "src/typeorm/entities/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGCard]),
        TCGdbMTGSetModule,
        ScryfallMTGCardModule,
        TCGPlayerMTGCardModule
    ], 
    controllers: [TCGdbMTGCardController],
    providers: [TCGdbMTGCardService],
    exports: [TCGdbMTGCardService],
})

export class TCGdbMTGCardModule {}