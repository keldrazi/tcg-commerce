import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeMonthlyService } from './tcgdb.mtg.price.change.monthly.service';

@Controller('tcgdb/mtg/price/change/monthly')
export class TCGdbMTGPriceChangeMonthlyController {
    
    constructor(
        private tcgdbMTGPriceChangeMonthlyService: TCGdbMTGPriceChangeMonthlyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbMTGPriceChangeMonthlyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeMonthlyService.getTCGdbMTGPriceChangeMonthlyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeMonthlyBySet() {
        return await this.tcgdbMTGPriceChangeMonthlyService.createTCGdbMTGPriceChangeMonthlyBySet();
    }


}