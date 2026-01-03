import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceChangeMonthlyService } from './report.price.change.monthly.service';
import { ReportPriceChangeMonthlyController } from './report.price.change.monthly.controller';
import { ReportPriceChangeMonthly } from 'src/typeorm/entities/tcgcommerce/modules/report/price/change/monthly/report.price.change.monthly.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceChangeMonthly]),
        ErrorMessageModule
    ],
    controllers: [ReportPriceChangeMonthlyController],
    providers: [ReportPriceChangeMonthlyService],
    exports: [ReportPriceChangeMonthlyService]
})
export class ReportPriceChangeMonthlyModule {}
