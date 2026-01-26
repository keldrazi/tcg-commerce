import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceShopifyWebhookRestProcessService } from './pos.vendor.service.shopify.webhook.rest.process.service';

@Module({
    imports: [
        ConfigModule,
    ],
    controllers: [],
    providers: [POSVendorServiceShopifyWebhookRestProcessService],
    exports: [POSVendorServiceShopifyWebhookRestProcessService]
})
export class POSVendorServiceShopifyWebhookRestProcessModule {}
