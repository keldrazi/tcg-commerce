import { Module } from '@nestjs/common';
import { ScryfallMTGSetController } from './scryfall.mtg.set.controller';
import { ScryfallMTGSetService } from './scryfall.mtg.set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ScryfallMTGSet } from 'src/typeorm/entities/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.entity';
import { ScryfallAPISetModule } from 'src/tcgdb/modules/scryfall/api/set/scryfall.api.set.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ScryfallMTGSet]),
    HttpModule,
    ScryfallAPISetModule,
  ], 
  controllers: [ScryfallMTGSetController],
  providers: [ScryfallMTGSetService],
  exports: [ScryfallMTGSetService],
})
export class ScryfallMTGSetModule {}