import { Module } from '@nestjs/common';
import { TCGdbPokemonPriceCurrentService } from './tcgdb.pokemon.price.current.service';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TCGdbPokemonCardModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbAPIUtilModule,
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonPriceCurrentService],
    exports: [TCGdbPokemonPriceCurrentService],
})

export class TCGdbPokemonPriceCurrentModule {}