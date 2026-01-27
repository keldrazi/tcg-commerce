import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardService } from './buylist.product.card.service';
import { BuylistProductCardController } from './buylist.product.card.controller';
import { BuylistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/buylist.product.card.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistProductCard]),
    ],
    controllers: [BuylistProductCardController],
    providers: [BuylistProductCardService],
    exports: [BuylistProductCardService]
})
export class BuylistProductCardModule {}