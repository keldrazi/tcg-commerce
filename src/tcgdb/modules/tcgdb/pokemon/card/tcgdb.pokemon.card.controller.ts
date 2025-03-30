import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbPokemonCardService } from './tcgdb.pokemon.card.service';

@Controller('tcgdb/pokemon/card')
export class TCGdbPokemonCardController {
    
    constructor(
        private tcgdbPokemonCardService: TCGdbPokemonCardService
    ) {}

    /*()
    @Get('/tcgplayer/set/id/:id')
    async getTCGdbCardsByTCGPlayerSetId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbPokemonCardService.getTCGdbPokemonCardsByTCGPlayerSetId(tcgPlayerId);
    }
    */

}