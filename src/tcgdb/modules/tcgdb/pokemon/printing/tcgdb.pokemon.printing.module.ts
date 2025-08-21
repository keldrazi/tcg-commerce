import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbPokemonPrintingService } from './tcgdb.pokemon.printing.service';
import { TCGdbPokemonPrintingController } from "./tcgdb.pokemon.printing.controller";
import { TCGPlayerPokemonPrintingModule } from 'src/tcgdb/modules/tcgplayer/pokemon/printing/tcgplayer.pokemon.printing.module';
import { TCGdbPokemonPrinting } from "src/typeorm/entities/tcgdb/modules/tcgdb/pokemon/printing/tcgdb.pokemon.printing.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbPokemonPrinting]),
        TCGPlayerPokemonPrintingModule,
    ], 
    controllers: [TCGdbPokemonPrintingController],
    providers: [TCGdbPokemonPrintingService],
    exports: [TCGdbPokemonPrintingService],
})

export class TCGdbPokemonPrintingModule {}