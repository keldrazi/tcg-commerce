import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceManaPoolAdminService } from './pos.vendor.service.manapool.admin.service';

@Controller('pos/vendor/service/manapool')
export class POSVendorServiceManaPoolAdminController {

    constructor(
        private posVendorServiceManaPoolAdminService: POSVendorServiceManaPoolAdminService,
    ) { }
    
    
}