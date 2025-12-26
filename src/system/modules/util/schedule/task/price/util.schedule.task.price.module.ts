import { Module } from '@nestjs/common';
import { UtilScheduleTaskPriceService } from './util.schedule.task.price.service';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';
import { TCGdbMTGPriceChangeWeeklyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/weekly/tcgdb.mtg.price.change.weekly.module';
import { TCGdbMTGPriceChangeMonthlyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/monthly/tcgdb.mtg.price.change.monthly.module';
import { TCGdbMTGPriceChangeYearlyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/yearly/tcgdb.mtg.price.change.yearly.module';


@Module({
  imports: [
    TCGdbMTGPriceCurrentModule,
    TCGdbMTGPriceChangeDailyModule,
    TCGdbMTGPriceChangeWeeklyModule,
    TCGdbMTGPriceChangeMonthlyModule,
    TCGdbMTGPriceChangeYearlyModule,
  ],
  providers: [UtilScheduleTaskPriceService],
})
export class UtilScheduleTaskPriceModule {}