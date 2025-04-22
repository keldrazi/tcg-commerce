import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonLanguageService } from './tcgplayer.pokemon.language.service';

@Controller('tcgdb/tcgplayer/pokemon/language')
export class TCGPlayerPokemonLanguageController {
    
    constructor(
        private tcgPlayerPokemonLanguageService: TCGPlayerPokemonLanguageService
    ) {}

    @Get('/create')
    async createLanguages() {
        return this.tcgPlayerPokemonLanguageService.createTCGPlayerPokemonLanguages();
    }
}