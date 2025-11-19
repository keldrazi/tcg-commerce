import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceUpdatePriceJobItemService } from './inventory.product.card.service.update.price.job.item.service';
import { InventoryProductCardServiceUpdatePriceJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.entity';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';
import { PriceRuleProductCardBaseModule } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceUpdatePriceJobItem]),
        ProductCardModule,
        ProductVendorModule,
        ProductLineModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductLanguageModule,
        ProductCardPrintingModule,
        InventoryProductCardModule,
        TCGdbMTGPriceChangeDailyModule,
        PriceRuleProductCardBaseModule,
        ErrorMessageModule,
    ],
    controllers: [],
    providers: [InventoryProductCardServiceUpdatePriceJobItemService],
    exports: [InventoryProductCardServiceUpdatePriceJobItemService]
})
export class InventoryProductCardServiceUpdatePriceJobItemModule {}
