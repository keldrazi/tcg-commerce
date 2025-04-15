import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PricingProductCardRuleTypeService } from './pricing.product.card.rule.type.service';
import { PricingProductCardRuleTypeController } from './pricing.product.card.rule.type.controller';
import { PricingProductCardRuleType } from 'src/typeorm/entities/tcgcommerce/modules/pricing/product/card/rule/type/pricing.product.card.rule.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PricingProductCardRuleType])
    ],
    controllers: [PricingProductCardRuleTypeController],
    providers: [PricingProductCardRuleTypeService],
    exports: [PricingProductCardRuleTypeService]
})
export class PricingProductCardRuleTypeModule {}
