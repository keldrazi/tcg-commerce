import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadProductCardService } from './inventory.batch.load.product.card.service';
import { InventoryBatchLoadProductCardController } from './inventory.batch.load.product.card.controller';
import { InventoryProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/inventory.product.card.entity';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductCardLanguageModule } from 'src/tcgcommerce/modules/product/card/language/product.card.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { PriceProductCardRuleSetModule } from 'src/tcgcommerce/modules/price/product/card/rule/set/price.product.card.rule.set.module';
import { ProductCardPriceModule } from 'src/tcgcommerce/modules/product/card/price/product.card.price.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCard]),
        ProductCardModule,
        ProductVendorModule,
        ProductLineModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductCardLanguageModule,
        ProductCardPrintingModule,
        PriceProductCardRuleSetModule,
        ProductCardPriceModule,
        CommerceLocationModule
    ],
    controllers: [InventoryBatchLoadProductCardController],
    providers: [InventoryBatchLoadProductCardService],
    exports: [InventoryBatchLoadProductCardService]
})
export class InventoryBatchLoadProductCardModule {}
