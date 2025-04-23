import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGPrintingService } from './tcgdb.mtg.printing.service';

@Controller('tcgdb/mtg/printing')
export class TCGdbMTGPrintingController {
    
    constructor(
        private tcgdbMTGPrintingService: TCGdbMTGPrintingService
    ) {}

    @Get('/all')
    async getTCGdbMTGPrintings() {
        return this.tcgdbMTGPrintingService.getTCGdbMTGPrintings();
    }

    @Get('/create')
    async createPrintings() {
        return this.tcgdbMTGPrintingService.createTCGdbMTGPrintings();
    }


}