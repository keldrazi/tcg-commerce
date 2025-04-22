import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGPrintingService } from './tcgplayer.mtg.printing.service';

@Controller('tcgdb/tcgplayer/mtg/printing')
export class TCGPlayerMTGPrintingController {
    
    constructor(
        private tcgPlayerMTGPrintingService: TCGPlayerMTGPrintingService
    ) {}

    @Get('/create')
    async createPrintings() {
        return this.tcgPlayerMTGPrintingService.createTCGPlayerMTGPrintings();
    }
}