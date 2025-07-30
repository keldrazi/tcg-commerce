import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportJobController } from './import.job.card.controller';
import { ImportJobService } from './import.job.card.service';
import { ImportProcessModule } from 'src/tcgcommerce/modules/import/process/import.process.module';
import { ImportJob } from 'src/typeorm/entities/tcgcommerce/modules/import/job/import.job.entity';
import { AwsS3Module } from 'src/system/modules/aws/s3/aws.s3.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportJob]),
        AwsS3Module,
        ImportProcessModule
    ],
    controllers: [ImportJobController],
    providers: [ImportJobService],
    exports: [ImportJobService]
})
export class ImportJobModule {}
