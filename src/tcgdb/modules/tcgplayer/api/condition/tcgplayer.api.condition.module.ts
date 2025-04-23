import { Module } from '@nestjs/common';
import { TCGPlayerAPIConditionService } from './tcgplayer.api.condition.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ], 
  providers: [TCGPlayerAPIConditionService],
  exports: [TCGPlayerAPIConditionService],
})
export class TCGPlayerAPIConditionModule {}