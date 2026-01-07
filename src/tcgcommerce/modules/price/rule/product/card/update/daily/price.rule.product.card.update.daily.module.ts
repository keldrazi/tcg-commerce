import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceRuleProductCardUpdateDailyService } from './price.rule.product.card.update.daily.service';
import { PriceRuleProductCardUpdateDailyController } from './price.rule.product.card.update.daily.controller';
import { PriceRuleProductCardUpdateDaily } from 'src/typeorm/entities/tcgcommerce/modules/price/rule/product/card/update/daily/price.rule.product.card.update.daily.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceRuleProductCardUpdateDaily]),
        ErrorMessageModule
    ],
    controllers: [PriceRuleProductCardUpdateDailyController],
    providers: [PriceRuleProductCardUpdateDailyService],
    exports: [PriceRuleProductCardUpdateDailyService]
})
export class PriceRuleProductCardUpdateDailyModule {}