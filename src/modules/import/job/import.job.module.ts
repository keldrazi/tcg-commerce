import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportJobController } from './import.job.controller';
import { ImportJobService } from './import.job.service';
import { ImportJob } from 'src/typeorm/entities/modules/import/job/import.job.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportJob])
    ],
    controllers: [ImportJobController],
    providers: [ImportJobService],
    exports: [ImportJobService]
})
export class ImportJobModule {}
