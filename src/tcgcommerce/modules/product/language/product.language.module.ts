import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductLanguageService } from './product.language.service';
import { ProductLanguageController } from './product.language.controller';
import { ProductLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/language/product.language.entity';
import { TCGdbMTGLanguageModule } from 'src/tcgdb/modules/tcgdb/api/mtg/language/tcgdb.mtg.language.module';
import { ProductLineModule } from 'src/tcgcommerce/modules/product/line/product.line.module';
import { ProductVendorModule } from 'src/tcgcommerce/modules/product/vendor/product.vendor.module';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductLanguage]),
        TCGdbMTGLanguageModule,
        ProductLineModule,
        ProductVendorModule,
        ErrorMessageModule
    ],
    controllers: [ProductLanguageController],
    providers: [ProductLanguageService],
    exports: [ProductLanguageService]
})
export class ProductLanguageModule {}
