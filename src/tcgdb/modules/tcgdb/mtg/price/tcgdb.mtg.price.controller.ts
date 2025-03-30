import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPriceService } from './tcgdb.mtg.price.service';

@Controller('tcgdb/mtg/price')
export class TCGdbMTGPriceController {
    
    constructor(
        private tcgdbMTGPriceService: TCGdbMTGPriceService
    ) {}

    /*
    @Get('/tcgplayer/card/id/:id')
    async getTCGdbPricesByTCGPlayerId(@Param('id') tcgPlayerId: number) {
        return this.tcgdbMTGPriceService.getTCGdbMTGPricesByTCGPlayerId(tcgPlayerId);
    }
    */

    @Get('/create')
    async createTCGdbMTGPrices() {
        return this.tcgdbMTGPriceService.createTCGdbMTGPrices();
    }

}