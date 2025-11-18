import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductVendorService } from './product.vendor.service';
import { ProductVendorController } from './product.vendor.controller';
import { ProductVendor } from 'src/typeorm/entities/tcgcommerce/modules/product/vendor/product.vendor.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductVendor]),
        ErrorMessageModule
    ],
    controllers: [ProductVendorController],
    providers: [ProductVendorService],
    exports: [ProductVendorService]
})
export class ProductVendorModule {}
