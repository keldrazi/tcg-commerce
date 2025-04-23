import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TCGdbMTGPrintingService } from './tcgdb.mtg.printing.service';
import { TCGdbMTGPrintingController } from "./tcgdb.mtg.printing.controller";
import { TCGPlayerMTGPrintingModule } from 'src/tcgdb/modules/tcgplayer/mtg/printing/tcgplayer.mtg.printing.module';
import { TCGdbMTGPrinting } from "src/typeorm/entities/tcgdb/modules/tcgdb/mtg/printing/tcgdb.mtg.printing.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([TCGdbMTGPrinting]),
        TCGPlayerMTGPrintingModule,
    ], 
    controllers: [TCGdbMTGPrintingController],
    providers: [TCGdbMTGPrintingService],
    exports: [TCGdbMTGPrintingService],
})

export class TCGdbMTGPrintingModule {}