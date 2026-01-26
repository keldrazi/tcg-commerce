import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardService } from './inventory.product.card.service';
import { InventoryProductCardController } from './inventory.product.card.controller';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCard]),
    ],
    controllers: [InventoryProductCardController],
    providers: [InventoryProductCardService],
    exports: [InventoryProductCardService]
})
export class InventoryProductCardModule {}
