import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGRarityService } from './tcgdb.mtg.rarity.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        TCGdbAPIUtilModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGRarityService],
    exports: [TCGdbMTGRarityService],
})

export class TCGdbMTGRarityModule {}