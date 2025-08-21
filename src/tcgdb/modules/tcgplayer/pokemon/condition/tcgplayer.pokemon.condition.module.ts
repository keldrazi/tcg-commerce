import { Module } from '@nestjs/common';
import { TCGPlayerPokemonConditionService } from './tcgplayer.pokemon.condition.service';
import { TCGPlayerPokemonCondition } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/condition/tcgplayer.pokemon.condition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonConditionController } from './tcgplayer.pokemon.condition.controller';
import { TCGPlayerAPIConditionModule } from 'src/tcgdb/modules/tcgplayer/api/condition/tcgplayer.api.condition.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonCondition]),
        HttpModule,
        TCGPlayerAPIConditionModule,
    ], 
    controllers: [TCGPlayerPokemonConditionController],
    providers: [TCGPlayerPokemonConditionService],
    exports: [TCGPlayerPokemonConditionService],
})

export class TCGPlayerPokemonConditionModule {}