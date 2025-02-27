import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardItemService } from './product.card.item.service';
import { ProductCardItemController } from './product.card.item.controller';
import { ProductCardItem } from 'src/typeorm/entities/modules/product/card/item/product.card.item.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardItem])
    ],
    controllers: [ProductCardItemController],
    providers: [ProductCardItemService],
    exports: [ProductCardItemService]
})
export class ProductCardItemModule {}
