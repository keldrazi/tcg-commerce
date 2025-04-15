import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingProductCardTypeService } from './pricing.product.card.type.service';
import { PricingProductCardTypeController } from './pricing.product.card.type.controller';
import { PricingProductCardType } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/type/pricing.product.card.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PricingProductCardType])
    ],
    controllers: [PricingProductCardTypeController],
    providers: [PricingProductCardTypeService],
    exports: [PricingProductCardTypeService]
})
export class PricingProductCardTypeModule {}
