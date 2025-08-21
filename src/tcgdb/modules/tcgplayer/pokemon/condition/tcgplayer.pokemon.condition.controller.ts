import { Controller, Get } from '@nestjs/common';
import { TCGPlayerPokemonConditionService } from './tcgplayer.pokemon.condition.service';

@Controller('tcgdb/tcgplayer/pokemon/condition')
export class TCGPlayerPokemonConditionController {
    
    constructor(
        private tcgPlayerPokemonConditionService: TCGPlayerPokemonConditionService
    ) {}

    @Get('/create')
    async createConditions() {
        return this.tcgPlayerPokemonConditionService.createTCGPlayerPokemonConditions();
    }
}