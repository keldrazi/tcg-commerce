import { Controller, Get } from '@nestjs/common';
import { TCGPlayerMTGConditionService } from './tcgplayer.mtg.condition.service';

@Controller('tcgdb/tcgplayer/mtg/condition')
export class TCGPlayerMTGConditionController {
    
    constructor(
        private tcgPlayerMTGConditionService: TCGPlayerMTGConditionService
    ) {}

    @Get('/create')
    async createConditions() {
        return this.tcgPlayerMTGConditionService.createTCGPlayerMTGConditions();
    }
}