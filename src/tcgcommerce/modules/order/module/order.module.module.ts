import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderModuleService } from './order.module.service';
import { OrderModuleController } from './order.module.controller';
import { OrderModule } from 'src/typeorm/entities/tcgcommerce/modules/order/module/order.module.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderModule]),
        ErrorMessageModule
    ],
    controllers: [OrderModuleController],
    providers: [OrderModuleService],
    exports: [OrderModuleService]
})
export class OrderModuleModule {}
