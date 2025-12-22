import { Module } from "@nestjs/common";
import { TCGdbPokemonCardService } from './tcgdb.pokemon.card.service';
import { TCGdbPokemonSetModule } from 'src/tcgdb/modules/tcgdb/api/pokemon/set/tcgdb.pokemon.set.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        TCGdbAPIUtilModule,
        TCGdbPokemonSetModule,
        HttpModule,
        ConfigModule, 
    ], 
    controllers: [],
    providers: [TCGdbPokemonCardService],
    exports: [TCGdbPokemonCardService],
})

export class TCGdbPokemonCardModule {}