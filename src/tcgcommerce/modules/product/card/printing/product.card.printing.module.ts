import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardPrintingService } from './product.card.printing.service';
import { ProductCardPrintingController } from './product.card.printing.controller';
import { ProductCardPrinting } from 'src/typeorm/entities/tcgcommerce/modules/product/card/printing/product.card.printing.entity';
import { TCGdbMTGPrintingModule } from 'src/tcgdb/modules/tcgdb/mtg/printing/tcgdb.mtg.printing.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardPrinting]),
        TCGdbMTGPrintingModule
    ],
    controllers: [ProductCardPrintingController],
    providers: [ProductCardPrintingService],
    exports: [ProductCardPrintingService]
})
export class ProductCardPrintingModule {}
