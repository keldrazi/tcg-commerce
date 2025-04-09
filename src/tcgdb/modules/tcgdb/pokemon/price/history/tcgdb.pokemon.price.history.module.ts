import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceHistoryService } from './tcgdb.pokemon.price.history.service';
import { TCGdbPokemonPriceHistoryController } from "./tcgdb.pokemon.price.history.controller";
import { TCGPlayerPokemonPriceModule } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.module';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonPriceHistory } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/history/tcgdb.pokemon.price.history.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceHistory]),
        TCGdbPokemonCardModule,
        TCGPlayerPokemonPriceModule,
    ], 
    controllers: [TCGdbPokemonPriceHistoryController],
    providers: [TCGdbPokemonPriceHistoryService],
    exports: [TCGdbPokemonPriceHistoryService],
})

export class TCGdbPokemonPriceHistoryModule {}