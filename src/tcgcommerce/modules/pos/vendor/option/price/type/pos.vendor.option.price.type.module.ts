import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSVendorOptionPriceTypeService } from './pos.vendor.option.price.type.service';
import { POSVendorOptionPriceTypeController } from './pos.vendor.option.price.type.controller';
import { POSVendorOptionPriceType } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/type/pos.vendor.option.price.type.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSVendorOptionPriceType]),
        ErrorMessageModule
    ],
    controllers: [POSVendorOptionPriceTypeController],
    providers: [POSVendorOptionPriceTypeService],
    exports: [POSVendorOptionPriceTypeService]
})
export class POSVendorOptionPriceTypeModule {}
