import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistQuicklistProductCardService } from './buylist.quicklist.product.card.service';
import { BuylistQuicklistProductCardController } from './buylist.quicklist.product.card.controller';
import { BuylistQuicklistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/quicklist/product/card/buylist.quicklist.product.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistQuicklistProductCard]),
    ],
    controllers: [BuylistQuicklistProductCardController],
    providers: [BuylistQuicklistProductCardService],
    exports: [BuylistQuicklistProductCardService]
})
export class BuylistQuicklistProductCardModule {}