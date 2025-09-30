import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';

@Controller('tcgdb/mtg/price/change/daily')
export class TCGdbMTGPriceChangeDailyController {
    
    constructor(
        private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbMTGPriceChangeDailyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeDailyBySet() {
        return await this.tcgdbMTGPriceChangeDailyService.createTCGdbMTGPriceChangeDailyBySet();
    }


}