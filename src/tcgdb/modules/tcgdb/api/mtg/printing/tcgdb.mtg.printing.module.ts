import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGPrintingService } from './tcgdb.mtg.printing.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPrintingService],
    exports: [TCGdbMTGPrintingService],
})

export class TCGdbMTGPrintingModule {}