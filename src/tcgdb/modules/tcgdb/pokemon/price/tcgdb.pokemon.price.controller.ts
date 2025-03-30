import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceService } from './tcgdb.pokemon.price.service';

@Controller('tcgdb/pokemon/price')
export class TCGdbPokemonPriceController {
    
    constructor(
        private tcgdbPokemonPriceService: TCGdbPokemonPriceService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbPokemonPriceService.getTCGdbPokemonPricesByTCGPlayerId(tcgPlayerId);
    }
    */
}