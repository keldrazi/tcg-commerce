import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonCardService } from './tcgplayer.pokemon.card.service';

@Controller('tcgdb/tcgplayer/pokemon/card')
export class TCGPlayerPokemonCardController {
    
    constructor(
        private tcgPlayerPokemonCardService: TCGPlayerPokemonCardService
    ) {}

    @Get('/create')
    async createCards() {
        return await this.tcgPlayerPokemonCardService.createTCGPlayerPokemonCards();
    }
    
}