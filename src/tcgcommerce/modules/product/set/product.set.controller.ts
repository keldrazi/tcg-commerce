import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductSetDTO, UpdateProductSetDTO, ProductSetDTO } from './dto/product.set.dto';
import { ProductSetService } from './product.set.service';


@Controller('product/set')
export class ProductSetController {

    constructor(
        private productSetService: ProductSetService,
    ) { }
    
    
    @Get('/pvc/:productVendorCode/plc/:productLineCode')
    async getProductSetsByProductVendorCodeAndProductLineCode(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string) {
        return await this.productSetService.getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode.toUpperCase(), productLineCode.toUpperCase());
    }

    @Get('/create/plc/:productLineCode')
    async createProductSetsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productSetService.createProductSetsByProductLineCode(productLineCode.toUpperCase());
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductSet(@Body() updateProductSetDTO: UpdateProductSetDTO) {
        return await this.productSetService.updateProductSet(updateProductSetDTO);
    }

    

}