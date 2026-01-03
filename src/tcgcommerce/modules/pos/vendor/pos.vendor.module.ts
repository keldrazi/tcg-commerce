import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { POSVendorService } from './pos.vendor.service';
import { POSVendorController } from './pos.vendor.controller';
import { POSVendor } from 'src/typeorm/entities/tcgcommerce/modules/pos/vendor/pos.vendor.entity';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([POSVendor]),
        ErrorMessageModule
    ],
    controllers: [POSVendorController],
    providers: [POSVendorService],
    exports: [POSVendorService]
})
export class POSVendorModule {}
