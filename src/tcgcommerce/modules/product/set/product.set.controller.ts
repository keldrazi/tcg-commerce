import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductSetDTO, UpdateProductSetDTO, ProductSetDTO } from './dto/product.set.dto';
import { ProductSetService } from './product.set.service';



@Controller('product/set')
export class ProductSetController {

    constructor(
        private productSetService: ProductSetService,
    ) { }
    
    
    @Get('/vendorcode/:productVendorCode/linecode/:productLineCode')
    async getProductSetsByProductVendorCodeAndProductLineCode(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string) {
        return await this.productSetService.getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode.toUpperCase(), productLineCode.toUpperCase());
    }

    @Get('create/:productLineCode')
    async createProductSetsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productSetService.createProductSetsByProductLineCode(productLineCode.toUpperCase());
    }

    

}