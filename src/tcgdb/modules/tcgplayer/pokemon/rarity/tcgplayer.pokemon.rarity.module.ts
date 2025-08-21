import { Module } from '@nestjs/common';
import { TCGPlayerPokemonRarityService } from './tcgplayer.pokemon.rarity.service';
import { TCGPlayerPokemonRarity } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/rarity/tcgplayer.pokemon.rarity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonRarityController } from './tcgplayer.pokemon.rarity.controller';
import { TCGPlayerAPIRarityModule } from 'src/tcgdb/modules/tcgplayer/api/rarity/tcgplayer.api.rarity.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonRarity]),
        HttpModule,
        TCGPlayerAPIRarityModule,
    ], 
    controllers: [TCGPlayerPokemonRarityController],
    providers: [TCGPlayerPokemonRarityService],
    exports: [TCGPlayerPokemonRarityService],
})

export class TCGPlayerPokemonRarityModule {}