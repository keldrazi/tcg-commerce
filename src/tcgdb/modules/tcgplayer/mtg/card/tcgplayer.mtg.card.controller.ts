import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGCardService } from './tcgplayer.mtg.card.service';

@Controller('tcgplayer/mtg/card')
export class TCGPlayerMTGCardController {
    
    constructor(
        private tcgPlayerMTGCardService: TCGPlayerMTGCardService
    ) {}

    @Get('/create')
    async createCards() {
        return await this.tcgPlayerMTGCardService.createTCGPlayerMTGCards();
    }
}