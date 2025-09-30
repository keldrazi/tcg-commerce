import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGConditionService } from './tcgdb.mtg.condition.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGConditionService],
    exports: [TCGdbMTGConditionService],
})

export class TCGdbMTGConditionModule {}