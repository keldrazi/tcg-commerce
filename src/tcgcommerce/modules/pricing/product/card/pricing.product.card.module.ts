import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingProductCardService } from './pricing.product.card.service';
import { PricingProductCardController } from './pricing.product.card.controller';
import { PricingProductCard } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/pricing.product.card.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PricingProductCard])
    ],
    controllers: [PricingProductCardController],
    providers: [PricingProductCardService],
    exports: [PricingProductCardService]
})
export class PricingProductCardModule {}
