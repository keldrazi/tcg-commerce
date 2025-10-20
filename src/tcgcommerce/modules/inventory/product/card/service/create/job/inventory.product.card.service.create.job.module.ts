import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadJobProductCardController } from './inventory.product.card.service.create.job.controller';
import { InventoryBatchLoadJobProductCardService } from './inventory.product.card.service.create.job.service';
import { InventoryBatchLoadJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/job/product/card/inventory.batch.load.job.product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { InventoryBatchLoadProductCardModule } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.module';
import { InventoryBatchLoadPriceCardModule } from 'src/tcgcommerce/modules/inventory/batch/load/price/card/inventory.batch.load.price.card.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryBatchLoadJobProductCard]),
        ProductSetModule,
        InventoryBatchLoadProductCardModule,
        InventoryBatchLoadPriceCardModule,
    ],
    controllers: [InventoryBatchLoadJobProductCardController],
    providers: [InventoryBatchLoadJobProductCardService],
    exports: [InventoryBatchLoadJobProductCardService]
})
export class InventoryBatchLoadJobProductCardModule {}
