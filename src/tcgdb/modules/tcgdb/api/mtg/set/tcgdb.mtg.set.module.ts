import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGSetService } from './tcgdb.mtg.set.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGSetService],
    exports: [TCGdbMTGSetService],
})

export class TCGdbMTGSetModule {}