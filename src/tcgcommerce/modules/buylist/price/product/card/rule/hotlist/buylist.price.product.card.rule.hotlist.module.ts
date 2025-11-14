import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPriceProductCardRuleHotlistService } from './buylist.price.product.card.rule.hotlist.service';
import { BuylistPriceProductCardRuleHotlistController } from './buylist.price.product.card.rule.hotlist.controller';
import { BuylistPriceProductCardRuleHotlist } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/hotlist/buylist.price.product.card.rule.hotlist.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPriceProductCardRuleHotlist])
    ],
    controllers: [BuylistPriceProductCardRuleHotlistController],
    providers: [BuylistPriceProductCardRuleHotlistService],
    exports: [BuylistPriceProductCardRuleHotlistService]
})
export class BuylistPriceProductCardRuleHotlistModule {}