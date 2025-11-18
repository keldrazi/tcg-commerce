import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { BuylistPriceProductCardRuleHotlistService } from './buylist.price.product.card.rule.hotlist.service';
import { BuylistPriceProductCardRuleHotlistController } from './buylist.price.product.card.rule.hotlist.controller';
import { BuylistPriceProductCardRuleHotlist } from 'src/typeorm/entities/tcgcommerce/modules/buylist/price/product/card/rule/hotlist/buylist.price.product.card.rule.hotlist.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BuylistPriceProductCardRuleHotlist]),
        ErrorMessageModule
    ],
    controllers: [BuylistPriceProductCardRuleHotlistController],
    providers: [BuylistPriceProductCardRuleHotlistService],
    exports: [BuylistPriceProductCardRuleHotlistService]
})
export class BuylistPriceProductCardRuleHotlistModule {}