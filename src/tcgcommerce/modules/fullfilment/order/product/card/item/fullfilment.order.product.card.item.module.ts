import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentOrderService } from './fullfilment.order.service';
import { FullfilmentOrderController } from './fullfilment.order.controller';
import { FullfilmentOrder } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/fullfilment.order.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentOrder]),
        ErrorMessageModule
    ],
    controllers: [FullfilmentOrderController],
    providers: [FullfilmentOrderService],
    exports: [FullfilmentOrderService]
})
export class FullfilmentOrderModule {}
