import { Module } from '@nestjs/common';
import { ScryfallAPICardService } from './scryfall.api.card.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScryfallAPISetModule } from 'src/tcgdb/modules/scryfall/api/set/scryfall.api.set.module';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
      ScryfallAPISetModule,
  ],  
  providers: [ScryfallAPICardService],
  exports: [ScryfallAPICardService],
})
export class ScryfallAPICardModule {}