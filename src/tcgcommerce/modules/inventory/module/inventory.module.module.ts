import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryModuleService } from './inventory.module.service';
import { InventoryModuleController } from './inventory.module.controller';
import { InventoryModule } from 'src/typeorm/entities/tcgcommerce/modules/inventory/module/inventory.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryModule]),
    ],
    controllers: [InventoryModuleController],
    providers: [InventoryModuleService],
    exports: [InventoryModuleService]
})
export class InventoryModuleModule {}
