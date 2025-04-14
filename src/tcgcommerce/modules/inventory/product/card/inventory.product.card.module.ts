import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardInventoryService } from './inventory.product.card.service';
import { ProductCardInventoryController } from './inventory.product.card.controller';
import { ProductCardInventory } from 'src/typeorm/entities/tcgcommerce/modules/product/card/inventory/product.card.inventory.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardInventory])
    ],
    controllers: [ProductCardInventoryController],
    providers: [ProductCardInventoryService],
    exports: [ProductCardInventoryService]
})
export class ProductCardInventoryModule {}
