import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPaymentServiceService } from './buylist.payment.service.service';
import { BuylistPaymentServiceController } from './buylist.payment.service.controller';
import { BuylistPaymentService } from 'src/typeorm/entities/tcgcommerce/modules/buylist/payment/service/buylist.payment.service.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPaymentService])
    ],
    controllers: [BuylistPaymentServiceController],
    providers: [BuylistPaymentServiceService],
    exports: [BuylistPaymentServiceService]
})
export class BuylistPaymentServiceModule {}
