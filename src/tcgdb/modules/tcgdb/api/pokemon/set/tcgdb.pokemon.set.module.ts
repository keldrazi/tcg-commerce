import { Module } from '@nestjs/common';
import { TCGdbPokemonSetService } from './tcgdb.pokemon.set.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonSetService],
    exports: [TCGdbPokemonSetService],
})

export class TCGdbPokemonSetModule {}