import { Module } from '@nestjs/common';
import { TCGPlayerAPICardService } from './tcgplayer.api.card.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGPlayerAPISetModule } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.module';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api//util/tcgplayer.api.util.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      TCGPlayerAPISetModule,
      TCGPlayerAPIUtilModule,
  ],  
  providers: [TCGPlayerAPICardService],
  exports: [TCGPlayerAPICardService],
})
export class TCGPlayerAPICardModule {}