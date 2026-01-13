import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { POSVendorServiceShopifyAPIRestWebhookService } from './pos.vendor.service.shopify.api.rest.webhook.service';

@Module({
    imports: [
        ConfigModule,
        HttpModule,
    ], 
    controllers: [],
    providers: [POSVendorServiceShopifyAPIRestWebhookService],
    exports: [POSVendorServiceShopifyAPIRestWebhookService],
})

export class POSVendorServiceShopifyAPIRestWebhookModule {}