import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardItemService } from './product.card.item.service';
import { ProductCardItemController } from './product.card.item.controller';
import { ProductCardItem } from 'src/typeorm/entities/tcgcommerce/modules/product/card/item/product.card.item.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { TCGdbMTGCardModule } from 'src/tcgdb/modules/tcgdb/mtg/card/tcgdb.mtg.card.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardItem]),
        ProductSetModule,
        TCGdbMTGCardModule,
    ],
    controllers: [ProductCardItemController],
    providers: [ProductCardItemService],
    exports: [ProductCardItemService]
})
export class ProductCardItemModule {}
