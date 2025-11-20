import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardService } from './buylist.product.card.service';
import { BuylistProductCardController } from './buylist.product.card.controller';
import { BuylistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/product/card/buylist.product.card.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistProductCard]),
        ErrorMessageModule
    ],
    controllers: [BuylistProductCardController],
    providers: [BuylistProductCardService],
    exports: [BuylistProductCardService]
})
export class BuylistProductCardModule {}