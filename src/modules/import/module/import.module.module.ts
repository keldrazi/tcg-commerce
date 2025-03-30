import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportModuleService } from './import.module.service';
import { ImportModuleController } from './import.module.controller';
import { ImportModule } from 'src/typeorm/entities/modules/import/module/import.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportModule])
    ],
    controllers: [ImportModuleController],
    providers: [ImportModuleService],
    exports: [ImportModuleService]
})
export class ImportModuleModule {}
