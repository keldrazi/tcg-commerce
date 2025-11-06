import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
//Config Modules;
import { ConfigModule } from '@nestjs/config';
import { ConfigDatabasePGModule } from './config/database/pg/config.database.pg.module';
import { ConfigEmailModule } from './config/email/config.email.module';

//TCGPlayer API Modules;
import { TCGPlayerAPICardModule } from './tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.module';
import { TCGPlayerAPISetModule } from './tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.module';
import { TCGPlayerAPIPriceModule } from './tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.module';
import { TCGPlayerAPIConditionModule } from './tcgdb/modules/tcgplayer/api/condition/tcgplayer.api.condition.module';
import { TCGPlayerAPILanguageModule } from './tcgdb/modules/tcgplayer/api/language/tcgplayer.api.language.module';
import { TCGPlayerAPIPrintingModule } from './tcgdb/modules/tcgplayer/api/printing/tcgplayer.api.printing.module';
import { TCGPlayerAPIRarityModule } from './tcgdb/modules/tcgplayer/api/rarity/tcgplayer.api.rarity.module';
import { TCGPlayerAPIUtilModule } from './tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.module';
//TCGPlayer MTG Modules;
import { TCGPlayerMTGCardModule } from './tcgdb/modules/tcgplayer/mtg/card/tcgplayer.mtg.card.module';
import { TCGPlayerMTGSetModule } from './tcgdb/modules/tcgplayer/mtg/set/tcgplayer.mtg.set.module';
import { TCGPlayerMTGPriceModule } from './tcgdb/modules/tcgplayer/mtg/price/tcgplayer.mtg.price.module';
import { TCGPlayerMTGConditionModule } from './tcgdb/modules/tcgplayer/mtg/condition/tcgplayer.mtg.condition.module';
import { TCGPlayerMTGLanguageModule } from './tcgdb/modules/tcgplayer/mtg/language/tcgplayer.mtg.language.module';
import { TCGPlayerMTGPrintingModule } from './tcgdb/modules/tcgplayer/mtg/printing/tcgplayer.mtg.printing.module';
import { TCGPlayerMTGRarityModule } from './tcgdb/modules/tcgplayer/mtg/rarity/tcgplayer.mtg.rarity.module';
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
import { TCGdbMTGCardModule } from './tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';
import { TCGdbMTGSetModule } from './tcgdb/modules/tcgdb/api/mtg/set/tcgdb.mtg.set.module';
import { TCGdbMTGPriceCurrentModule } from './tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { TCGdbMTGPriceHistoryModule } from './tcgdb/modules/tcgdb/api/mtg/price/history/tcgdb.mtg.price.history.module';
import { TCGdbMTGPriceChangeDailyModule } from './tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';
import { TCGdbMTGConditionModule } from './tcgdb/modules/tcgdb/api/mtg/condition/tcgdb.mtg.condition.module';
import { TCGdbMTGLanguageModule } from './tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.module';
import { TCGdbMTGPrintingModule } from './tcgdb/modules/tcgdb/api/mtg/printing/tcgdb.mtg.printing.module';
import { TCGdbMTGRarityModule } from './tcgdb/modules/tcgdb/api/mtg/rarity/tcgdb.mtg.rarity.module';
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
import { ProductSetModule } from './tcgcommerce/modules/product/set/product.set.module';  
//Product Card Modules;
import { ProductCardModule } from './tcgcommerce/modules/product/card/product.card.module';
import { ProductCardConditionModule } from './tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from './tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from './tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { ProductCardRarityModule } from './tcgcommerce/modules/product/card/rarity/product.card.rarity.module';
//import { ProductCardPriceModule } from './tcgcommerce/modules/product/card/price/product.card.price.module';
//Product Card Price Modules;
import { PriceRuleProductCardBaseModule } from './tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.module';
import { PriceRuleProductCardUpdateDailyModule } from './tcgcommerce/modules/price/rule/product/card/update/daily/price.rule.product.card.update.daily.module';
//import { PriceProductCardTypeModule } from './tcgcommerce/modules/price/product/card/type/price.product.card.type.module';
//import { PriceProductCardRuleTypeModule } from './tcgcommerce/modules/price/product/card/rule/type/price.product.card.rule.type.module';
//import { PriceProductCardRuleSetModule } from './tcgcommerce/modules/price/product/card/rule/set/price.product.card.rule.set.module'; 
//Product Card Inventory Modules;
import { InventoryProductCardModule } from './tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
//Product Card Load Inventory Modules;
import { InventoryProductCardServiceCreateJobModule } from './tcgcommerce/modules/inventory/product/card/service/create/job/inventory.product.card.service.create.job.module';
import { InventoryProductCardServiceCreateJobItemModule } from './tcgcommerce/modules/inventory/product/card/service/create/job/item/inventory.product.card.service.create.job.item.module';
//Inventory Product Card Update Service Price Modules;
import { InventoryProductCardServiceUpdatePriceJobModule } from './tcgcommerce/modules/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.module';
import { InventoryProductCardServiceUpdatePriceJobItemModule } from './tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.module';
//Inventory Product Card Import Service Job Modules;
import { InventoryProductCardServiceImportJobTypeModule } from './tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.type.module';
//System Modules;
import { UtilScheduleTaskPriceModule } from './system/modules/util/schedule/task/price/util.schedule.task.price.module';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !NODE_ENV ? '.env' : `.env.${NODE_ENV}`,
      isGlobal: true,
    }),
    ConfigDatabasePGModule,
    ConfigEmailModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    //TCGPlayer API Modules;
    TCGPlayerAPICardModule,
    TCGPlayerAPISetModule,
    TCGPlayerAPIPriceModule,
    TCGPlayerAPIConditionModule,
    TCGPlayerAPILanguageModule,
    TCGPlayerAPIPrintingModule,
    TCGPlayerAPIRarityModule,
    TCGPlayerAPIUtilModule,
    //TCGPlayer MTG Modules;
    TCGPlayerMTGCardModule,
    TCGPlayerMTGSetModule,
    TCGPlayerMTGPriceModule,
    TCGPlayerMTGConditionModule,
    TCGPlayerMTGLanguageModule,
    TCGPlayerMTGPrintingModule,
    TCGPlayerMTGRarityModule,
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
    //TCGdbMTGPriceCurrentModule,
    //TCGdbMTGPriceHistoryModule,
    TCGdbMTGPriceChangeDailyModule,
    TCGdbMTGConditionModule,
    TCGdbMTGLanguageModule,
    TCGdbMTGPrintingModule,
    TCGdbMTGRarityModule,
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
    ProductSetModule,
    //Product Card Modules;
    ProductCardModule,
    ProductCardConditionModule,
    ProductLanguageModule,
    ProductCardPrintingModule,
    ProductCardRarityModule,
    //ProductCardPriceModule,
    //Product Card Price Modules;
    PriceRuleProductCardBaseModule,
    PriceRuleProductCardUpdateDailyModule,
    //PriceProductCardTypeModule,
    //PriceProductCardRuleTypeModule,
    //PriceProductCardRuleSetModule,
    //Inventory Product Card Modules;
    InventoryProductCardModule,
    //Inventory Load Product Card Modules;
    InventoryProductCardServiceCreateJobModule,
    InventoryProductCardServiceCreateJobItemModule,
    //Inventory Product Card Update Service Price Modules;
    InventoryProductCardServiceUpdatePriceJobModule,
    InventoryProductCardServiceUpdatePriceJobItemModule,
    //Inventory Product Card Import Service Job Modules;
    InventoryProductCardServiceImportJobTypeModule,
    //System Modules;
    UtilScheduleTaskPriceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
