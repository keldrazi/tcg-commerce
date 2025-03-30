import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonSetService } from './tcgdb.pokemon.set.service';

@Controller('tcgdb/pokemon/set')
export class TCGdbPokemonSetController {
    
    constructor(
        private tcgdbPokemonSetService: TCGdbPokemonSetService
    ) {}

    /*
    @Get('/all')
    async getTCGdbPokemonSets() {
        return this.tcgdbPokemonSetService.getTCGdbPokemonSets();
    }

    @Get('/tcgplayer/id/:id')
    async getSetByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbPokemonSetService.getTCGdbPokemonSetByTCGPlayerId(tcgPlayerId);
    }

    @Get('/tcgplayer/abbreviation/:abbreviation')
    async getSetByTCGPlayerSetAbbreviation(@Param('abbreviation') setAbbreviation: string) {
        return this.tcgdbPokemonSetService.getTCGdbPokemonSetByTCGPlayerSetAbbreviation(setAbbreviation);
    }

    @Get('/tcgplayer/name/:name')
    async getSetByTCGPlayerSetName(@Param('name') setName: string) {
        return this.tcgdbPokemonSetService.getTCGdbPokemonSetByTCGPlayerSetName(setName);
    }
    */
}