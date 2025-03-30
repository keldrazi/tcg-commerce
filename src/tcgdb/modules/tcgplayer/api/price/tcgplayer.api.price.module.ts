import { Module } from '@nestjs/common';
import { TCGPlayerAPIPriceService } from './tcgplayer.api.price.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ],  
  providers: [TCGPlayerAPIPriceService],
  exports: [TCGPlayerAPIPriceService],
})
export class TCGPlayerAPIPriceModule {}