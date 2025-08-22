import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PricingProductCardServiceUpdateService } from './pricing.product.card.service.update.service';
//import { CreatePricingModuleDTO, UpdatePricingModuleDTO } from './dto/pricing.module.dto';



@Controller('pricing/product/card/service/update')
export class PricingProductCardServiceUpdateController {

    constructor(
        private pricingProductCardServiceUpdateService: PricingProductCardServiceUpdateService,
    ) { }
    
    

}