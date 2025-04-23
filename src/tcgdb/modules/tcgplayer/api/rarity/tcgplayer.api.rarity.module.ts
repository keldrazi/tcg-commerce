import { Module } from '@nestjs/common';
import { TCGPlayerAPIRarityService } from './tcgplayer.api.rarity.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ], 
  providers: [TCGPlayerAPIRarityService],
  exports: [TCGPlayerAPIRarityService],
})
export class TCGPlayerAPIRarityModule {}