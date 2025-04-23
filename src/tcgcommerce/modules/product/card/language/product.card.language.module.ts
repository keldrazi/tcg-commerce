import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardLanguageService } from './product.card.language.service';
import { ProductCardLanguageController } from './product.card.language.controller';
import { ProductCardLanguage } from 'src/typeorm/entities/tcgcommerce/modules/product/card/language/product.card.language.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardLanguage])
    ],
    controllers: [ProductCardLanguageController],
    providers: [ProductCardLanguageService],
    exports: [ProductCardLanguageService]
})
export class ProductCardLanguageModule {}
