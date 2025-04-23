import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGRarityService } from './tcgdb.mtg.rarity.service';
import { TCGdbMTGRarityController } from "./tcgdb.mtg.rarity.controller";
import { TCGPlayerMTGRarityModule } from 'src/tcgdb/modules/tcgplayer/mtg/rarity/tcgplayer.mtg.rarity.module';
import { TCGdbMTGRarity } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/rarity/tcgdb.mtg.rarity.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGRarity]),
        TCGPlayerMTGRarityModule,
    ], 
    controllers: [TCGdbMTGRarityController],
    providers: [TCGdbMTGRarityService],
    exports: [TCGdbMTGRarityService],
})

export class TCGdbMTGRarityModule {}