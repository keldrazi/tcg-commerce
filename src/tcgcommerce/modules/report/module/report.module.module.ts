import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportModuleService } from './report.module.service';
import { ReportModuleController } from './report.module.controller';
import { ReportModule } from 'src/typeorm/entities/tcgcommerce/modules/report/module/report.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ReportModule]),
    ],
    controllers: [ReportModuleController],
    providers: [ReportModuleService],
    exports: [ReportModuleService]
})
export class ReportModuleModule {}
