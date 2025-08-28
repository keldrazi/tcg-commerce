import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardRuleSetService } from './price.product.card.rule.set.service';
import { PriceProductCardRuleSetController } from './price.product.card.rule.set.controller';
import { PriceProductCardRuleSet } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/rule/set/price.product.card.rule.set.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardRuleSet])
    ],
    controllers: [PriceProductCardRuleSetController],
    providers: [PriceProductCardRuleSetService],
    exports: [PriceProductCardRuleSetService]
})
export class PriceProductCardRuleSetModule {}
