import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from 'src/tcgcommerce/modules/commerce/account/settings/pos/vendor/service/shopify/commerce.account.settings.pos.vendor.service.shopify.service';
import { POSVendorServiceShopifyAPIRestWebhookService } from 'src/tcgcommerce/modules/pos/vendor/service/shopify/api/rest/webhook/pos.vendor.service.shopify.api.rest.webhook.service';
import { POSVendorServiceShopifyWebhookRestProcessService } from './process/pos.vendor.service.shopify.webhook.rest.process.service';
import { ErrorMessageService } from 'src/system/modules/error/message/error.message.service';
import { ErrorMessageDTO } from 'src/system/modules/error/message/dto/error.message.dto';
import { InventoryProductCardDTO } from 'src/tcgcommerce/modules/inventory/product/card/dto/inventory.product.card.dto';

@Injectable()
export class POSVendorServiceShopifyWebhookRestService {

    constructor(
        private configService: ConfigService,
        private commerceAccountSettingsPOSVendorServiceShopifyService: CommerceAccountSettingsPOSVendorServiceShopifyService,
        private posVendorServiceShopifyAPIRestWebhookService: POSVendorServiceShopifyAPIRestWebhookService,
        private posVendorServiceShopifyWebhookRestProcessService: POSVendorServiceShopifyWebhookRestProcessService,
        private errorMessageService: ErrorMessageService,
    ) { }

    

    
        
}