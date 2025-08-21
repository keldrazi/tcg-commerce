import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceChangeWeeklyController } from './tcgdb.pokemon.price.change.weekly.controller';
import { TCGdbPokemonPriceChangeWeeklyService } from './tcgdb.pokemon.price.change.weekly.service';
import { TCGdbPokemonPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbPokemonSetModule} from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceChangeWeekly } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/weekly/tcgdb.pokemon.price.change.weekly.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceChangeWeekly]),
        TCGdbPokemonPriceCurrentModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbPokemonSetModule,
    ], 
    controllers: [TCGdbPokemonPriceChangeWeeklyController],
    providers: [TCGdbPokemonPriceChangeWeeklyService],
    exports: [TCGdbPokemonPriceChangeWeeklyService],
})

export class TCGdbPokemonPriceChangeWeeklyModule {}