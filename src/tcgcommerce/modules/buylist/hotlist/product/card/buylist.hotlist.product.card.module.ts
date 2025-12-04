import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistHotlistProductCardService } from './buylist.hotlist.product.card.service';
import { BuylistHotlistProductCardController } from './buylist.hotlist.product.card.controller';
import { BuylistHotlistProductCard } from 'src/typeorm/entities/tcgcommerce/modules/buylist/hotlist/product/card/buylist.hotlist.product.card.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistHotlistProductCard]),
        ErrorMessageModule,
    ],
    controllers: [BuylistHotlistProductCardController],
    providers: [BuylistHotlistProductCardService],
    exports: [BuylistHotlistProductCardService]
})
export class BuylistHotlistProductCardModule {}