import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceCreateJobController } from './inventory.product.card.service.import.job.controller';
import { InventoryProductCardServiceCreateJobService } from './inventory.product.card.service.import.job.service';
import { InventoryProductCardServiceCreateJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/create/job/inventory.product.card.service.create.job.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { InventoryProductCardServiceCreateJobItemModule } from 'src/tcgcommerce/modules/inventory/product/card/service/create/job/item/inventory.product.card.service.create.job.item.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceCreateJob]),
        ProductSetModule,
        InventoryProductCardServiceCreateJobItemModule,
    ],
    controllers: [InventoryProductCardServiceCreateJobController],
    providers: [InventoryProductCardServiceCreateJobService],
    exports: [InventoryProductCardServiceCreateJobService]
})
export class InventoryProductCardServiceCreateJobModule {}
