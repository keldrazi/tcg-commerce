import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardItemService } from './inventory.product.card.item.service';
import { InventoryProductCardItemController } from './inventory.product.card.item.controller';
import { InventoryProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/item/inventory.product.card.item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardItem]),
    ],
    controllers: [InventoryProductCardItemController],
    providers: [InventoryProductCardItemService],
    exports: [InventoryProductCardItemService]
})
export class InventoryProductCardItemModule {}
