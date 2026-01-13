import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceManaPoolWebhookService } from './pos.vendor.service.manapool.webhook.service';

@Controller('pos/vendor/service/manapool/webhook')
export class POSVendorServiceManaPoolWebhookController {

    constructor(
        private posVendorServiceManaPoolWebhookService: POSVendorServiceManaPoolWebhookService,
    ) { }
    
    
}