import { Module } from '@nestjs/common';
import { TCGPlayerAPISetService } from './tcgplayer.api.set.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ], 
  providers: [TCGPlayerAPISetService],
  exports: [TCGPlayerAPISetService],
})
export class TCGPlayerAPISetModule {}