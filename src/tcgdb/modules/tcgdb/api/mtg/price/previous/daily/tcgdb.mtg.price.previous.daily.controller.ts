import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPricePreviousDailyService } from './tcgdb.mtg.price.previous.daily.service';

@Controller('tcgdb/mtg/price/change/daily')
export class TCGdbMTGPricePreviousDailyController {
    
    constructor(
        private tcgdbMTGPricePreviousDailyService: TCGdbMTGPricePreviousDailyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbMTGPricePreviousDailyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPricePreviousDailyService.getTCGdbMTGPricePreviousDailyBySetCode(setCode);
    }

    @Get('/create')
    async createTCGdbMTGPricePreviousDailyBySet() {
        return await this.tcgdbMTGPricePreviousDailyService.createTCGdbMTGPricePreviousDailyBySet();
    }


}