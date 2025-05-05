import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';

@Controller('tcgdb/mtg/price/change/daily')
export class TCGdbMTGPriceChangeDailyController {
    
    constructor(
        private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) {}


    @Get('/set/:setAbbreviation')
    async getTCGdbMTGPriceChangeDailyBySet(@Param('setAbbreviation') setAbbreviation: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyBySet(setAbbreviation);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeDailyBySet() {
        return await this.tcgdbMTGPriceChangeDailyService.createTCGdbMTGPriceChangeDailyBySet();
    }


}