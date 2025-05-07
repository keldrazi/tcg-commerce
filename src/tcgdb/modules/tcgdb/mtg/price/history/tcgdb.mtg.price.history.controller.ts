import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceHistoryService } from './tcgdb.mtg.price.history.service';

@Controller('tcgdb/mtg/price/history')
export class TCGdbMTGPriceHistoryController {
    
    constructor(
        private tcgdbMTGPriceHistoryService: TCGdbMTGPriceHistoryService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbMTGPriceService.getTCGdbMTGPricesByTCGPlayerId(tcgPlayerId);
    }
    */

    /*@Get('/create')
    async createTCGdbMTGPricesHistory() {
        return this.tcgdbMTGPriceHistoryService.createTCGdbMTGPricesHistory();
    }
    */

}