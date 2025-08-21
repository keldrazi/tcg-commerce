import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonRarityService } from './tcgdb.pokemon.rarity.service';
import { TCGdbPokemonRarityController } from "./tcgdb.pokemon.rarity.controller";
import { TCGPlayerPokemonRarityModule } from 'src/tcgdb/modules/tcgplayer/pokemon/rarity/tcgplayer.pokemon.rarity.module';
import { TCGdbPokemonRarity } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/rarity/tcgdb.pokemon.rarity.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonRarity]),
        TCGPlayerPokemonRarityModule,
    ], 
    controllers: [TCGdbPokemonRarityController],
    providers: [TCGdbPokemonRarityService],
    exports: [TCGdbPokemonRarityService],
})

export class TCGdbPokemonRarityModule {}