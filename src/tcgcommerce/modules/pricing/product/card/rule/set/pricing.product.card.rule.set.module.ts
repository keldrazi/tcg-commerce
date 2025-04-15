import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingProductCardRuleSetService } from './pricing.product.card.rule.set.service';
import { PricingProductCardRuleSetController } from './pricing.product.card.rule.set.controller';
import { PricingProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PricingProductCardRuleSet])
    ],
    controllers: [PricingProductCardRuleSetController],
    providers: [PricingProductCardRuleSetService],
    exports: [PricingProductCardRuleSetService]
})
export class PricingProductCardModule {}
