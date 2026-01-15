import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceTCGPlayerAPIRestOrderService } from './pos.vendor.service.tcgplayer.api.rest.order.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceTCGPlayerAPIRestOrderService],
    exports: [POSVendorServiceTCGPlayerAPIRestOrderService],
})

export class POSVendorServiceTCGPlayerAPIRestOrderModule {}