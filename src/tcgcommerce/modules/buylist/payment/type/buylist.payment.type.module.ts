import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPaymentTypeService } from './buylist.payment.type.service';
import { BuylistPaymentTypeController } from './buylist.payment.type.controller';
import { BuylistPaymentType } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/type/buylist.payment.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPaymentType]),
    ],
    controllers: [BuylistPaymentTypeController],
    providers: [BuylistPaymentTypeService],
    exports: [BuylistPaymentTypeService]
})
export class BuylistPaymentTypeModule {}
