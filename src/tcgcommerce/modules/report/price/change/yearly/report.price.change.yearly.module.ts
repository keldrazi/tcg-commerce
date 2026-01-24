import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeYearlyService } from './report.price.change.yearly.service';
import { ReportPriceChangeYearlyController } from './report.price.change.yearly.controller';
import { ReportPriceChangeYearly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/yearly/report.price.change.yearly.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeYearly]),
    ],
    controllers: [ReportPriceChangeYearlyController],
    providers: [ReportPriceChangeYearlyService],
    exports: [ReportPriceChangeYearlyService]
})
export class ReportPriceChangeYearlyModule {}
