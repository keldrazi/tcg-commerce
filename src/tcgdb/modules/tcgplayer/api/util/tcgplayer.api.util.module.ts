import { Module } from '@nestjs/common';
import { TCGPlayerAPIUtilService } from './tcgplayer.api.util.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
  ], 
  providers: [TCGPlayerAPIUtilService],
  exports: [TCGPlayerAPIUtilService],
})
export class TCGPlayerAPIUtilModule {}