import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';
import { TCGdbMTGPriceChangeWeeklyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/weekly/tcgdb.mtg.price.change.weekly.service';
import { TCGdbMTGPriceChangeMonthlyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/monthly/tcgdb.mtg.price.change.monthly.service';
import { TCGdbMTGPriceChangeYearlyService } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/yearly/tcgdb.mtg.price.change.yearly.service';




@Injectable()
export class UtilScheduleTaskPriceService {
    /*
    @Inject(TCGPlayerMTGPriceService)
    private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService;
    @Inject(TCGdbMTGPriceCurrentService)
    private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService;
    @Inject(TCGdbMTGPriceChangeDailyService)
    private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService;
    @Inject(TCGdbMTGPriceChangeWeeklyService)
    private tcgdbMTGPriceChangeWeeklyService: TCGdbMTGPriceChangeWeeklyService;
    @Inject(TCGdbMTGPriceChangeMonthlyService)
    private tcgdbMTGPriceChangeMonthlyService: TCGdbMTGPriceChangeMonthlyService;   
    @Inject(TCGdbMTGPriceChangeYearlyService)
    private tcgdbMTGPriceChangeYearlyService: TCGdbMTGPriceChangeYearlyService;
    
    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async updateTCGPlayerMTGPrices() {
        const tcgPlayerMTGPriceRecordCount = await this.tcgPlayerMTGPriceService.createTCGPlayerMTGPrices();
        console.log(`TCGPlayer MTG Prices Updated: ${tcgPlayerMTGPriceRecordCount}`);

        const tcgdbMTGPriceCurrentRecordCount = await this.tcgdbMTGPriceCurrentService.createTCGdbMTGPricesCurrent();
        console.log(`TCGdb MTG Prices Current Updated: ${tcgdbMTGPriceCurrentRecordCount}`);

        const tcgdbMTGPriceChangeDailyRecordCount = await this.tcgdbMTGPriceChangeDailyService.createTCGdbMTGPriceChangeDailyBySet();
        console.log(`TCGdb MTG Price Change Daily Updated: ${tcgdbMTGPriceChangeDailyRecordCount}`);

        const tcgdbMTGPriceChangeWeeklyRecordCount = await this.tcgdbMTGPriceChangeWeeklyService.createTCGdbMTGPriceChangeWeeklyBySet();
        console.log(`TCGdb MTG Price Change Weekly Updated: ${tcgdbMTGPriceChangeWeeklyRecordCount}`);

        const tcgdbMTGPriceChangeMonthlyRecordCount = await this.tcgdbMTGPriceChangeMonthlyService.createTCGdbMTGPriceChangeMonthlyBySet();
        console.log(`TCGdb MTG Price Change Monthly Updated: ${tcgdbMTGPriceChangeMonthlyRecordCount}`);
        
        const tcgdbMTGPriceChangeYearlyRecordCount = await this.tcgdbMTGPriceChangeYearlyService.createTCGdbMTGPriceChangeYearlyBySet();
        console.log(`TCGdb MTG Price Change Yearly Updated: ${tcgdbMTGPriceChangeYearlyRecordCount}`);
    }
    */
    
    
    
  
}