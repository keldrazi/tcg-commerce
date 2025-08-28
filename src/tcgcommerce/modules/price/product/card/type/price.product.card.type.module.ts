import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardTypeService } from './price.product.card.type.service';
import { PriceProductCardTypeController } from './price.product.card.type.controller';
import { PriceProductCardType } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/type/price.product.card.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardType])
    ],
    controllers: [PriceProductCardTypeController],
    providers: [PriceProductCardTypeService],
    exports: [PriceProductCardTypeService]
})
export class PriceProductCardTypeModule {}
