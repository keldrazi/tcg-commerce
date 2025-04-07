import { Module } from '@nestjs/common';
import { PokemonTCGPokemonCardController } from './pokemontcg.pokemon.card.controller';
import { PokemonTCGPokemonCardService } from './pokemontcg.pokemon.card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonTCGPokemonCard } from 'src/typeorm/entities/tcgdb/modules/pokemontcg/pokemon/card/pokemontcg.pokemon.card.entity';
import { PokemonTCGPokemonSetModule } from 'src/tcgdb/modules/pokemontcg/pokemon/set/pokemontcg.pokemon.set.module';
import { PokemonTCGAPICardModule } from 'src/tcgdb/modules/pokemontcg/api/card/pokemontcg.api.card.module';


@Module({
  imports: [
      TypeOrmModule.forFeature([PokemonTCGPokemonCard]),
      PokemonTCGPokemonSetModule,
      PokemonTCGAPICardModule,
  ], 
  controllers: [PokemonTCGPokemonCardController],
  providers: [PokemonTCGPokemonCardService],
  exports: [PokemonTCGPokemonCardService],
})
export class PokemonTCGPokemonCardModule {}