import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistProductCardImageService } from './buylist.product.card.image.service';
import { BuylistProductCardImageController } from './buylist.product.card.image.controller';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';

@Module({
    imports: [
        ErrorMessageModule,
        ProductCardModule,
    ],
    controllers: [BuylistProductCardImageController],
    providers: [BuylistProductCardImageService],
    exports: [BuylistProductCardImageService]
})
export class BuylistProductCardImageModule {}