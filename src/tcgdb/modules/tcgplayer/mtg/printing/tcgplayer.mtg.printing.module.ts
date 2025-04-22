import { Module } from '@nestjs/common';
import { TCGPlayerMTGPrintingService } from './tcgplayer.mtg.printing.service';
import { TCGPlayerMTGPrinting } from 'src/typeorm/entities/tcgdb/modules/tcgplayer/mtg/printing/tcgplayer.mtg.printing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TCGPlayerMTGPrintingController } from './tcgplayer.mtg.printing.controller';
import { TCGPlayerAPIPrintingModule } from 'src/tcgdb/modules/tcgplayer/api/printing/tcgplayer.api.printing.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([TCGPlayerMTGPrinting]),
        HttpModule,
        TCGPlayerAPIPrintingModule,
    ], 
    controllers: [TCGPlayerMTGPrintingController],
    providers: [TCGPlayerMTGPrintingService],
    exports: [TCGPlayerMTGPrintingService],
})

export class TCGPlayerMTGPrintingModule {}