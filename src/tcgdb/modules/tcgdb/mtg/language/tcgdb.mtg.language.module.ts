import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGSetService } from './tcgdb.mtg.language.service';
import { TCGdbMTGSetController } from "./tcgdb.mtg.language.controller";
import { TCGPlayerMTGSetModule } from 'src/tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.module';
import { ScryfallMTGSetModule } from "src/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.module";
import { TCGdbMTGSet } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGSet]),
        ScryfallMTGSetModule,
        TCGPlayerMTGSetModule,
    ], 
    controllers: [TCGdbMTGSetController],
    providers: [TCGdbMTGSetService],
    exports: [TCGdbMTGSetService],
})

export class TCGdbMTGSetModule {}