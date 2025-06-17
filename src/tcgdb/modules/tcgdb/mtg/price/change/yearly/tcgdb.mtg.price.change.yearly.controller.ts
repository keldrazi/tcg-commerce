import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeYearlyService } from './tcgdb.mtg.price.change.yearly.service';

@Controller('tcgdb/mtg/price/change/yearly')
export class TCGdbMTGPriceChangeYearlyController {
    
    constructor(
        private tcgdbMTGPriceChangeYearlyService: TCGdbMTGPriceChangeYearlyService
    ) {}


    @Get('/set/:setAbbreviation')
    async getTCGdbMTGPriceChangeYearlyBySet(@Param('setAbbreviation') setAbbreviation: string) {
        return await this.tcgdbMTGPriceChangeYearlyService.getTCGdbMTGPriceChangeYearlyBySet(setAbbreviation);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeYearlyBySet() {
        return await this.tcgdbMTGPriceChangeYearlyService.createTCGdbMTGPriceChangeYearlyBySet();
    }


}