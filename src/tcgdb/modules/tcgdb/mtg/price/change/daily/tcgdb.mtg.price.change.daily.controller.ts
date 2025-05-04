import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';

@Controller('tcgdb/mtg/price/change/daily')
export class TCGdbMTGPriceChangeDailyController {
    
    constructor(
        private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbMTGPriceService.getTCGdbMTGPricesByTCGPlayerId(tcgPlayerId);
    }
    */

    /*@Get('/create')
    async createTCGdbMTGPricesCurrent() {
        return this.tcgdbMTGPriceCurrentService.createTCGdbMTGPricesCurrent();
    }
    */

}