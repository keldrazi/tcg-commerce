import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportPriceCurrentService } from './report.price.current.service';
import { ReportPriceCurrentController } from './report.price.current.controller';
import { ReportPriceCurrent } from 'src/typeorm/entities/tcgcommerce/modules/report/price/current/report.price.current.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportPriceCurrent]),
    ],
    controllers: [ReportPriceCurrentController],
    providers: [ReportPriceCurrentService],
    exports: [ReportPriceCurrentService]
})
export class ReportPriceCurrentModule {}
