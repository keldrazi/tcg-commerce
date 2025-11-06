import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceImportJobTypeService } from './inventory.product.card.service.import.job.provider.type.service';
import { InventoryProductCardServiceImportJobTypeController } from './inventory.product.card.service.import.job.provider.type.controller';
import { InventoryProductCardServiceImportJobType } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/import/job/provider/type/inventory.product.card.service.import.job.provider.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceImportJobType])
    ],
    controllers: [InventoryProductCardServiceImportJobTypeController],
    providers: [InventoryProductCardServiceImportJobTypeService],
    exports: [InventoryProductCardServiceImportJobTypeService]
})
export class InventoryProductCardServiceImportJobTypeModule {}