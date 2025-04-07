import { Controller, Get } from '@nestjs/common';
import { PokemonTCGPokemonSetService } from './pokemontcg.pokemon.set.service';

@Controller('tcgdb/pokemonTCG/pokemon/set')
export class PokemonTCGPokemonSetController {
    constructor(
        private pokemonTCGPokemonSetService: PokemonTCGPokemonSetService,
    ) {}

    @Get('/create')
    createSets() {
        return this.pokemonTCGPokemonSetService.createPokemonTCGPokemonSets();
    }
}