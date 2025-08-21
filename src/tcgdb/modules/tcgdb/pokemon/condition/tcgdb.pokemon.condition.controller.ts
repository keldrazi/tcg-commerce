import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonConditionService } from './tcgdb.pokemon.condition.service';

@Controller('tcgdb/pokemon/condition')
export class TCGdbPokemonConditionController {
    
    constructor(
        private tcgdbPokemonConditionService: TCGdbPokemonConditionService
    ) {}

    @Get('/all')
    async getTCGdbPokemonConditions() {
        return this.tcgdbPokemonConditionService.getTCGdbPokemonConditions();
    }

    @Get('/create')
    async createConditions() {
        return this.tcgdbPokemonConditionService.createTCGdbPokemonConditions();
    }


}