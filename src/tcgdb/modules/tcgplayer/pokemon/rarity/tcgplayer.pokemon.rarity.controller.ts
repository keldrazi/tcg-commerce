import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonRarityService } from './tcgplayer.pokemon.rarity.service';

@Controller('tcgdb/tcgplayer/pokemon/rarity')
export class TCGPlayerPokemonRarityController {
    
    constructor(
        private tcgPlayerPokemonRarityService: TCGPlayerPokemonRarityService
    ) {}

    @Get('/create')
    async createRaritys() {
        return this.tcgPlayerPokemonRarityService.createTCGPlayerPokemonRarities();
    }
}