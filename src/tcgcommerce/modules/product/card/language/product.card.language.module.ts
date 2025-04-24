import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardLanguageService } from './product.card.language.service';
import { ProductCardLanguageController } from './product.card.language.controller';
import { ProductCardLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/card/language/product.card.language.entity';
import { TCGdbMTGLanguageModule } from 'src/tcgdb/modules/tcgdb/mtg/language/tcgdb.mtg.language.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardLanguage]),
        TCGdbMTGLanguageModule,
        ProductLineModule
    ],
    controllers: [ProductCardLanguageController],
    providers: [ProductCardLanguageService],
    exports: [ProductCardLanguageService]
})
export class ProductCardLanguageModule {}
