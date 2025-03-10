import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductVendorService } from './product.vendor.service';
import { ProductVendorController } from './product.vendor.controller';
import { ProductVendor } from 'src/typeorm/entities/modules/product/vendor/product.vendor.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([ProductVendor])
    ],
    controllers: [ProductVendorController],
    providers: [ProductVendorService],
    exports: [ProductVendorService]
})
export class ProductVendorModule {}
