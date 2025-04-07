import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabasePGModule } from './database/pg/database.pg.module';

//TCGPlayer API Modules;
import { TCGPlayerAPICardModule } from './tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.module';
import { TCGPlayerAPISetModule } from './tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.module';
import { TCGPlayerAPIPriceModule } from './tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.module';
import { TCGPlayerAPIUtilModule } from './tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.module';
//TCGPlayer MTG Modules;
import { TCGPlayerMTGCardModule } from './tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.module';
import { TCGPlayerMTGSetModule } from './tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.module';
import { TCGPlayerMTGPriceModule } from './tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
//TCGPlayer Pokemon Modules;
import { TCGPlayerPokemonCardModule } from './tcgdb/modules/tcgplayer/pokemon/card/tcgplayer.pokemon.card.module';
import { TCGPlayerPokemonSetModule } from './tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.module';
import { TCGPlayerPokemonPriceModule } from './tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.module';
//Scryfall API Modules;
import { ScryfallAPICardModule } from './tcgdb/modules/scryfall/api/card/scryfall.api.card.module';
import { ScryfallAPISetModule } from './tcgdb/modules/scryfall/api/set/scryfall.api.set.module';
//Scryfall MTG Modules;
import { ScryfallMTGCardModule } from './tcgdb/modules/scryfall/mtg/card/scryfall.mtg.card.module';
import { ScryfallMTGSetModule } from './tcgdb/modules/scryfall/mtg/set/scryfall.mtg.set.module';
//Pokemon TCG API Modules;
import { PokemonTCGAPICardModule } from './tcgdb/modules/pokemontcg/api/card/pokemontcg.api.card.module';
import { PokemonTCGAPISetModule } from './tcgdb/modules/pokemontcg/api/set/pokemontcg.api.set.module';
//Pokemon TCG Modules;
import { PokemonTCGPokemonCardModule } from './tcgdb/modules/pokemontcg/pokemon/card/pokemontcg.pokemon.card.module';
import { PokemonTCGPokemonSetModule } from './tcgdb/modules/pokemontcg/pokemon/set/pokemontcg.pokemon.set.module';
//TCDdb MTG Modules;
import { TCGdbMTGCardModule } from './tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGSetModule } from './tcgdb/modules/tcgdb/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceModule } from './tcgdb/modules/tcgdb/mtg/price/tcgdb.mtg.price.module';
//TCGdb Pokemon Modules;
import { TCGdbPokemonCardModule } from './tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonSetModule } from './tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceModule } from './tcgdb/modules/tcgdb/pokemon/price/tcgdb.pokemon.price.module';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !NODE_ENV ? '.env' : `.env.${NODE_ENV}`,
      isGlobal: true,
    }),
    DatabasePGModule,
    //TCGPlayer API Modules;
    TCGPlayerAPICardModule,
    TCGPlayerAPISetModule,
    TCGPlayerAPIPriceModule,
    TCGPlayerAPIUtilModule,
    //TCGPlayer MTG Modules;
    TCGPlayerMTGCardModule,
    TCGPlayerMTGSetModule,
    TCGPlayerMTGPriceModule,
    //TCGPlayer Pokemon Modules;
    TCGPlayerPokemonCardModule,
    TCGPlayerPokemonSetModule,
    TCGPlayerPokemonPriceModule,
    //Scryfall API Modules;
    ScryfallAPICardModule,
    ScryfallAPISetModule,
    //Scryfall MTG Modules;
    ScryfallMTGCardModule,
    ScryfallMTGSetModule,
    //Pokemon TCG API Modules;
    PokemonTCGAPICardModule,
    PokemonTCGAPISetModule,
    //Pokemon TCG Modules;
    PokemonTCGPokemonCardModule,
    PokemonTCGPokemonSetModule,
    //TCDdb MTG Modules;
    TCGdbMTGCardModule,
    TCGdbMTGSetModule,
    TCGdbMTGPriceModule,
    //TCGdb Pokemon Modules;
    TCGdbPokemonCardModule,
    TCGdbPokemonSetModule,
    TCGdbPokemonPriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
