import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModuleService } from './product.module.service';
import { ProductModuleController } from './product.module.controller';
import { ProductModule } from 'src/typeorm/entities/tcgcommerce/modules/product/module/product.module.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductModule])
    ],
    controllers: [ProductModuleController],
    providers: [ProductModuleService],
    exports: [ProductModuleService]
})
export class ProductModuleModule {}
