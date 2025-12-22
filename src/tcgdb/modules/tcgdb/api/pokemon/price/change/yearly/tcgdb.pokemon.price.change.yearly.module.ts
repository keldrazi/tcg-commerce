import { Module } from "@nestjs/common";
import { TCGdbPokemonPriceChangeYearlyService } from './tcgdb.pokemon.price.change.yearly.service';
import { TCGdbPokemonPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbPokemonSetModule} from 'src/tcgdb/modules/tcgdb/api/pokemon/set/tcgdb.pokemon.set.module';


@Module({
    imports: [
        TCGdbPokemonPriceCurrentModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbPokemonSetModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonPriceChangeYearlyService],
    exports: [TCGdbPokemonPriceChangeYearlyService],
})

export class TCGdbPokemonPriceChangeYearlyModule {}