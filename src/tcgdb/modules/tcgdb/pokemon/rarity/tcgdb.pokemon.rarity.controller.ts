import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonRarityService } from './tcgdb.pokemon.rarity.service';

@Controller('tcgdb/pokemon/rarity')
export class TCGdbPokemonRarityController {
    
    constructor(
        private tcgdbPokemonRarityService: TCGdbPokemonRarityService
    ) {}

    @Get('/all')
    async getTCGdbPokemonRaritys() {
        return this.tcgdbPokemonRarityService.getTCGdbPokemonRarities();
    }

    @Get('/create')
    async createRaritys() {
        return this.tcgdbPokemonRarityService.createTCGdbPokemonRarities();
    }


}