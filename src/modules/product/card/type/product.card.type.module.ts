import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCardTypeService } from './product.card.type.service';
import { ProductCardTypeController } from './product.card.type.controller';
import { ProductCardType } from 'src/typeorm/entities/modules/product/card/type/product.card.type.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductCardType])
    ],
    controllers: [ProductCardTypeController],
    providers: [ProductCardTypeService],
    exports: [ProductCardTypeService]
})
export class ProductCardTypeModule {}
