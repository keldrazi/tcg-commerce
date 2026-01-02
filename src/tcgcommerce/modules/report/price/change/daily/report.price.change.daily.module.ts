import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeDailyService } from './report.price.change.daily.service';
import { ReportPriceChangeDailyController } from './report.price.change.daily.controller';
import { ReportPriceChangeDaily } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/daily/report.price.change.daily.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeDaily]),
        ErrorMessageModule
    ],
    controllers: [ReportPriceChangeDailyController],
    providers: [ReportPriceChangeDailyService],
    exports: [ReportPriceChangeDailyService]
})
export class ReportPriceChangeDailyModule {}
