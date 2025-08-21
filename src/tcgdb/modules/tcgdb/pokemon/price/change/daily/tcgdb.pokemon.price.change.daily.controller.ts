import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceChangeDailyService } from './tcgdb.pokemon.price.change.daily.service';

@Controller('tcgdb/pokemon/price/change/daily')
export class TCGdbPokemonPriceChangeDailyController {
    
    constructor(
        private tcgdbPokemonPriceChangeDailyService: TCGdbPokemonPriceChangeDailyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbPokemonPriceChangeDailyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbPokemonPriceChangeDailyService.getTCGdbPokemonPriceChangeDailyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbPokemonPriceChangeDailyBySet() {
        return await this.tcgdbPokemonPriceChangeDailyService.createTCGdbPokemonPriceChangeDailyBySet();
    }


}