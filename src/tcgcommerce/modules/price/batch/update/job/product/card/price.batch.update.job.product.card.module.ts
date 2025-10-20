import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceBatchUpdateJobProductCardService } from './price.batch.update.job.product.card.service';
import { PriceBatchUpdateJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/price/batch/update/job/product/card/price.batch.update.job.product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductTypeModule } from 'src/tcgcommerce/modules/product/type/product.type.module';
import { ProductLanguageModule } from 'src/tcgcommerce/modules/product/language/product.language.module';
import { PriceBatchUpdateProductCardModule } from 'src/tcgcommerce/modules/price/batch/update/product/card/price.batch.update.product.card.module';
import { PriceRuleProductCardBaseModule } from 'src/tcgcommerce/modules/price/rule/product/card/base/price.rule.product.card.base.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceBatchUpdateJobProductCard]),
        ProductSetModule,
        ProductVendorModule,
        ProductLineModule,
        ProductTypeModule,
        ProductLanguageModule,
        PriceBatchUpdateProductCardModule,
        PriceRuleProductCardBaseModule,
    ],
    controllers: [],
    providers: [PriceBatchUpdateJobProductCardService],
    exports: [PriceBatchUpdateJobProductCardService]
})
export class PriceBatchUpdateJobProductCardModule {}