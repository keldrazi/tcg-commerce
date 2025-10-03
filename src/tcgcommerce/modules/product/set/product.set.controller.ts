import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductSetDTO, UpdateProductSetDTO, ProductSetDTO } from './dto/product.set.dto';
import { ProductSetService } from './product.set.service';



@Controller('product/set')
export class ProductSetController {

    constructor(
        private productSetService: ProductSetService,
    ) { }
    
    
    @Get(':productVendorCode/:productLineCode')
    async getProductSetsByProductVendorNameAndProductLineNameAndProductTypeName(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string) {
        return await this.productSetService.getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode.toUpperCase(), productLineCode.toUpperCase());
    }

    @Get('create/:productLineName')
    async createProductSetsByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productSetService.createProductSetsByProductLineName(productLineName);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductSet(@Body() createProductSetDTO: CreateProductSetDTO) {
        return await this.productSetService.createProductSet(createProductSetDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductSet(@Body() updateProductSetDTO: UpdateProductSetDTO) {
        return await this.productSetService.updateProductSet(updateProductSetDTO);
    }
    

}