import { Module } from "@nestjs/common";
import { TCGdbPokemonPrintingService } from './tcgdb.pokemon.printing.service';
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
    providers: [TCGdbPokemonPrintingService],
    exports: [TCGdbPokemonPrintingService],
})

export class TCGdbPokemonPrintingModule {}