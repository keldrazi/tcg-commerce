import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPriceProductCardRuleBaseService } from './buylist.price.product.card.rule.base.service';
import { BuylistPriceProductCardRuleBaseController } from './buylist.price.product.card.rule.base.controller';
import { BuylistPriceProductCardRuleBase } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/base/buylist.price.product.card.rule.base.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPriceProductCardRuleBase])
    ],
    controllers: [BuylistPriceProductCardRuleBaseController],
    providers: [BuylistPriceProductCardRuleBaseService],
    exports: [BuylistPriceProductCardRuleBaseService]
})
export class BuylistPriceProductCardRuleBaseModule {}