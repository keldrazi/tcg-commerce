import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportJobController } from './import.job.controller';
import { ImportJobService } from './import.job.service';

@Module({
    imports: [
        //TypeOrmModule.forFeature([TCGDatabaseUser])
    ],
    controllers: [ImportJobController],
    providers: [ImportJobService],
    exports: [ImportJobService]
})
export class ImportJobModule {}
