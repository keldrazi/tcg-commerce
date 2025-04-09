import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceCurrentService } from './tcgdb.pokemon.price.current.service';
import { TCGdbPokemonPriceCurrentController } from "./tcgdb.pokemon.price.current.controller";
import { TCGPlayerPokemonPriceModule } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.module';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonPriceCurrent } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/current/tcgdb.pokemon.price.current.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPriceCurrent]),
        TCGdbPokemonCardModule,
        TCGPlayerPokemonPriceModule,
    ], 
    controllers: [TCGdbPokemonPriceCurrentController],
    providers: [TCGdbPokemonPriceCurrentService],
    exports: [TCGdbPokemonPriceCurrentService],
})

export class TCGdbPokemonPriceCurrentModule {}