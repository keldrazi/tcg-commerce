import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { FullfilmentOrderTypeService } from './fullfilment.order.type.service';
import { FullfilmentOrderTypeController } from './fullfilment.order.type.controller';
import { FullfilmentOrderType } from 'src/typeorm/entities/tcgcommerce/modules/fullfilment/order/type/fullfilment.order.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([FullfilmentOrderType]),
        ErrorMessageModule
    ],
    controllers: [FullfilmentOrderTypeController],
    providers: [FullfilmentOrderTypeService],
    exports: [FullfilmentOrderTypeService]
})
export class FullfilmentOrderTypeModule {}
