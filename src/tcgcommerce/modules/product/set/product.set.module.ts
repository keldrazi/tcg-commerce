import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductSetService } from './product.set.service';
import { ProductSetController } from './product.set.controller';
import { ProductSet } from 'src/typeorm/entities/tcgcommerce/modules/product/set/product.set.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductSet])
    ],
    controllers: [ProductSetController],
    providers: [ProductSetService],
    exports: [ProductSetService]
})
export class ProductSetModule {}
