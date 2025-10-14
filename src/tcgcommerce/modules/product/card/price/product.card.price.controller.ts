import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductCardPriceDTO } from './dto/product.card.price.dto';
import { ProductCardPriceService } from './product.card.price.service';

@Controller('product/card/price')
export class ProductCardPriceController {
    constructor(
        private productCardPriceService: ProductCardPriceService,
    ) { }
    
    
    /*@Get(':productLineCode/:productCardItemTCGdbId/:productCardItemId')
    async getProductCardPricesByProductLineCode(@Param('productLineCode') productLineCode: string, @Param('productCardItemTCGdbId') productCardItemTCGdbId: string, @Param('productCardItemId') productCardItemId: string) {
        return await this.productCardPriceService.getProductCardPrices(productLineCode, productCardItemTCGdbId, productCardItemId);
    }*/
   
   

}