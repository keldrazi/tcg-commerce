import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeYearlyService } from './tcgdb.mtg.price.change.yearly.service';

@Controller('tcgdb/mtg/price/change/yearly')
export class TCGdbMTGPriceChangeYearlyController {
    
    constructor(
        private tcgdbMTGPriceChangeYearlyService: TCGdbMTGPriceChangeYearlyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbMTGPriceChangeYearlyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeYearlyService.getTCGdbMTGPriceChangeYearlyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeYearlyBySet() {
        return await this.tcgdbMTGPriceChangeYearlyService.createTCGdbMTGPriceChangeYearlyBySet();
    }


}