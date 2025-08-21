import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPriceChangeWeeklyService } from './tcgdb.pokemon.price.change.weekly.service';

@Controller('tcgdb/pokemon/price/change/weekly')
export class TCGdbPokemonPriceChangeWeeklyController {
    
    constructor(
        private tcgdbPokemonPriceChangeWeeklyService: TCGdbPokemonPriceChangeWeeklyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbPokemonPriceChangeWeeklyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbPokemonPriceChangeWeeklyService.getTCGdbPokemonPriceChangeWeeklyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbPokemonPriceChangeWeeklyBySet() {
        return await this.tcgdbPokemonPriceChangeWeeklyService.createTCGdbPokemonPriceChangeWeeklyBySet();
    }


}