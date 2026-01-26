import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentOrderService } from './fullfilment.order.service';
import { FullfilmentOrderController } from './fullfilment.order.controller';
import { FullfilmentOrder } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/fullfilment.order.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentOrder]),
    ],
    controllers: [FullfilmentOrderController],
    providers: [FullfilmentOrderService],
    exports: [FullfilmentOrderService]
})
export class FullfilmentOrderModule {}
