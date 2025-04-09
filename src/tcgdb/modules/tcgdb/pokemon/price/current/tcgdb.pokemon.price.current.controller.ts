import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceCurrentService } from './tcgdb.pokemon.price.current.service';

@Controller('tcgdb/pokemon/current/price')
export class TCGdbPokemonPriceCurrentController {
    
    constructor(
        private tcgdbPokemonPriceCurrentService: TCGdbPokemonPriceCurrentService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbPokemonPriceService.getTCGdbPokemonPricesByTCGPlayerId(tcgPlayerId);
    }
    */
}