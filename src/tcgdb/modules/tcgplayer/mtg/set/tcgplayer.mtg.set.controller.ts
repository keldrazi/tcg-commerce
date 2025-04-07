import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGSetService } from './tcgplayer.mtg.set.service';

@Controller('tcgdb/tcgplayer/mtg/set')
export class TCGPlayerMTGSetController {
    
    constructor(
        private tcgPlayerMTGSetService: TCGPlayerMTGSetService
    ) {}

    @Get('/create')
    async createSets() {
        return this.tcgPlayerMTGSetService.createTCGPlayerMTGSets();
    }
}