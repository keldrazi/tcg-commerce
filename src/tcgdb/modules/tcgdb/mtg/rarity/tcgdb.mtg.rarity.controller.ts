import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGLanguageService } from './tcgdb.mtg.rarity.service';

@Controller('tcgdb/mtg/language')
export class TCGdbMTGLanguageController {
    
    constructor(
        private tcgdbMTGLanguageService: TCGdbMTGLanguageService
    ) {}

    @Get('/all')
    async getTCGdbMTGLanguages() {
        return this.tcgdbMTGLanguageService.getTCGdbMTGLanguages();
    }

    @Get('/create')
    async createLanguages() {
        return this.tcgdbMTGLanguageService.createTCGdbMTGLanguages();
    }


}