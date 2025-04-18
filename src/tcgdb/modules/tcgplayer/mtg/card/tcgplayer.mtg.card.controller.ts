import { Controller, Get, Param } from '@nestjs/common';
import { TCGPlayerMTGCardService } from './tcgplayer.mtg.card.service';

@Controller('tcgdb/tcgplayer/mtg/card')
export class TCGPlayerMTGCardController {
    
    constructor(
        private tcgPlayerMTGCardService: TCGPlayerMTGCardService
    ) {}

    @Get('/create')
    async createCards() {
        return await this.tcgPlayerMTGCardService.createTCGPlayerMTGCards();
    }

    @Get('/group/:groupId')
    async getTCGPlayerMTGCardsByGroupId(@Param('groupId') groupId: number) {
        return await this.tcgPlayerMTGCardService.getTCGPlayerMTGCardsByGroupId(groupId);
    }
}