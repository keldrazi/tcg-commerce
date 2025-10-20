import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TCGdbMTGPriceChangeDailyController } from './tcgdb.mtg.price.change.daily.controller';
import { TCGdbMTGPriceChangeDailyService } from './tcgdb.mtg.price.change.daily.service';
import { TCGdbAPIUtilModule } from 'src/tcgdb/modules/tcgdb/api/util/tcgdb.api.util.module';


@Module({
    imports: [
        TCGdbAPIUtilModule,
        HttpModule,
        ConfigModule,
    ], 
    controllers: [TCGdbMTGPriceChangeDailyController],
    providers: [TCGdbMTGPriceChangeDailyService],
    exports: [TCGdbMTGPriceChangeDailyService],
})

export class TCGdbMTGPriceChangeDailyModule {}