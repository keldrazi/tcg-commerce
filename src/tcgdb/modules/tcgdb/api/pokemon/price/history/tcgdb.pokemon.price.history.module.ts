import { Module } from '@nestjs/common';
import { TCGdbPokemonPriceHistoryService } from './tcgdb.pokemon.price.history.service';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/card/tcgdb.pokemon.card.module';


@Module({
    imports: [
        TCGdbPokemonCardModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonPriceHistoryService],
    exports: [TCGdbPokemonPriceHistoryService],
})

export class TCGdbPokemonPriceHistoryModule {}