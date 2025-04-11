import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardOptionDTO, UpdateProductCardOptionDTO, ProductCardOptionDTO } from './dto/product.card.option.dto';
import { ProductCardOptionService } from './product.card.option.service';



@Controller('product/card/option')
export class ProductCardOptionController {

    constructor(
        private productCardOptionService: ProductCardOptionService,
    ) { }
    
    
    @Get('vendor/:productVendorId/line/:productLineId/type/:productTypeId')
    async getProductCardOptionsByProductVendorNameAndProductLineNameAndProductTypeName(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.productCardOptionService.getProductCardOptions(productVendorId, productLineId, productTypeId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardOption(@Body() createProductCardOptionDTO: CreateProductCardOptionDTO) {
        return await this.productCardOptionService.createProductCardOption(createProductCardOptionDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardVariant(@Body() updateProductCardOptionDTO: UpdateProductCardOptionDTO) {
        return await this.productCardOptionService.updateProductCardOption(updateProductCardOptionDTO);
    }
    

}