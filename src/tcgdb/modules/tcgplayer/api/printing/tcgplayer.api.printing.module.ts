import { Module } from '@nestjs/common';
import { TCGPlayerAPIPrintingService } from './tcgplayer.api.printing.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ], 
  providers: [TCGPlayerAPIPrintingService],
  exports: [TCGPlayerAPIPrintingService],
})
export class TCGPlayerAPIPrintingModule {}