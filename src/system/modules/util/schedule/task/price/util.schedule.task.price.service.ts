import { Injectable, Inject } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TCGPlayerMTGPriceService } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.service'
import { TCGdbMTGPriceCurrentService } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceChangeDailyService } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.service';




@Injectable()
export class UtilScheduleTaskPriceService {
  
    @Inject(TCGPlayerMTGPriceService)
    private tcgPlayerMTGPriceService: TCGPlayerMTGPriceService;
    @Inject(TCGdbMTGPriceCurrentService)
    private tcgdbMTGPriceCurrentService: TCGdbMTGPriceCurrentService;
    @Inject(TCGdbMTGPriceChangeDailyService)
    private tcgdbMTGPriceChangeDailyService: TCGdbMTGPriceChangeDailyService;

    /*
    public EVERY_DAY_AT_1AM = '0 01 * * *';
    public EVERY_DAY_AT_130AM = '30 01 * * *';
    public EVERY_DAY_AT_2AM = '0 02 * * *';
    */
    
    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async updateTCGPlayerMTGPrices() {
        const tcgPlayerMTGPriceRecordCount = await this.tcgPlayerMTGPriceService.createTCGPlayerMTGPrices();
        console.log(`TCGPlayer MTG Prices Updated: ${tcgPlayerMTGPriceRecordCount}`);

        const tcgdbMTGPriceCurrentRecordCount = await this.tcgdbMTGPriceCurrentService.createTCGdbMTGPricesCurrent();
        console.log(`TCGdb MTG Prices Current Updated: ${tcgdbMTGPriceCurrentRecordCount}`);

        const tcgdbMTGPriceChangeDailyRecordCount = await this.tcgdbMTGPriceChangeDailyService.createTCGdbMTGPriceChangeDailyBySet();
        console.log(`TCGdb MTG Price Change Daily Updated: ${tcgdbMTGPriceChangeDailyRecordCount}`);
    }
    
    
    
    
  
}