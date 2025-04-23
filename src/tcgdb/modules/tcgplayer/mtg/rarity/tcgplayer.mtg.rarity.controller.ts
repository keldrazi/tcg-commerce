import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGRarityService } from './tcgplayer.mtg.rarity.service';

@Controller('tcgdb/tcgplayer/mtg/rarity')
export class TCGPlayerMTGRarityController {
    
    constructor(
        private tcgPlayerMTGRarityService: TCGPlayerMTGRarityService
    ) {}

    @Get('/create')
    async createRaritys() {
        return this.tcgPlayerMTGRarityService.createTCGPlayerMTGRarities();
    }
}