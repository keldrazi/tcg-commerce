import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductCardSearchService } from './product.card.search.service';
import { ProductCardSearchController } from './product.card.search.controller';
import { AiImageCardServiceXimilarModule } from 'src/system/modules/ai/image/card/service/ximilar/ai.image.card.service.ximilar.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCard]),
        ProductLineModule,
        ProductSetModule,
        AiImageCardServiceXimilarModule
    ],
    controllers: [ProductCardSearchController],
    providers: [ProductCardSearchService],
    exports: [ProductCardSearchService]
})
export class ProductCardSearchModule {}