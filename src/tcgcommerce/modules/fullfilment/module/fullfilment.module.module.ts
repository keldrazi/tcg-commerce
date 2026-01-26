import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentModuleService } from './fullfilment.module.service';
import { FullfilmentModuleController } from './fullfilment.module.controller';
import { FullfilmentModule } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/module/fullfilment.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentModule]),
    ],
    controllers: [FullfilmentModuleController],
    providers: [FullfilmentModuleService],
    exports: [FullfilmentModuleService]
})
export class FullfilmentModuleModule {}
