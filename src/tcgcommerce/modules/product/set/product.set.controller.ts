import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductSetDTO, UpdateProductSetDTO, ProductSetDTO } from './dto/product.set.dto';
import { ProductSetService } from './product.set.service';



@Controller('product/set')
export class ProductSetController {

    constructor(
        private productSetService: ProductSetService,
    ) { }
    
    
    @Get('vendor/:productVendorId/line/:productLineId')
    async getProductSetsByProductVendorNameAndProductLineNameAndProductTypeName(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string) {
        return await this.productSetService.getProductSets(productVendorId, productLineId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductSet(@Body() createProductSetDTO: CreateProductSetDTO) {
        return await this.productSetService.createProductSet(createProductSetDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardVariant(@Body() updateProductSetDTO: UpdateProductSetDTO) {
        return await this.productSetService.updateProductSet(updateProductSetDTO);
    }
    

}