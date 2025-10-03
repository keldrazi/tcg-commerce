import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGCardService } from './tcgdb.mtg.card.service';

@Controller('tcgdb/mtg/card')
export class TCGdbMTGCardController {
    
    constructor(
        private tcgdbMTGCardService: TCGdbMTGCardService
    ) {}
    /*
    @Get('/tcgplayer/id/:id')
    async getTCGdbCardsByTCGPlayerId(@Param('id') id: number) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardByTCGPlayerId(id);
    }
    
    @Get('/id/:id')
    async getTCGdbMTGCardByTCGdbId(@Param('id') id: string){
        return this.tcgdbMTGCardService.getTCGdbMTGCardByTCGdbId(id);
    }
    
    @Get('/cardName/:cardName/setName/:setName')
    async getTCGdbMTGCardByCardAndSetName(@Param('cardName') cardName: string, @Param('setName') setName: string) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardByCardAndSetName(cardName, setName);
    }
    
    @Get('/cardName/:cardName')
    async getTCGdbMTGCardsByCardName(@Param('cardName') cardName: string) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardsByCardName(cardName);
    }
    
    @Get('/setName/:setName')
    async getTCGdbMTGCardsBySetName(@Param('setName') setName: string) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardsBySetName(setName);
    }
    */
    @Get('/setCode/:setCode')
    async getTCGdbMTGCardsBySetCode(@Param('setCode') setAbbrevation: string) {
        return this.tcgdbMTGCardService.getTCGdbMTGCardsBySetCode(setAbbrevation);
    }
    /*
    @Get('/create')
    async createTCGdbMTGCards() {
        return this.tcgdbMTGCardService.createTCGdbMTGCards();
    }
        */
}  