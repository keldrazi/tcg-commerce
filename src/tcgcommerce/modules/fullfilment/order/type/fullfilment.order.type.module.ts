import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentOrderTypeService } from './fullfilment.order.type.service';
import { FullfilmentOrderTypeController } from './fullfilment.order.type.controller';
import { FullfilmentOrderType } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/type/fullfilment.order.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentOrderType]),
    ],
    controllers: [FullfilmentOrderTypeController],
    providers: [FullfilmentOrderTypeService],
    exports: [FullfilmentOrderTypeService]
})
export class FullfilmentOrderTypeModule {}
