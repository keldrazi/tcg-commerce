import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportJobCardController } from './import.job.card.controller';
import { ImportJobCardService } from './import.job.card.service';
//import { ImportProcessModule } from 'src/tcgcommerce/modules/import/process/import.process.module';
import { ImportJobCard } from 'src/typeorm/entities/tcgcommerce/modules/import/job/card/import.job.card.entity';
import { AwsS3Module } from 'src/system/modules/aws/s3/aws.s3.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportJobCard]),
        AwsS3Module,
        //ImportProcessModule
    ],
    controllers: [ImportJobCardController],
    providers: [ImportJobCardService],
    exports: [ImportJobCardService]
})
export class ImportJobCardModule {}
