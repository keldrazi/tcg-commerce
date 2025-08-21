import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceChangeYearlyService } from './tcgdb.pokemon.price.change.yearly.service';

@Controller('tcgdb/pokemon/price/change/yearly')
export class TCGdbPokemonPriceChangeYearlyController {
    
    constructor(
        private tcgdbPokemonPriceChangeYearlyService: TCGdbPokemonPriceChangeYearlyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbPokemonPriceChangeYearlyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbPokemonPriceChangeYearlyService.getTCGdbPokemonPriceChangeYearlyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbPokemonPriceChangeYearlyBySet() {
        return await this.tcgdbPokemonPriceChangeYearlyService.createTCGdbPokemonPriceChangeYearlyBySet();
    }


}