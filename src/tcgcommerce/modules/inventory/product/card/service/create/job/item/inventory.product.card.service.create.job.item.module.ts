import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryProductCardServiceCreateJobItemService } from './inventory.product.card.service.create.job.item.service';
import { InventoryProductCardServiceCreateJobItem } from 'src/typeorm/entities/tcgcommerce/modules/inventory/product/card/service/create/job/item/inventory.product.card.service.create.job.item.entity';
import { InventoryProductCardModule } from 'src/tcgcommerce/modules/inventory/product/card/inventory.product.card.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { CommerceLocationModule } from 'src/tcgcommerce/modules/commerce/location/commerce.location.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryProductCardServiceCreateJobItem]),
        ProductCardModule,
        ProductVendorModule,
        ProductLineModule,
        ProductSetModule,
        ProductCardConditionModule,
        ProductLanguageModule,
        ProductCardPrintingModule,
        CommerceLocationModule,
        InventoryProductCardModule,
    ],
    controllers: [],
    providers: [InventoryProductCardServiceCreateJobItemService],
    exports: [InventoryProductCardServiceCreateJobItemService]
})
export class InventoryProductCardServiceCreateJobItemModule {}
