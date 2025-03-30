import { Module } from '@nestjs/common';
import { ScryfallMTGCardController } from './scryfall.mtg.card.controller';
import { ScryfallMTGCardService } from './scryfall.mtg.card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScryfallMTGCard } from 'src/typeorm/entities/tcgdb/modules/scryfall/mtg/card/scryfall.mtg.card.entity';
import { ScryfallMTGSetModule } from 'src/tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.module';
import { ScryfallAPICardModule } from 'src/tcgdb/modules/scryfall/api/card/scryfall.api.card.module';


@Module({
  imports: [
      TypeOrmModule.forFeature([ScryfallMTGCard]),
      ScryfallMTGSetModule,
      ScryfallAPICardModule,
  ], 
  controllers: [ScryfallMTGCardController],
  providers: [ScryfallMTGCardService],
  exports: [ScryfallMTGCardService],
})
export class ScryfallMTGCardModule {}