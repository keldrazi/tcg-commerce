import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistQuicklistProductCardService } from './buylist.quicklist.product.card.service';
import { BuylistQuicklistProductCardController } from './buylist.quicklist.product.card.controller';
import { BuylistQuicklistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/buylist.quicklist.product.card.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistQuicklistProductCard]),
        ErrorMessageModule,
    ],
    controllers: [BuylistQuicklistProductCardController],
    providers: [BuylistQuicklistProductCardService],
    exports: [BuylistQuicklistProductCardService]
})
export class BuylistQuicklistProductCardModule {}