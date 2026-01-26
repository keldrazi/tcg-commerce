import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSVendorService } from './pos.vendor.service';
import { POSVendorController } from './pos.vendor.controller';
import { POSVendor } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/pos.vendor.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSVendor]),
    ],
    controllers: [POSVendorController],
    providers: [POSVendorService],
    exports: [POSVendorService]
})
export class POSVendorModule {}
