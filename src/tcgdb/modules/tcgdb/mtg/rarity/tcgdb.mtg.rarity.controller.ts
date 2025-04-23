import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGRarityService } from './tcgdb.mtg.rarity.service';

@Controller('tcgdb/mtg/rarity')
export class TCGdbMTGRarityController {
    
    constructor(
        private tcgdbMTGRarityService: TCGdbMTGRarityService
    ) {}

    @Get('/all')
    async getTCGdbMTGRaritys() {
        return this.tcgdbMTGRarityService.getTCGdbMTGRarities();
    }

    @Get('/create')
    async createRaritys() {
        return this.tcgdbMTGRarityService.createTCGdbMTGRarities();
    }


}