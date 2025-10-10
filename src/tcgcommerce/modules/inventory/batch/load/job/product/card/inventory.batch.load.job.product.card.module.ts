import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadJobProductCardController } from './inventory.batch.load.job.product.card.controller';
import { InventoryBatchLoadJobProductCardService } from './inventory.batch.load.job.product.card.service';
import { InventoryBatchLoadJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { InventoryBatchLoadProductCardModule } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryBatchLoadJobProductCard]),
        ProductSetModule,
        InventoryBatchLoadProductCardModule,
    ],
    controllers: [InventoryBatchLoadJobProductCardController],
    providers: [InventoryBatchLoadJobProductCardService],
    exports: [InventoryBatchLoadJobProductCardService]
})
export class InventoryBatchLoadJobProductCardModule {}
