import { Module } from '@nestjs/common';
import { TCGdbPokemonPriceCurrentService } from './tcgdb.pokemon.price.current.service';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonPriceHistoryModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/price/history/tcgdb.pokemon.price.history.module';

@Module({
    imports: [
        TCGdbPokemonCardModule,
        TCGdbPokemonPriceHistoryModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonPriceCurrentService],
    exports: [TCGdbPokemonPriceCurrentService],
})

export class TCGdbPokemonPriceCurrentModule {}