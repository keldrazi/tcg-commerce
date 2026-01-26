import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { POSVendorServiceShopifyAdminRestService } from './pos.vendor.service.shopify.admin.rest.service';
import { POSVendorServiceShopifyAdminRestController } from './pos.vendor.service.shopify.admin.rest.controller';
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.service';
import { POSVendorServiceShopifyAPIRestAdminModule } from 'src/tcgcommerce/modules/pos/vendor/service/shopify/api/rest/admin/pos.vendor.service.shopify.api.rest.admin.module';

@Module({
    imports: [
        ConfigModule,
        CommerceAccountSettingsPOSVendorServiceShopifyService,
        POSVendorServiceShopifyAPIRestAdminModule,
    ],
    controllers: [POSVendorServiceShopifyAdminRestController],
    providers: [POSVendorServiceShopifyAdminRestService],
    exports: [POSVendorServiceShopifyAdminRestService]
})
export class POSVendorServiceShopifyAdminModule {}
