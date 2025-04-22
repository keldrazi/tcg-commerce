import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonPrintingService } from './tcgplayer.pokemon.printing.service';

@Controller('tcgdb/tcgplayer/pokemon/printing')
export class TCGPlayerPokemonPrintingController {
    
    constructor(
        private tcgPlayerPokemonPrintingService: TCGPlayerPokemonPrintingService
    ) {}

    @Get('/create')
    async createPrintings() {
        return this.tcgPlayerPokemonPrintingService.createTCGPlayerPokemonPrintings();
    }
}