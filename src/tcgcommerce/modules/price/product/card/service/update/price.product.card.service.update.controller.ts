import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PriceProductCardServiceUpdateService } from './price.product.card.service.update.service';
//import { CreatePriceModuleDTO, UpdatePriceModuleDTO } from './dto/price.module.dto';



@Controller('price/product/card/service/update')
export class PriceProductCardServiceUpdateController {

    constructor(
        private priceProductCardServiceUpdateService: PriceProductCardServiceUpdateService,
    ) { }
    
    

}