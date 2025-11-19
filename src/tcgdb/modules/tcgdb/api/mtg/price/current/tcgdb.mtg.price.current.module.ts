import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TCGdbMTGPriceCurrentService } from './tcgdb.mtg.price.current.service';
import { TCGdbMTGPriceCurrentController } from "./tcgdb.mtg.price.current.controller";
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';

@Module({
    imports: [
        TCGdbAPIUtilModule,
        ConfigModule,
        HttpModule,
    ], 
    controllers: [TCGdbMTGPriceCurrentController],
    providers: [TCGdbMTGPriceCurrentService],
    exports: [TCGdbMTGPriceCurrentService],
})

export class TCGdbMTGPriceCurrentModule {}