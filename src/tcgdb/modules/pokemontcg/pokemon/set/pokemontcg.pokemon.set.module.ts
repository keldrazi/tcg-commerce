import { Module } from '@nestjs/common';
import { PokemonTCGPokemonSetController } from './pokemontcg.pokemon.set.controller';
import { PokemonTCGPokemonSetService } from './pokemontcg.pokemon.set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PokemonTCGPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemontcgtcg/pokemon/set/pokemontcg.pokemon.set.entity';
import { PokemonTCGAPISetModule } from 'src/tcgdb/modules/pokemontcg/api/set/pokemontcg.api.set.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([PokemonTCGPokemonSet]),
    HttpModule,
    PokemonTCGAPISetModule,
  ], 
  controllers: [PokemonTCGPokemonSetController],
  providers: [PokemonTCGPokemonSetService],
  exports: [PokemonTCGPokemonSetService],
})
export class PokemonTCGPokemonSetModule {}