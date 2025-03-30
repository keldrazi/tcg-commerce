import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PokemonTCGAPISetService } from './pokemontcg.api.set.service';

@Module({
  imports: [
      HttpModule,
      ConfigModule,
  ],  
  providers: [PokemonTCGAPISetService],
  exports: [PokemonTCGAPISetService],
})
export class PokemonTCGAPISetModule {}