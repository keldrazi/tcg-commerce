import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonPrintingService } from './tcgdb.pokemon.printing.service';

@Controller('tcgdb/pokemon/printing')
export class TCGdbPokemonPrintingController {
    
    constructor(
        private tcgdbPokemonPrintingService: TCGdbPokemonPrintingService
    ) {}

    @Get('/all')
    async getTCGdbPokemonPrintings() {
        return this.tcgdbPokemonPrintingService.getTCGdbPokemonPrintings();
    }

    @Get('/create')
    async createPrintings() {
        return this.tcgdbPokemonPrintingService.createTCGdbPokemonPrintings();
    }


}