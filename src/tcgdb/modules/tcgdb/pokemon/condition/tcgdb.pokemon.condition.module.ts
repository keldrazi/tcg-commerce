import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonConditionService } from './tcgdb.pokemon.condition.service';
import { TCGdbPokemonConditionController } from "./tcgdb.pokemon.condition.controller";
import { TCGPlayerPokemonConditionModule } from 'src/tcgdb/modules/tcgplayer/pokemon/condition/tcgplayer.pokemon.condition.module';
import { TCGdbPokemonCondition } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/condition/tcgdb.pokemon.condition.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonCondition]),
        TCGPlayerPokemonConditionModule,
    ], 
    controllers: [TCGdbPokemonConditionController],
    providers: [TCGdbPokemonConditionService],
    exports: [TCGdbPokemonConditionService],
})

export class TCGdbPokemonConditionModule {}