import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGLanguageService } from './tcgplayer.mtg.language.service';

@Controller('tcgdb/tcgplayer/mtg/language')
export class TCGPlayerMTGLanguageController {
    
    constructor(
        private tcgPlayerMTGLanguageService: TCGPlayerMTGLanguageService
    ) {}

    @Get('/create')
    async createLanguages() {
        return this.tcgPlayerMTGLanguageService.createTCGPlayerMTGLanguages();
    }
}