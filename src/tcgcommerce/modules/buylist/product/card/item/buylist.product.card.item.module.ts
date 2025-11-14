import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardItemService } from './buylist.product.card.item.service';
import { BuylistProductCardItemController } from './buylist.product.card.item.controller';
import { BuylistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/item/buylist.product.card.item.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistProductCardItem])
    ],
    controllers: [BuylistProductCardItemController],
    providers: [BuylistProductCardItemService],
    exports: [BuylistProductCardItemService]
})
export class BuylistProductCardItemModule {}