import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchProductCardService } from './inventory.batch.product.card.service';
import { InventoryBatchProductCardController } from './inventory.batch.product.card.controller';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { ProductCardItemModule } from 'src/tcgcommerce/modules/product/card/item/product.card.item.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductCardLanguageModule } from 'src/tcgcommerce/modules/product/card/language/product.card.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { PricingProductCardRuleSetModule } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.module';
import { ProductCardPriceModule } from 'src/tcgcommerce/modules/product/card/price/product.card.price.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCard]),
        ProductCardItemModule,
        ProductLineModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductCardLanguageModule,
        ProductCardPrintingModule,
        PricingProductCardRuleSetModule,
        ProductCardPriceModule
    ],
    controllers: [InventoryBatchProductCardController],
    providers: [InventoryBatchProductCardService],
    exports: [InventoryBatchProductCardService]
})
export class InventoryBatchProductCardModule {}
