import { Controller, Get } from '@nestjs/common';
import { ScryfallMTGSetService } from './scryfall.mtg.set.service';

@Controller('tcgdb/scryfall/mtg/set')
export class ScryfallMTGSetController {
    constructor(
        private scryfallMTGSetService: ScryfallMTGSetService,
    ) {}

    @Get('/create')
    createSets() {
        return this.scryfallMTGSetService.createScryfallMTGSets();
    }
}