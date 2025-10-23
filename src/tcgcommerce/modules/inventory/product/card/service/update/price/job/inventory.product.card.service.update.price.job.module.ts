import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceUpdatePriceJobController } from './inventory.product.card.service.update.price.job.controller';
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { InventoryProductCardServiceUpdatePriceJobItemModule } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceUpdatePriceJob]),
        ProductSetModule,
        InventoryProductCardServiceUpdatePriceJobItemModule,
    ],
    controllers: [InventoryProductCardServiceUpdatePriceJobController],
    providers: [InventoryProductCardServiceUpdatePriceJobService],
    exports: [InventoryProductCardServiceUpdatePriceJobService]
})
export class InventoryProductCardServiceUpdatePriceJobModule {}
