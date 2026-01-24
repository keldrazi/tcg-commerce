import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportTypeService } from './report.type.service';
import { ReportTypeController } from './report.type.controller';
import { ReportType } from 'src/typeorm/entities/tcgcommerce/modules/report/type/report.type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportType]),
    ],
    controllers: [ReportTypeController],
    providers: [ReportTypeService],
    exports: [ReportTypeService]
})
export class ReportTypeModule {}
