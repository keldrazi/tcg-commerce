import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardDTO, UpdateProductCardDTO, ProductCardDTO } from './dto/product.card.dto';
import { ProductCardService } from './product.card.service';



@Controller('product/card')
export class ProductCardController {

    constructor(
        private productCardService: ProductCardService,
    ) { }
    
    
    @Get('/create/:productVendorId/:productLineId/:productTypeId')
    async createProductCards(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.productCardService.createProductCards(productVendorId, productLineId, productTypeId);
    }

    @Get('/set/:productSetId')
    async getProductCardsByProductSetId(@Param('productSetId') productSetId: string) {
        return await this.productCardService.getProductCardsByProductSetId(productSetId);
    }

}