import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceShopifyWebhookRestProcessService } from './pos.vendor.service.shopify.webhook.rest.process.service';
import { ErrorMessageModule } from 'src/system/modules/error/message/error.message.module';

@Module({
    imports: [
        ConfigModule,
        ErrorMessageModule
    ],
    controllers: [],
    providers: [POSVendorServiceShopifyWebhookRestProcessService],
    exports: [POSVendorServiceShopifyWebhookRestProcessService]
})
export class POSVendorServiceShopifyWebhookRestProcessModule {}
