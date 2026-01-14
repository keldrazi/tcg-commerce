import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceTCGPlayerAPIRestOrderService } from './pos.vendor.service.tcgplayer.api.rest.order.service';
import { POSVendorServiceTCGPlayerAPIRestUtilModule } from '../util/pos.vendor.service.tcgplayer.api.rest.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        POSVendorServiceTCGPlayerAPIRestUtilModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceTCGPlayerAPIRestOrderService],
    exports: [POSVendorServiceTCGPlayerAPIRestOrderService],
})

export class POSVendorServiceTCGPlayerAPIRestOrderModule {}