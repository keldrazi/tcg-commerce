import { Module } from '@nestjs/common';
import { PokemonTCGAPICardService } from './pokemontcg.api.card.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
  ],  
  providers: [PokemonTCGAPICardService],
  exports: [PokemonTCGAPICardService],
})
export class PokemonTCGAPICardModule {}