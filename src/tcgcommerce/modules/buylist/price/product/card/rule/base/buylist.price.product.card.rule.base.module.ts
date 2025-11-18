import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPriceProductCardRuleBaseService } from './buylist.price.product.card.rule.base.service';
import { BuylistPriceProductCardRuleBaseController } from './buylist.price.product.card.rule.base.controller';
import { BuylistPriceProductCardRuleBase } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/base/buylist.price.product.card.rule.base.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPriceProductCardRuleBase]),
        ErrorMessageModule
    ],
    controllers: [BuylistPriceProductCardRuleBaseController],
    providers: [BuylistPriceProductCardRuleBaseService],
    exports: [BuylistPriceProductCardRuleBaseService]
})
export class BuylistPriceProductCardRuleBaseModule {}