import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSVendorOptionPriceTypeService } from './pos.vendor.option.price.type.service';
import { POSVendorOptionPriceTypeController } from './pos.vendor.option.price.type.controller';
import { POSVendorOptionPriceType } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/option/price/type/pos.vendor.option.price.type.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSVendorOptionPriceType]),
    ],
    controllers: [POSVendorOptionPriceTypeController],
    providers: [POSVendorOptionPriceTypeService],
    exports: [POSVendorOptionPriceTypeService]
})
export class POSVendorOptionPriceTypeModule {}
