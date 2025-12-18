import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductLineDTO, UpdateProductLineDTO, ProductLineDTO } from './dto/product.line.dto';
import { ProductLineService } from './product.line.service';



@Controller('product/line')
export class ProductLineController {

    constructor(
        private productLineService: ProductLineService,
    ) { }
    
    
    @Get('/id/:productLineId')
    async getProductLine(@Param('productLineId') productLineId: string) {
        return await this.productLineService.getProductLine(productLineId);
    }

    @Get('/vendorId/:productVendorId')
    async getProductLinesByVendor(@Param('productVendorId') productVendorId: string) {
        return await this.productLineService.getProductLinesByVendor(productVendorId);
    }

    @Get('/all')
    async getProductLines() {
        return await this.productLineService.getProductLines();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductLine(@Body() createProductLineDTO: CreateProductLineDTO) {
        return await this.productLineService.createProductLine(createProductLineDTO);
    }

    @Post('/update')
    @UsePipes(new ValidationPipe())
    async updateProductLine(@Body() updateProductLineDTO: UpdateProductLineDTO) {
        return await this.productLineService.updateProductLine(updateProductLineDTO);
    }

    

}