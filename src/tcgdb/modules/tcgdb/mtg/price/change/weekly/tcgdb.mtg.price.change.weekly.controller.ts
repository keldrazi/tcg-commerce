import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeWeeklyService } from './tcgdb.mtg.price.change.weekly.service';

@Controller('tcgdb/mtg/price/change/weekly')
export class TCGdbMTGPriceChangeWeeklyController {
    
    constructor(
        private tcgdbMTGPriceChangeWeeklyService: TCGdbMTGPriceChangeWeeklyService
    ) {}


    @Get('/set/:setAbbreviation')
    async getTCGdbMTGPriceChangeWeeklyBySet(@Param('setAbbreviation') setAbbreviation: string) {
        return await this.tcgdbMTGPriceChangeWeeklyService.getTCGdbMTGPriceChangeWeeklyBySet(setAbbreviation);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeWeeklyBySet() {
        return await this.tcgdbMTGPriceChangeWeeklyService.createTCGdbMTGPriceChangeWeeklyBySet();
    }


}