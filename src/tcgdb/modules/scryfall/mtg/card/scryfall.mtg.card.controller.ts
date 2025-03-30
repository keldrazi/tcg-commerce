import { Controller, Get, Param } from '@nestjs/common';
import { ScryfallMTGCardService } from './scryfall.mtg.card.service';

@Controller('scryfall/mtg/card')
export class ScryfallMTGCardController {
  constructor(
    private scryfallMTGCardService: ScryfallMTGCardService
  ) {}

    @Get('/create')
    createCards() {
        return this.scryfallMTGCardService.createScryfallMTGCards();
    }

    @Get('/update')
    updateCards() {
        return this.scryfallMTGCardService.updateScryfallMTGCards();
    }

}