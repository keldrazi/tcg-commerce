import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceTCGPlayerOrderService } from './pos.vendor.service.tcgplayer.order.service';

@Controller('pos/vendor/service/tcgplayer/order')
export class POSVendorServiceTCGPlayerOrderController {

    constructor(
        private posVendorServiceTCGPlayerAdminService: POSVendorServiceTCGPlayerOrderService,
    ) { }
    
    
}