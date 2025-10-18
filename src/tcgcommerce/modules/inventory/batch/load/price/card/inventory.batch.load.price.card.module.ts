
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryBatchLoadProductPriceCardService } from './inventory.batch.load.price.card.service';
import { InventoryBatchLoadProductCard } from 'src/typeorm/entities/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.entity';
import { InventoryBatchLoadProductCardModule } from 'src/tcgcommerce/modules/inventory/batch/load/product/card/inventory.batch.load.product.card.module';
import { ProductCardConditionModule } from 'src/tcgcommerce/modules/product/card/condition/product.card.condition.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { ProductCardPrintingModule } from 'src/tcgcommerce/modules/product/card/printing/product.card.printing.module';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/current/tcgdb.mtg.price.current.module';
import { PriceRuleProductCardBaseModule } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryBatchLoadProductCard]),
        ProductCardConditionModule,
        ProductLanguageModule,
        ProductCardPrintingModule,
        InventoryBatchLoadProductCardModule,
        TCGdbMTGPriceCurrentModule,
        PriceRuleProductCardBaseModule,
    ],
    controllers: [],
    providers: [InventoryBatchLoadProductPriceCardService],
    exports: [InventoryBatchLoadProductPriceCardService]
})
export class InventoryBatchLoadPriceCardModule {}
