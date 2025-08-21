import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceChangeYearlyController } from './tcgdb.pokemon.price.change.yearly.controller';
import { TCGdbPokemonPriceChangeYearlyService } from './tcgdb.pokemon.price.change.yearly.service';
import { TCGdbPokemonPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbPokemonSetModule} from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceChangeYearly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/yearly/tcgdb.pokemon.price.change.yearly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceChangeYearly]),
        TCGdbPokemonPriceCurrentModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbPokemonSetModule,
    ], 
    controllers: [TCGdbPokemonPriceChangeYearlyController],
    providers: [TCGdbPokemonPriceChangeYearlyService],
    exports: [TCGdbPokemonPriceChangeYearlyService],
})

export class TCGdbPokemonPriceChangeYearlyModule {}