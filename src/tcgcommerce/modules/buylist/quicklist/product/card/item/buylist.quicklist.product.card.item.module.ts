import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistQuicklistProductCardItemService } from './buylist.quicklist.product.card.item.service';
import { BuylistQuicklistProductCardItemController } from './buylist.quicklist.product.card.item.controller';
import { BuylistQuicklistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/item/buylist.quicklist.product.card.item.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistQuicklistProductCardItem]),
    ],
    controllers: [BuylistQuicklistProductCardItemController],
    providers: [BuylistQuicklistProductCardItemService],
    exports: [BuylistQuicklistProductCardItemService]
})
export class BuylistQuicklistProductCardItemModule {}