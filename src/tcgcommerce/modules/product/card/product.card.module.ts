import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardService } from './product.card.service';
import { ProductCardController } from './product.card.controller';
import { ProductCard } from 'src/typeorm/entities/tcgcommerce/modules/product/card/product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/api/mtg/card/tcgdb.mtg.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCard]),
        ProductSetModule,
        ProductLineModule,
        TCGdbMTGCardModule,
    ],
    controllers: [ProductCardController],
    providers: [ProductCardService],
    exports: [ProductCardService]
})
export class ProductCardModule {}
