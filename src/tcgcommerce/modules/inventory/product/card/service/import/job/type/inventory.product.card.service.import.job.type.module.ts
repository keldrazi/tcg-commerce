import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceImportJobTypeService } from './inventory.product.card.service.import.job.type.service';
import { InventoryProductCardServiceImportJobTypeController } from './inventory.product.card.service.import.job.type.controller';
import { ImportSortCardType } from 'src/typeorm/entities/tcgcommerce/modules/import/sort/card/type/import.sort.card.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ImportSortCardType])
    ],
    controllers: [InventoryProductCardServiceImportJobTypeController],
    providers: [InventoryProductCardServiceImportJobTypeService],
    exports: [InventoryProductCardServiceImportJobTypeService]
})
export class InventoryProductCardServiceImportJobTypeModule {}