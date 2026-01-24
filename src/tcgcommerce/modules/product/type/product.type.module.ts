import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductTypeService } from './product.type.service';
import { ProductTypeController } from './product.type.controller';
import { ProductType } from 'src/typeorm/entities/tcgcommerce/modules/product/type/product.type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductType]),
    ],
    controllers: [ProductTypeController],
    providers: [ProductTypeService],
    exports: [ProductTypeService]
})
export class ProductTypeModule {}
