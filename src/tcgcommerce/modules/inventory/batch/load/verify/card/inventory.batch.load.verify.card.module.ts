
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadProductVerifyCardService } from './inventory.batch.load.verify.card.service';
import { InventoryBatchLoadProductCardModule } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';


@Module({
    imports: [
        InventoryBatchLoadProductCardModule,
        ProductCardModule,
    ],
    controllers: [],
    providers: [InventoryBatchLoadProductVerifyCardService],
    exports: [InventoryBatchLoadProductVerifyCardService]
})
export class InventoryBatchLoadVerifyCardModule {}
