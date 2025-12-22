import { Module } from "@nestjs/common";
import { TCGdbPokemonLanguageService } from './tcgdb.pokemon.language.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        HttpModule,
        ConfigModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonLanguageService],
    exports: [TCGdbPokemonLanguageService],
})

export class TCGdbPokemonLanguageModule {}