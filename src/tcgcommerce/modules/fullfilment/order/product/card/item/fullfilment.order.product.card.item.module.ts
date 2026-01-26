import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentOrderProductCardItemService } from './fullfilment.order.product.card.item.service';
import { FullfilmentOrderProductCardItemController } from './fullfilment.order.product.card.item.controller';
import { FullfilmentOrderProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/product/card/item/fullfilment.order.product.card.item.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentOrderProductCardItem]),
    ],
    controllers: [FullfilmentOrderProductCardItemController],
    providers: [FullfilmentOrderProductCardItemService],
    exports: [FullfilmentOrderProductCardItemService]
})
export class FullfilmentOrderProductCardItemModule {}
