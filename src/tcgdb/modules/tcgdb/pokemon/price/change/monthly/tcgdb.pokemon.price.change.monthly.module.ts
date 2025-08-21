import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceChangeMonthlyController } from './tcgdb.pokemon.price.change.monthly.controller';
import { TCGdbPokemonPriceChangeMonthlyService } from './tcgdb.pokemon.price.change.monthly.service';
import { TCGdbPokemonPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbPokemonSetModule} from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceChangeMonthly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/monthly/tcgdb.pokemon.price.change.monthly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceChangeMonthly]),
        TCGdbPokemonPriceCurrentModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbPokemonSetModule,
    ], 
    controllers: [TCGdbPokemonPriceChangeMonthlyController],
    providers: [TCGdbPokemonPriceChangeMonthlyService],
    exports: [TCGdbPokemonPriceChangeMonthlyService],
})

export class TCGdbPokemonPriceChangeMonthlyModule {}