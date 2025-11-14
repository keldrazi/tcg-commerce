import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistHotlistProductCardItemService } from './buylist.hotlist.product.card.item.service';
import { BuylistHotlistProductCardItemController } from './buylist.hotlist.product.card.item.controller';
import { BuylistHotlistProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/item/buylist.hotlist.product.card.item.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistHotlistProductCardItem])
    ],
    controllers: [BuylistHotlistProductCardItemController],
    providers: [BuylistHotlistProductCardItemService],
    exports: [BuylistHotlistProductCardItemService]
})
export class BuylistHotlistProductCardItemModule {}