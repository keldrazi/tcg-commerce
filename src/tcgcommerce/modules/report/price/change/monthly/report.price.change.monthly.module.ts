import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeMonthlyService } from './report.price.change.monthly.service';
import { ReportPriceChangeMonthlyController } from './report.price.change.monthly.controller';
import { ReportPriceChangeMonthly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/monthly/report.price.change.monthly.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeMonthly]),
    ],
    controllers: [ReportPriceChangeMonthlyController],
    providers: [ReportPriceChangeMonthlyService],
    exports: [ReportPriceChangeMonthlyService]
})
export class ReportPriceChangeMonthlyModule {}
