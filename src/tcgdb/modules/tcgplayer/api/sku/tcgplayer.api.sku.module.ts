import { Module } from '@nestjs/common';
import { TCGPlayerAPISkuService } from './tcgplayer.api.sku.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ],  
  providers: [TCGPlayerAPISkuService],
  exports: [TCGPlayerAPISkuService],
})
export class TCGPlayerAPISkuModule {}