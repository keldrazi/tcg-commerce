import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceRuleProductCardBaseService } from './price.rule.product.card.base.service';
import { PriceRuleProductCardBaseController } from './price.rule.product.card.base.controller';
import { PriceRuleProductCardBase } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceRuleProductCardBase])
    ],
    controllers: [PriceRuleProductCardBaseController],
    providers: [PriceRuleProductCardBaseService],
    exports: [PriceRuleProductCardBaseService]
})
export class PriceRuleProductCardBaseModule {}