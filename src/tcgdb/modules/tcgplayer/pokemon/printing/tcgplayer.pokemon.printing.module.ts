import { Module } from '@nestjs/common';
import { TCGPlayerPokemonPrintingService } from './tcgplayer.pokemon.printing.service';
import { TCGPlayerPokemonPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/pokemon/printing/tcgplayer.pokemon.printing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerPokemonPrintingController } from './tcgplayer.pokemon.printing.controller';
import { TCGPlayerAPIPrintingModule } from 'src/tcgdb/modules/tcgplayer/api/printing/tcgplayer.api.printing.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerPokemonPrinting]),
        HttpModule,
        TCGPlayerAPIPrintingModule,
    ], 
    controllers: [TCGPlayerPokemonPrintingController],
    providers: [TCGPlayerPokemonPrintingService],
    exports: [TCGPlayerPokemonPrintingService],
})

export class TCGPlayerPokemonPrintingModule {}