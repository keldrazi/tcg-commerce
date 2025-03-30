import { Module } from '@nestjs/common';
import { TCGPlayerPokemonSetService } from './tcgplayer.pokemon.set.service';
import { TCGPlayerPokemonSet } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/set/tcgplayer.pokemon.set.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonSetController } from './tcgplayer.pokemon.set.controller';
import { TCGPlayerAPISetModule } from 'src/tcgdb/modules/tcgplayer/api/set/tcgplayer.api.set.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonSet]),
        HttpModule,
        TCGPlayerAPISetModule,
    ], 
    controllers: [TCGPlayerPokemonSetController],
    providers: [TCGPlayerPokemonSetService],
    exports: [TCGPlayerPokemonSetService],
})

export class TCGPlayerPokemonSetModule {}