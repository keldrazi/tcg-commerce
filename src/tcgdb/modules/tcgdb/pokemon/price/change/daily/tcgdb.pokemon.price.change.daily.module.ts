import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceChangeDailyController } from './tcgdb.pokemon.price.change.daily.controller';
import { TCGdbPokemonPriceChangeDailyService } from './tcgdb.pokemon.price.change.daily.service';
import { TCGdbPokemonPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.module';
import { TCGdbPokemonSetModule} from 'src/tcgdb/modules/tcgdb/pokemon/set/tcgdb.pokemon.set.module';
import { TCGdbPokemonPriceChangeDaily } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/change/daily/tcgdb.pokemon.price.change.daily.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceChangeDaily]),
        TCGdbPokemonPriceCurrentModule,
        TCGdbPokemonPriceHistoryModule,
        TCGdbPokemonSetModule,
    ], 
    controllers: [TCGdbPokemonPriceChangeDailyController],
    providers: [TCGdbPokemonPriceChangeDailyService],
    exports: [TCGdbPokemonPriceChangeDailyService],
})

export class TCGdbPokemonPriceChangeDailyModule {}