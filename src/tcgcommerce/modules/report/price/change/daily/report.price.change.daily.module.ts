import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeDailyService } from './report.price.change.daily.service';
import { ReportPriceChangeDailyController } from './report.price.change.daily.controller';
import { ReportPriceChangeDaily } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/daily/report.price.change.daily.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeDaily]),
    ],
    controllers: [ReportPriceChangeDailyController],
    providers: [ReportPriceChangeDailyService],
    exports: [ReportPriceChangeDailyService]
})
export class ReportPriceChangeDailyModule {}
