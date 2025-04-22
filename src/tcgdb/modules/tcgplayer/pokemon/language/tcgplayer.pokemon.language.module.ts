import { Module } from '@nestjs/common';
import { TCGPlayerPokemonLanguageService } from './tcgplayer.pokemon.language.service';
import { TCGPlayerPokemonLanguage } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/language/tcgplayer.pokemon.language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonLanguageController } from './tcgplayer.pokemon.language.controller';
import { TCGPlayerAPILanguageModule } from 'src/tcgdb/modules/tcgplayer/api/language/tcgplayer.api.language.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonLanguage]),
        HttpModule,
        TCGPlayerAPILanguageModule,
    ], 
    controllers: [TCGPlayerPokemonLanguageController],
    providers: [TCGPlayerPokemonLanguageService],
    exports: [TCGPlayerPokemonLanguageService],
})

export class TCGPlayerPokemonLanguageModule {}