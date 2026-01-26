import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceShopifyWebhookRestService } from './pos.vendor.service.shopify.webhook.rest.service';
import { POSVendorServiceShopifyWebhookRestController } from './pos.vendor.service.shopify.webhook.rest.controller';
import { CommerceAccountSettingsPOSVendorServiceShopifyModule } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.module';
import { POSVendorServiceShopifyAPIRestWebhookModule } from 'src/tcgcommerce/modules/pos/vendor/service/shopify/api/rest/webhook/pos.vendor.service.shopify.api.rest.webhook.module';
import { POSVendorServiceShopifyWebhookRestProcessModule } from './process/pos.vendor.service.shopify.webhook.rest.process.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceShopifyModule,
        POSVendorServiceShopifyAPIRestWebhookModule,
        POSVendorServiceShopifyWebhookRestProcessModule,
    ],
    controllers: [POSVendorServiceShopifyWebhookRestController],
    providers: [POSVendorServiceShopifyWebhookRestService],
    exports: [POSVendorServiceShopifyWebhookRestService]
})
export class POSVendorServiceShopifyWebhookRestModule {}
