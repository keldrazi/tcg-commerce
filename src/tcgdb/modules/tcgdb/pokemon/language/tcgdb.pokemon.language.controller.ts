import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonLanguageService } from './tcgdb.pokemon.language.service';

@Controller('tcgdb/pokemon/language')
export class TCGdbPokemonLanguageController {
    
    constructor(
        private tcgdbPokemonLanguageService: TCGdbPokemonLanguageService
    ) {}

    @Get('/all')
    async getTCGdbPokemonLanguages() {
        return this.tcgdbPokemonLanguageService.getTCGdbPokemonLanguages();
    }

    @Get('/create')
    async createLanguages() {
        return this.tcgdbPokemonLanguageService.createTCGdbPokemonLanguages();
    }


}