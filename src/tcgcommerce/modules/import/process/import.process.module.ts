import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProcessController } from './import.process.controller';
import { ImportProcessService } from './import.process.service';

@Module({
    imports: [
        
    ],
    controllers: [ImportProcessController],
    providers: [ImportProcessService],
    exports: [ImportProcessService]
})
export class ImportProcessModule {}
