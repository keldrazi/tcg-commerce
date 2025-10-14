import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardBaseService } from './price.product.card.base.service';
import { PriceProductCardBaseController } from './price.product.card.base.controller';
import { PriceProductCardBase } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/base/price.product.card.base.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardBase])
    ],
    controllers: [PriceProductCardBaseController],
    providers: [PriceProductCardBaseService],
    exports: [PriceProductCardBaseService]
})
export class PriceProductCardBaseModule {}