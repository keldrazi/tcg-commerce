import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonCardService } from './tcgdb.pokemon.card.service';
import { TCGdbPokemonCardController } from "./tcgdb.pokemon.card.controller";
import { TCGdbPokemonSetModule } from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGPlayerPokemonCardModule } from 'src/tcgdb/modules/tcgplayer/pokemon/card/tcgplayer.pokemon.card.module';
import { PokemonTCGPokemonCardModule } from 'src/tcgdb/modules/pokemontcg/pokemon/card/pokemontcg.pokemon.card.module';
import { TCGdbPokemonCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonCard]),
        TCGdbPokemonSetModule,
        PokemonTCGPokemonCardModule,
        TCGPlayerPokemonCardModule
    ], 
    controllers: [TCGdbPokemonCardController],
    providers: [TCGdbPokemonCardService],
    exports: [TCGdbPokemonCardService],
})

export class TCGdbPokemonCardModule {}