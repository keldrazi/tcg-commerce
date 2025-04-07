import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonSetService } from './tcgplayer.pokemon.set.service';

@Controller('tcgdb/tcgplayer/pokemon/set')
export class TCGPlayerPokemonSetController {
    
    constructor(
        private tcgPlayerPokemonSetService: TCGPlayerPokemonSetService
    ) {}

    @Get('/create')
    async createSets() {
        return this.tcgPlayerPokemonSetService.createTCGPlayerPokemonSets();
    }

}