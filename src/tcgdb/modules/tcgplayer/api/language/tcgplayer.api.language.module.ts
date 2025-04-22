import { Module } from '@nestjs/common';
import { TCGPlayerAPILanguageService } from './tcgplayer.api.language.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPIUtilModule,
  ], 
  providers: [TCGPlayerAPILanguageService],
  exports: [TCGPlayerAPILanguageService],
})
export class TCGPlayerAPILanguageModule {}