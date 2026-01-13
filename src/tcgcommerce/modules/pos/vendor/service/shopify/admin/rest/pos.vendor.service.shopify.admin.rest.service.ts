import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.service';
import { POSVendorServiceShopifyAPIRestAdminService } from 'src/tcgcommerce/modules/pos/vendor/service/shopify/api/rest/admin/pos.vendor.service.shopify.api.rest.admin.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceShopifyAdminRestService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceShopifyService: CommerceAccountSettingsPOSVendorServiceShopifyService,
        private posVendorServiceShopifyAPIRestAdminService: POSVendorServiceShopifyAPIRestAdminService,
        private errorMessageService: ErrorMessageService,
    ) { }

    private shopifyWebhookURL = this.configService.get('SHOPIFY_WEBHOOK_URL');

    
        
}