import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceUpdatePriceJobController } from './inventory.product.card.service.update.price.job.controller';
import { InventoryProductCardServiceUpdatePriceJobService } from './inventory.product.card.service.update.price.job.service';
import { InventoryProductCardServiceUpdatePriceJob } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/update/price/job/inventory.product.card.service.update.price.job.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { InventoryProductCardServiceUpdatePriceJobItemModule } from 'src/tcgcommerce/modules/inventory/product/card/service/update/price/job/item/inventory.product.card.service.update.price.job.item.module';
import { CommerceAccountModule } from 'src/tcgcommerce/modules/commerce/account/commerce.account.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductTypeModule } from 'src/tcgcommerce/modules/product/type/product.type.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { PriceRuleProductCardUpdateDailyModule } from 'src/tcgcommerce/modules/price/rule/product/card/update/daily/price.rule.product.card.update.daily.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceUpdatePriceJob]),
        ProductSetModule,
        InventoryProductCardServiceUpdatePriceJobItemModule,
        CommerceAccountModule,
        CommerceLocationModule,
        ProductVendorModule,
        ProductLineModule,
        ProductTypeModule,
        ProductLanguageModule,
        PriceRuleProductCardUpdateDailyModule,
        ErrorMessageModule
    ],
    controllers: [InventoryProductCardServiceUpdatePriceJobController],
    providers: [InventoryProductCardServiceUpdatePriceJobService],
    exports: [InventoryProductCardServiceUpdatePriceJobService]
})
export class InventoryProductCardServiceUpdatePriceJobModule {}
