import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceBatchUpdateProductCardService } from './price.batch.update.product.card.service';
import { PriceBatchUpdateProductCard } from 'src/typeorm/entities/tcgcommerce/modules/price/batch/update/product/card/price.batch.update.product.card.entity';
import { TCGdbMTGPriceChangeDailyModule } from 'src/tcgdb/modules/tcgdb/api/mtg/price/change/daily/tcgdb.mtg.price.change.daily.module';
import { ProductCardModule } from 'src/tcgcommerce/modules/product/card/product.card.module';



@Module({
    imports: [
        TypeOrmModule.forFeature([PriceBatchUpdateProductCard])
    ],
    controllers: [],
    providers: [PriceBatchUpdateProductCardService],
    exports: [PriceBatchUpdateProductCardService]
})
export class PriceBatchUpdateProductCardModule {}