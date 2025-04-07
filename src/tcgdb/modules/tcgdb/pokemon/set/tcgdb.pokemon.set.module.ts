import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TCGdbPokemonSetService } from './tcgdb.pokemon.set.service';
import { TCGdbPokemonSetController } from './tcgdb.pokemon.set.controller';
import { TCGPlayerPokemonSetModule } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.module';
import { PokemonTCGPokemonSetModule } from 'src/tcgdb/modules/pokemontcg/pokemon/set/pokemontcg.pokemon.set.module';
import { TCGdbPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonSet]),
        PokemonTCGPokemonSetModule,
        TCGPlayerPokemonSetModule,
    ], 
    controllers: [TCGdbPokemonSetController],
    providers: [TCGdbPokemonSetService],
    exports: [TCGdbPokemonSetService],
})

export class TCGdbPokemonSetModule {}