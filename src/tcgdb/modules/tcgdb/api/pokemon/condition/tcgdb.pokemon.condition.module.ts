import { Module } from "@nestjs/common";
import { TCGdbPokemonConditionService } from './tcgdb.pokemon.condition.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        TCGdbAPIUtilModule,
        HttpModule,
        ConfigModule,
    ], 
    controllers: [],
    providers: [TCGdbPokemonConditionService],
    exports: [TCGdbPokemonConditionService],
})

export class TCGdbPokemonConditionModule {}