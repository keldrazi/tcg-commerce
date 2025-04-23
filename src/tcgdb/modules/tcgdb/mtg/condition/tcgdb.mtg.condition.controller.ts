import { Controller, Get, Param } from '@nestjs/common';
import { TCGdbMTGConditionService } from './tcgdb.mtg.condition.service';

@Controller('tcgdb/mtg/condition')
export class TCGdbMTGConditionController {
    
    constructor(
        private tcgdbMTGConditionService: TCGdbMTGConditionService
    ) {}

    @Get('/all')
    async getTCGdbMTGConditions() {
        return this.tcgdbMTGConditionService.getTCGdbMTGConditions();
    }

    @Get('/create')
    async createConditions() {
        return this.tcgdbMTGConditionService.createTCGdbMTGConditions();
    }


}