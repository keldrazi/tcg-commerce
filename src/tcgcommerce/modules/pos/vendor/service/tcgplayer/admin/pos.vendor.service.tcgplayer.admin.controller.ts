import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceTCGPlayerAdminService } from './pos.vendor.service.tcgplayer.admin.service';

@Controller('pos/vendor/service/tcgplayer/admin')
export class POSVendorServiceTCGPlayerAdminController {

    constructor(
        private posVendorServiceTCGPlayerAdminService: POSVendorServiceTCGPlayerAdminService,
    ) { }
    
    
}