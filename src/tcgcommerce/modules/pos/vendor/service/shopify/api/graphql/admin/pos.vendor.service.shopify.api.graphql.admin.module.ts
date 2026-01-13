import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceShopifyAPIGraphQlAdminService } from './pos.vendor.service.shopify.api.graphql.admin.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceShopifyAPIGraphQlAdminService],
    exports: [POSVendorServiceShopifyAPIGraphQlAdminService],
})

export class POSVendorServiceShopifyAPIGraphQlAdminModule {}