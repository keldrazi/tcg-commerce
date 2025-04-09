import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceHistoryService } from './tcgdb.mtg.price.history.service';
import { TCGdbMTGCard } from 'src/typeorm/entities/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.entity';

@Controller('tcgdb/mtg/price/current')
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