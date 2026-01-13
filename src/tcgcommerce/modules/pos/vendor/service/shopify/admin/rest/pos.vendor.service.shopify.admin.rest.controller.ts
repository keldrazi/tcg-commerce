import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceShopifyAdminRestService } from './pos.vendor.service.shopify.admin.rest.service';

@Controller('pos/vendor/service/shopify/rest/admin')
export class POSVendorServiceShopifyAdminRestController {

    constructor(
        private posVendorServiceShopifyAdminRestService: POSVendorServiceShopifyAdminRestService,
    ) { }
    
    
}