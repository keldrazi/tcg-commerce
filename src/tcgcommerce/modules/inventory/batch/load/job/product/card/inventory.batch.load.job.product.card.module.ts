import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadJobProductCardController } from './inventory.batch.load.job.product.card.controller';
import { InventoryBatchLoadJobProductCardService } from './inventory.batch.load.job.product.card.service';
import { InventoryBatchLoadJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryBatchLoadJobProductCard]),
    ],
    controllers: [InventoryBatchLoadJobProductCardController],
    providers: [InventoryBatchLoadJobProductCardService],
    exports: [InventoryBatchLoadJobProductCardService]
})
export class InventoryBatchLoadJobProductCardModule {}
