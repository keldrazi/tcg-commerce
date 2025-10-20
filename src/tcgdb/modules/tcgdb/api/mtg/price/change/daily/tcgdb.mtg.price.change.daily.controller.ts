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

    @Get('/set/:setCode/changes/low')
    async getTCGdbMTGPriceChangeDailyChangesLowBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyChangesLowBySet(setCode);
    }

    @Get('/set/:setCode/changes/market')
    async getTCGdbMTGPriceChangeDailyChangesMarketBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyChangesMarketBySet(setCode);
    }

    @Get('/set/:setCode/increase')
    async getTCGdbMTGPriceChangeDailyIncreaseBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyIncreaseBySet(setCode);
    }

    @Get('/set/:setCode/decrease')
    async getTCGdbMTGPriceChangeDailyDecreaseBySet(@Param('setCode') setCode: string) {
        return await this.tcgdbMTGPriceChangeDailyService.getTCGdbMTGPriceChangeDailyDecreaseBySet(setCode);
    }
}