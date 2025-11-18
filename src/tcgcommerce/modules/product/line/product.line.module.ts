import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductLineService } from './product.line.service';
import { ProductLineController } from './product.line.controller';
import { ProductLine } from 'src/typeorm/entities/tcgcommerce/modules/product/line/product.line.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductLine]),
        ErrorMessageModule
    ],
    controllers: [ProductLineController],
    providers: [ProductLineService],
    exports: [ProductLineService]
})
export class ProductLineModule {}
