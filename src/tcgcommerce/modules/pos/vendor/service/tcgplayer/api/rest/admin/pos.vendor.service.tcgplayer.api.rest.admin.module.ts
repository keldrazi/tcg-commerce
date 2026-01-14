import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceTCGPlayerAPIRestAdminService } from './pos.vendor.service.tcgplayer.api.rest.admin.service';
import { POSVendorServiceTCGPlayerAPIRestUtilModule } from '../util/pos.vendor.service.tcgplayer.api.rest.util.module';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        POSVendorServiceTCGPlayerAPIRestUtilModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceTCGPlayerAPIRestAdminService],
    exports: [POSVendorServiceTCGPlayerAPIRestAdminService],
})

export class POSVendorServiceTCGPlayerAPIRestAdminModule {}