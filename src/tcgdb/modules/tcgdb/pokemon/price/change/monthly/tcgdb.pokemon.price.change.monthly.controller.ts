import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceChangeMonthlyService } from './tcgdb.pokemon.price.change.monthly.service';

@Controller('tcgdb/pokemon/price/change/monthly')
export class TCGdbPokemonPriceChangeMonthlyController {
    
    constructor(
        private tcgdbPokemonPriceChangeMonthlyService: TCGdbPokemonPriceChangeMonthlyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbPokemonPriceChangeMonthlyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbPokemonPriceChangeMonthlyService.getTCGdbPokemonPriceChangeMonthlyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbPokemonPriceChangeMonthlyBySet() {
        return await this.tcgdbPokemonPriceChangeMonthlyService.createTCGdbPokemonPriceChangeMonthlyBySet();
    }


}