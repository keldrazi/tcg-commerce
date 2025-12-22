import { Module } from "@nestjs/common";
import { TCGdbPokemonRarityService } from './tcgdb.pokemon.rarity.service';
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
    providers: [TCGdbPokemonRarityService],
    exports: [TCGdbPokemonRarityService],
})

export class TCGdbPokemonRarityModule {}