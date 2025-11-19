import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGCardService } from './tcgdb.mtg.card.service';

@Controller('tcgdb/mtg/card')
export class TCGdbMTGCardController {
    
    constructor(
        private tcgdbMTGCardService: TCGdbMTGCardService
    ) {}
   
    @Get('/setCode/:setCode')
    async getTCGdbMTGCardsBySetCode(@Param('setCode') setAbbrevation: string) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardsBySetCode(setAbbrevation);
    }
   
}  