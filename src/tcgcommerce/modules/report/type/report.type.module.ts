import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportTypeService } from './report.type.service';
import { ReportTypeController } from './report.type.controller';
import { ReportType } from 'src/typeorm/entities/tcgcommerce/modules/report/type/report.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ReportType]),
        ErrorMessageModule
    ],
    controllers: [ReportTypeController],
    providers: [ReportTypeService],
    exports: [ReportTypeService]
})
export class ReportTypeModule {}
