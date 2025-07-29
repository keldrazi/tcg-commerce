import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryLoadProductCardService } from './inventory.load.product.card.service';
import { InventoryLoadProductCardController } from './inventory.load.product.card.controller';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { ProductCardItemModule } from 'src/tcgcommerce/modules/product/card/item/product.card.item.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductCardLanguageModule } from 'src/tcgcommerce/modules/product/card/language/product.card.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { PricingProductCardRuleSetModule } from 'src/tcgcommerce/modules/pricing/product/card/rule/set/pricing.product.card.rule.set.module';
import { ProductCardPriceModule } from 'src/tcgcommerce/modules/product/card/price/product.card.price.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCard]),
        ProductCardItemModule,
        ProductVendorModule,
        ProductLineModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductCardLanguageModule,
        ProductCardPrintingModule,
        PricingProductCardRuleSetModule,
        ProductCardPriceModule,
        CommerceLocationModule
    ],
    controllers: [InventoryLoadProductCardController],
    providers: [InventoryLoadProductCardService],
    exports: [InventoryLoadProductCardService]
})
export class InventoryLoadProductCardModule {}
