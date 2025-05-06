import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeMonthlyService } from './tcgdb.mtg.price.change.monthly.service';

@Controller('tcgdb/mtg/price/change/monthly')
export class TCGdbMTGPriceChangeMonthlyController {
    
    constructor(
        private tcgdbMTGPriceChangeMonthlyService: TCGdbMTGPriceChangeMonthlyService
    ) {}


    @Get('/set/:setAbbreviation')
    async getTCGdbMTGPriceChangeMonthlyBySet(@Param('setAbbreviation') setAbbreviation: string) {
        return await this.tcgdbMTGPriceChangeMonthlyService.getTCGdbMTGPriceChangeMonthlyBySet(setAbbreviation);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeMonthlyBySet() {
        return await this.tcgdbMTGPriceChangeMonthlyService.createTCGdbMTGPriceChangeMonthlyBySet();
    }


}