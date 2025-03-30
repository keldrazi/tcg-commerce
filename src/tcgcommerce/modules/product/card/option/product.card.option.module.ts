import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardOptionService } from './product.card.option.service';
import { ProductCardOptionController } from './product.card.option.controller';
import { ProductCardOption } from 'src/typeorm/entities/tcgcommerce/modules/product/card/option/product.card.option.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardOption])
    ],
    controllers: [ProductCardOptionController],
    providers: [ProductCardOptionService],
    exports: [ProductCardOptionService]
})
export class ProductCardOptionModule {}
