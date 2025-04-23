import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardPrintingService } from './product.card.printing.service';
import { ProductCardPrintingController } from './product.card.printing.controller';
import { ProductCardPrinting } from 'src/typeorm/entities/tcgcommerce/modules/product/card/printing/product.card.printing.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardPrinting])
    ],
    controllers: [ProductCardPrintingController],
    providers: [ProductCardPrintingService],
    exports: [ProductCardPrintingService]
})
export class ProductCardPrintingModule {}
