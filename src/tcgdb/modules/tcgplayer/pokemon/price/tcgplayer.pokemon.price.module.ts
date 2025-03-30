import { Module } from '@nestjs/common';
import { TCGPlayerPokemonPriceService } from './tcgplayer.pokemon.price.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonPriceController } from './tcgplayer.pokemon.price.controller';
import { TCGPlayerAPIPriceModule } from 'src/tcgdb/modules/tcgplayer/api/price/tcgplayer.api.price.module';
import { TCGPlayerPokemonSetModule } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.module';
import { TCGPlayerPokemonPrice } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/price/tcgplayer.pokemon.price.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonPrice]),
        HttpModule,
        TCGPlayerPokemonSetModule,
        TCGPlayerAPIPriceModule,
    ], 
    controllers: [TCGPlayerPokemonPriceController],
    providers: [TCGPlayerPokemonPriceService],
    exports: [TCGPlayerPokemonPriceService],
})

export class TCGPlayerPokemonPriceModule {}