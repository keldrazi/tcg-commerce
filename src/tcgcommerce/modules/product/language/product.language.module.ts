import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductLanguageService } from './product.language.service';
import { ProductLanguageController } from './product.language.controller';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageModule } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductLanguage]),
        TCGdbMTGLanguageModule,
        ProductLineModule
    ],
    controllers: [ProductLanguageController],
    providers: [ProductLanguageService],
    exports: [ProductLanguageService]
})
export class ProductLanguageModule {}
