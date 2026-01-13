import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceShopifyAPIGraphQLAdminService } from './pos.vendor.service.shopify.api.graphql.admin.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceShopifyAPIGraphQLAdminService],
    exports: [POSVendorServiceShopifyAPIGraphQLAdminService],
})

export class POSVendorServiceShopifyAPIGraphQLAdminModule {}