import { Controller, Get, Param } from '@nestjs/common';
import { PokemonTCGPokemonCardService } from './pokemontcg.pokemon.card.service';

@Controller('tcgdb/pokemontcg/pokemon/card')
export class PokemonTCGPokemonCardController {
  constructor(
    private pokemonTCGPokemonCardService: PokemonTCGPokemonCardService
  ) {}

    @Get('/create')
    createCards() {
        return this.pokemonTCGPokemonCardService.createPokemonTCGPokemonCards();
    }

    @Get('/update')
    updateCards() {
        return this.pokemonTCGPokemonCardService.updatePokemonTCGPokemonCards();
    }

}