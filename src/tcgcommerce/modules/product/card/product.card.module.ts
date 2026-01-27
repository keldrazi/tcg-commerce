import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardService } from './product.card.service';
import { ProductCardController } from './product.card.controller';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ProductTypeModule } from 'src/tcgcommerce/modules/product/type/product.type.module';
import { ProductCardRarityModule } from 'src/tcgcommerce/modules/product/card/rarity/product.card.rarity.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCard]),
        ProductSetModule,
        ProductLineModule,
        ProductVendorModule,
        ProductTypeModule,
        ProductCardRarityModule,
        TCGdbMTGCardModule,
    ],
    controllers: [ProductCardController],
    providers: [ProductCardService],
    exports: [ProductCardService]
})
export class ProductCardModule {}
