import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceHistoryService } from './report.price.history.service';
import { ReportPriceHistoryController } from './report.price.history.controller';
import { ReportPriceHistory } from 'src/typeorm/entities/tcgcommerce/modules/report/price/history/report.price.history.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceHistory]),
    ],
    controllers: [ReportPriceHistoryController],
    providers: [ReportPriceHistoryService],
    exports: [ReportPriceHistoryService]
})
export class ReportPriceHistoryModule {}
