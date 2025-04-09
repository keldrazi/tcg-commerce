import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceCurrentService } from './tcgdb.mtg.price.current.service';

@Controller('tcgdb/mtg/price/current')
export class TCGdbMTGPriceCurrentController {
    
    constructor(
        private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbMTGPriceService.getTCGdbMTGPricesByTCGPlayerId(tcgPlayerId);
    }
    */

    @Get('/create')
    async createTCGdbMTGPricesCurrent() {
        return this.tcgdbMTGPriceCurrentService.createTCGdbMTGPricesCurrent();
    }

}