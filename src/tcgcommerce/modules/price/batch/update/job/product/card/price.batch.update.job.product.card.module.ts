import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceBatchUpdateJobProductCardService } from './price.batch.update.job.product.card.service';
import { PriceBatchUpdateJobProductCard } from 'src/typeorm/entities/tcgcommerce/modules/price/batch/update/job/product/card/price.batch.update.job.product.card.entity';
import { ProductSetModule } from 'src/tcgcommerce/modules/product/set/product.set.module';
import { PriceBatchUpdateProductCardModule } from 'src/tcgcommerce/modules/price/batch/update/product/card/price.batch.update.product.card.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([PriceBatchUpdateJobProductCard]),
        ProductSetModule,
        PriceBatchUpdateProductCardModule,
    ],
    controllers: [],
    providers: [PriceBatchUpdateJobProductCardService],
    exports: [PriceBatchUpdateJobProductCardService]
})
export class PriceBatchUpdateJobProductCardModule {}