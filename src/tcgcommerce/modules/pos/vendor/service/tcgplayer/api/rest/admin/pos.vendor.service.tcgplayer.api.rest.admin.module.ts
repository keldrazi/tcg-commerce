import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceTCGPlayerAPIRestAdminService } from './pos.vendor.service.tcgplayer.api.rest.admin.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule
    ], 
    controllers: [],
    providers: [POSVendorServiceTCGPlayerAPIRestAdminService],
    exports: [POSVendorServiceTCGPlayerAPIRestAdminService],
})

export class POSVendorServiceTCGPlayerAPIRestAdminModule {}