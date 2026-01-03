import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSVendorOptionPriceService } from './pos.vendor.option.price.service';
import { POSVendorOptionPriceController } from './pos.vendor.option.price.controller';
import { POSVendorOptionPrice } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/pos.vendor.option.price.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSVendorOptionPrice]),
        ErrorMessageModule
    ],
    controllers: [POSVendorOptionPriceController],
    providers: [POSVendorOptionPriceService],
    exports: [POSVendorOptionPriceService]
})
export class POSVendorOptionPriceModule {}
