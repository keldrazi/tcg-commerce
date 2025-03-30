import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardInventoryService } from './product.card.inventory.service';
import { ProductCardInventoryController } from './product.card.inventory.controller';
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
