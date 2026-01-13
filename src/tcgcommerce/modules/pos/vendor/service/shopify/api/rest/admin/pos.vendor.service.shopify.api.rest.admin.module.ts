import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceShopifyAPIRestAdminService } from './pos.vendor.service.shopify.api.rest.admin.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceShopifyAPIRestAdminService],
    exports: [POSVendorServiceShopifyAPIRestAdminService],
})

export class POSVendorServiceShopifyAPIRestAdminModule {}