import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonLanguageService } from './tcgdb.pokemon.language.service';
import { TCGdbPokemonLanguageController } from "./tcgdb.pokemon.language.controller";
import { TCGPlayerPokemonLanguageModule } from 'src/tcgdb/modules/tcgplayer/pokemon/language/tcgplayer.pokemon.language.module';
import { TCGdbPokemonLanguage } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/language/tcgdb.pokemon.language.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonLanguage]),
        TCGPlayerPokemonLanguageModule,
    ], 
    controllers: [TCGdbPokemonLanguageController],
    providers: [TCGdbPokemonLanguageService],
    exports: [TCGdbPokemonLanguageService],
})

export class TCGdbPokemonLanguageModule {}