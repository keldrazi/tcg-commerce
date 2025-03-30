import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSModuleService } from './pos.module.service';
import { POSModuleController } from './pos.module.controller';
import { POSModule } from 'src/typeorm/entities/modules/pos/module/pos.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSModule])
    ],
    controllers: [POSModuleController],
    providers: [POSModuleService],
    exports: [POSModuleService]
})
export class POSModuleModule {}
