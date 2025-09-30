import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeWeeklyService } from './tcgdb.mtg.price.change.weekly.service';

@Controller('tcgdb/mtg/price/change/weekly')
export class TCGdbMTGPriceChangeWeeklyController {
    
    constructor(
        private tcgdbMTGPriceChangeWeeklyService: TCGdbMTGPriceChangeWeeklyService
    ) {}


    @Get('/set/:setCode')
    async getTCGdbMTGPriceChangeWeeklyBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeWeeklyService.getTCGdbMTGPriceChangeWeeklyBySet(setCode);
    }

    @Get('/create')
    async createTCGdbMTGPriceChangeWeeklyBySet() {
        return await this.tcgdbMTGPriceChangeWeeklyService.createTCGdbMTGPriceChangeWeeklyBySet();
    }


}