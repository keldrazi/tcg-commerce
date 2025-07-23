import { Module } from '@nestjs/common';
import { ProductCardPriceService } from './product.card.price.service';
import { ProductCardPriceController } from './product.card.price.controller';
import { TCGdbMTGPriceCurrentModule } from 'src/tcgdb/modules/tcgdb/mtg/price/current/tcgdb.mtg.price.current.module';

@Module({
    imports: [
        TCGdbMTGPriceCurrentModule,
    ],
    controllers: [ProductCardPriceController],
    providers: [ProductCardPriceService],
    exports: [ProductCardPriceService]
})
export class ProductCardPriceModule {}
