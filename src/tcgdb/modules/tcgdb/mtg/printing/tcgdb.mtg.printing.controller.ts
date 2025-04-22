import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGSetService } from './tcgdb.mtg.printing.service';

@Controller('tcgdb/mtg/set')
export class TCGdbMTGSetController {
    
    constructor(
        private tcgdbMTGSetService: TCGdbMTGSetService
    ) {}

    @Get('/all')
    async getTCGdbMTGSets() {
        return this.tcgdbMTGSetService.getTCGdbMTGSets();
    }

    @Get('/tcgplayer/id/:id')
    async getSetByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbMTGSetService.getTCGdbMTGSetByTCGPlayerId(tcgPlayerId);
    }

    @Get('/id/:id')
    async getSetByTCGdbId(@Param('id') tcgdbId: string) {
        return this.tcgdbMTGSetService.getTCGdbMTGSetByTCGdbId(tcgdbId);
    }
    
    @Get('/abbreviation/:abbreviation')
    async getSetByTCGPlayerSetAbbreviation(@Param('abbreviation') setAbbreviation: string) {
        return this.tcgdbMTGSetService.getTCGdbMTGSetBySetAbbreviation(setAbbreviation);
    }

    @Get('/name/:name')
    async getSetByTCGPlayerSetName(@Param('name') setName: string) {
        return this.tcgdbMTGSetService.getTCGdbMTGSetBySetName(setName);
    }

    @Get('/create')
    async createSets() {
        return this.tcgdbMTGSetService.createTCGdbMTGSets();
    }


}