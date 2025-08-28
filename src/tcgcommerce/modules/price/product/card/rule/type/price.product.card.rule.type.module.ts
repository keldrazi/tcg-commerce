import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceProductCardRuleTypeService } from './price.product.card.rule.type.service';
import { PriceProductCardRuleTypeController } from './price.product.card.rule.type.controller';
import { PriceProductCardRuleType } from 'src/typeorm/entities/tcgcommerce/modules/price/product/card/rule/type/price.product.card.rule.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([PriceProductCardRuleType])
    ],
    controllers: [PriceProductCardRuleTypeController],
    providers: [PriceProductCardRuleTypeService],
    exports: [PriceProductCardRuleTypeService]
})
export class PriceProductCardRuleTypeModule {}
