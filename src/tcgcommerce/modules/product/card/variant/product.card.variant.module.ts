import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardVariantService } from './product.card.variant.service';
import { ProductCardVariantController } from './product.card.variant.controller';
import { ProductCardVariant } from 'src/typeorm/entities/tcgcommerce/modules/product/card/variant/product.card.variant.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardVariant])
    ],
    controllers: [ProductCardVariantController],
    providers: [ProductCardVariantService],
    exports: [ProductCardVariantService]
})
export class ProductCardVariantModule {}
