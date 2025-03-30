import { Module } from '@nestjs/common';
import { TCGPlayerPokemonCardService } from './tcgplayer.pokemon.card.service';
import { TCGPlayerPokemonCard } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/card/tcgplayer.pokemon.card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonCardController } from './tcgplayer.pokemon.card.controller';
import { TCGPlayerAPICardModule } from 'src/tcgdb/modules/tcgplayer/api/card/tcgplayer.api.card.module';
import { TCGPlayerAPIUtilModule } from 'src/tcgdb/modules/tcgplayer/api/util/tcgplayer.api.util.module';
import { TCGPlayerAPISkuModule } from 'src/tcgdb/modules/tcgplayer/api/sku/tcgplayer.api.sku.module';
import { TCGPlayerPokemonSetModule } from 'src/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonCard]),
        HttpModule,
        TCGPlayerPokemonSetModule,
        TCGPlayerAPICardModule,
        TCGPlayerAPIUtilModule,
        TCGPlayerAPISkuModule,
    ], 
    controllers: [TCGPlayerPokemonCardController],
    providers: [TCGPlayerPokemonCardService],
    exports: [TCGPlayerPokemonCardService],
})

export class TCGPlayerPokemonCardModule {}