import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardItemDTO, UpdateProductCardItemDTO, ProductCardItemDTO } from './dto/product.card.item.dto';
import { ProductCardItemService } from './product.card.item.service';



@Controller('product/card/item')
export class ProductCardItemController {

    constructor(
        private productCardItemService: ProductCardItemService,
    ) { }
    
    
    @Get('/create/:productVendorId/:productLineId/:productTypeId')
    async createProductCardItems(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.productCardItemService.createProductCardItems(productVendorId, productLineId, productTypeId);
    }

    @Get('/set/:productSetId')
    async getProductCardItemsByProductSetId(@Param('productSetId') productSetId: string) {
        return await this.productCardItemService.getProductCardItemsByProductSetId(productSetId);
    }

}