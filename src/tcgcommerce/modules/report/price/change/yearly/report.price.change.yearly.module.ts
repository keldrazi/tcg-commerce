import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeYearlyService } from './report.price.change.yearly.service';
import { ReportPriceChangeYearlyController } from './report.price.change.yearly.controller';
import { ReportPriceChangeYearly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/yearly/report.price.change.yearly.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeYearly]),
        ErrorMessageModule
    ],
    controllers: [ReportPriceChangeYearlyController],
    providers: [ReportPriceChangeYearlyService],
    exports: [ReportPriceChangeYearlyService]
})
export class ReportPriceChangeYearlyModule {}
