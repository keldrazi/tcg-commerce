import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardItemDTO, UpdateProductCardItemDTO, ProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItemService } from './product.card.item.service';



@Controller('product/card/item')
export class ProductCardItemController {

    constructor(
        private productCardItemService: ProductCardItemService,
    ) { }
    
    
    @Get('/create/:productLineName')
    async createProductCardItemsByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productCardItemService.createProductCardItemsByProductLineName(productLineName);
    }

    @Get('/set/:productSetId')
    async getProductCardItemsByProductSetId(@Param('productSetId') productSetId: string) {
        return await this.productCardItemService.getProductCardItemsByProductSetId(productSetId);
    }

}