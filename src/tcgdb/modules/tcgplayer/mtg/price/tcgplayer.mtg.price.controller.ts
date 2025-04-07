import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGPriceService } from './tcgplayer.mtg.price.service';

@Controller('tcgdb/tcgplayer/mtg/price')
export class TCGPlayerMTGPriceController {
    
    constructor(
        private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService
    ) {}

    @Get('/create')
    async createPrices() {
        return this.tcgPlayerMTGPriceService.createTCGPlayerMTGPrices();
    }
}