import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceShopifyWebhookRestService } from './pos.vendor.service.shopify.webhook.rest.service';

@Controller('pos/vendor/service/shopify/rest/webhook')
export class POSVendorServiceShopifyWebhookRestController {

    constructor(
        private posVendorServiceShopifyWebhookRestService: POSVendorServiceShopifyWebhookRestService,
    ) { }
    
    
}