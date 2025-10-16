import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadProductCardService } from './inventory.batch.load.product.card.service';
import { InventoryBatchLoadProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.entity';
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
        TypeOrmModule.forFeature([InventoryBatchLoadProductCard]),
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
    providers: [InventoryBatchLoadProductCardService],
    exports: [InventoryBatchLoadProductCardService]
})
export class InventoryBatchLoadProductCardModule {}
