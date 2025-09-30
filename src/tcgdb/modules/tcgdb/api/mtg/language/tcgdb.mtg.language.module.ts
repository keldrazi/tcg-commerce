import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGLanguageService } from './tcgdb.mtg.language.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGLanguageService],
    exports: [TCGdbMTGLanguageService],
})

export class TCGdbMTGLanguageModule {}