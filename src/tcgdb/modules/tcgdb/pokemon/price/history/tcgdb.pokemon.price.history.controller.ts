import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceHistoryService } from './tcgdb.pokemon.price.history.service';

@Controller('tcgdb/pokemon/current/price')
export class TCGdbPokemonPriceHistoryController {
    
    constructor(
        private tcgdbPokemonPriceHistoryService: TCGdbPokemonPriceHistoryService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbPokemonPriceService.getTCGdbPokemonPricesByTCGPlayerId(tcgPlayerId);
    }
    */
}