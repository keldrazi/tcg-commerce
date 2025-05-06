import { Module } from '@nestjs/common';
import { UtilScheduleTaskPriceService } from './util.schedule.task.price.service';
import { TCGPlayerMTGPriceModule } from 'src/tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';


@Module({
  imports: [
    TCGPlayerMTGPriceModule,
    TCGdbMTGPriceCurrentModule,
    TCGdbMTGPriceChangeDailyModule,
  ],
  providers: [UtilScheduleTaskPriceService],
})
export class UtilScheduleTaskPriceModule {}