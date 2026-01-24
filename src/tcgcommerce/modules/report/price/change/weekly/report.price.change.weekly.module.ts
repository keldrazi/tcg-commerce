import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeWeeklyService } from './report.price.change.weekly.service';
import { ReportPriceChangeWeeklyController } from './report.price.change.weekly.controller';
import { ReportPriceChangeWeekly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/weekly/report.price.change.weekly.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeWeekly]),
    ],
    controllers: [ReportPriceChangeWeeklyController],
    providers: [ReportPriceChangeWeeklyService],
    exports: [ReportPriceChangeWeeklyService]
})
export class ReportPriceChangeWeeklyModule {}
