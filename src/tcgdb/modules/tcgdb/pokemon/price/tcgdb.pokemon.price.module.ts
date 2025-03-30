import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPriceService } from './tcgdb.pokemon.price.service';
import { TCGdbPokemonPriceController } from "./tcgdb.pokemon.price.controller";
import { TCGPlayerPokemonPriceModule } from 'src/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.module';
import { TCGdbPokemonCardModule } from 'src/tcgdb/modules/tcgdb/pokemon/card/tcgdb.pokemon.card.module';
import { TCGdbPokemonPrice } from 'src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/price/tcgdb.pokemon.price.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPrice]),
        TCGdbPokemonCardModule,
        TCGPlayerPokemonPriceModule,
    ], 
    controllers: [TCGdbPokemonPriceController],
    providers: [TCGdbPokemonPriceService],
    exports: [TCGdbPokemonPriceService],
})

export class TCGdbPokemonPriceModule {}