import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonPriceService } from './tcgplayer.pokemon.price.service';

@Controller('tcgdb/tcgplayer/pokemon/price')
export class TCGPlayerPokemonPriceController {
    
    constructor(
        private tcgPlayerPokemonPriceService: TCGPlayerPokemonPriceService
    ) {}

    @Get('/create')
    async createPrices() {
        return this.tcgPlayerPokemonPriceService.createTCGPlayerPokemonPrices();
    }
}