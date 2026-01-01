import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';



@Module({
    imports: [
        TCGdbAPIUtilModule,
        HttpModule,
        ConfigModule,
    ], 
    controllers: [],
    providers: [TCGdbMTGPriceChangeDailyService],
    exports: [TCGdbMTGPriceChangeDailyService],
})

export class TCGdbMTGPriceChangeDailyModule {}