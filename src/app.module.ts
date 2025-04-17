import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Config Modules;
import { ConfigModule } from '@nestjs/config';
import { ConfigDatabasePGModule } from './config/database/pg/config.database.pg.module';

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
import { TCGdbMTGPriceCurrentModule } from './tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from './tcgdb/modules/tcgdb/mtg/price/history/tcgdb.mtg.price.history.module';
//TCGdb Pokemon Modules;
import { TCGdbPokemonCardModule } from './tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonSetModule } from './tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceCurrentModule } from './tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from './tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.module';
//Application Module;
import { ApplicationModuleModule } from './tcgcommerce/modules/application/module/application.module.module';
//Commerce Modules;
import { CommerceAccountModule } from './tcgcommerce/modules/commerce/account/commerce.account.module';
import { CommerceLocationModule } from './tcgcommerce/modules/commerce/location/commerce.location.module';
import { CommerceModuleModule } from './tcgcommerce/modules/commerce/module/commerce.module.module';
import { CommerceUserModule } from './tcgcommerce/modules/commerce/user/commerce.user.module';
//Product Modules;
import { ProductVendorModule } from './tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from './tcgcommerce/modules/product/line/product.line.module';
import { ProductTypeModule } from './tcgcommerce/modules/product/type/product.type.module';
import { ProductModuleModule } from './tcgcommerce/modules/product/module/product.module.module';
//Product Card Modules;
import { ProductCardVariantModule } from './tcgcommerce/modules/product/card/variant/product.card.variant.module';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !NODE_ENV ? '.env' : `.env.${NODE_ENV}`,
      isGlobal: true,
    }),
    ConfigDatabasePGModule,
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
    TCGdbMTGPriceCurrentModule,
    TCGdbMTGPriceHistoryModule,
    //TCGdb Pokemon Modules;
    TCGdbPokemonCardModule,
    TCGdbPokemonSetModule,
    TCGdbPokemonPriceCurrentModule,
    TCGdbPokemonPriceHistoryModule,
    //Application Module;
    ApplicationModuleModule,
    //Commerce Modules;
    CommerceAccountModule,
    CommerceLocationModule,
    CommerceModuleModule,
    CommerceUserModule,
    //Product Modules;
    ProductVendorModule,
    ProductLineModule,
    ProductTypeModule,
    ProductModuleModule,
    //Product Card Modules;
    ProductCardVariantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
