import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSVendorServiceManaPoolService } from './pos.vendor.service.manapool.service';

@Controller('pos/vendor/service/manapool')
export class POSVendorServiceManaPoolController {

    constructor(
        private posVendorServiceManaPoolService: POSVendorServiceManaPoolService,
    ) { }
    
    
}