import { Module } from '@nestjs/common';
import { ScryfallAPISetService } from './scryfall.api.set.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
  ], 
  providers: [ScryfallAPISetService],
  exports: [ScryfallAPISetService],
})
export class ScryfallAPISetModule {}