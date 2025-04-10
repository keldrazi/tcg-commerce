import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductLineService } from './product.line.service';
import { ProductLineController } from './product.line.controller';
import { ProductLine } from 'src/typeorm/entities/tcgcommerce/modules/product/line/product.line.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductLine])
    ],
    controllers: [ProductLineController],
    providers: [ProductLineService],
    exports: [ProductLineService]
})
export class ProductLineModule {}
