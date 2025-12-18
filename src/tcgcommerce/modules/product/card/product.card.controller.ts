import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardDTO, UpdateProductCardDTO, ProductCardDTO } from './dto/product.card.dto';
import { ProductCardService } from './product.card.service';



@Controller('product/card')
export class ProductCardController {

    constructor(
        private productCardService: ProductCardService,
    ) { }
    
    
    @Get('/create/vendorCode/:productVendorCode/lineCode/:productLineCode/typeCode/:productTypeCode')
    async createProductCards(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string, @Param('productTypeCode') productTypeCode: string) {
        return await this.productCardService.createProductCards(productVendorCode.toUpperCase(), productLineCode.toUpperCase(), productTypeCode.toUpperCase());
    }

    @Get('/create/productSetCode/:productSetCode/vendorCode/:productVendorCode/lineCode/:productLineCode/typeCode/:productTypeCode')
    async createProductCardsBySet(@Param('productSetCode') productSetCode: string, @Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string, @Param('productTypeCode') productTypeCode: string) {
        return await this.productCardService.createProductCardsBySet(productSetCode.toUpperCase(), productVendorCode.toUpperCase(), productLineCode.toUpperCase(), productTypeCode.toUpperCase());
    }

    @Get('/set/id/:productSetId')
    async getProductCardsByProductSetId(@Param('productSetId') productSetId: string) {
        return await this.productCardService.getProductCardsByProductSetId(productSetId);
    }

    @Get('/set/code/:setCode')
    async getProductCardsByProductSetCode(@Param('setCode') setCode: string) {
        return await this.productCardService.getProductCardsByProductSetCode(setCode.toUpperCase());
    }

}   