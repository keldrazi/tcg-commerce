import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductVendorDTO, UpdateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendorService } from './product.vendor.service';



@Controller('product/vendor')
export class ProductVendorController {

    constructor(
        private productVendorService: ProductVendorService,
    ) { }
    
    
    @Get('/id/:productVendorId')
    async getProductVendor(@Param('productVendorId') productVendorId: string) {
        return await this.productVendorService.getProductVendor(productVendorId);
    }

    @Get('/all')
    async getProductVendors() {
        return await this.productVendorService.getProductVendors();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductVendor(@Body() createProductVendorDTO: CreateProductVendorDTO) {
        return await this.productVendorService.createProductVendor(createProductVendorDTO);
    }

    @Post('/update')
    @UsePipes(new ValidationPipe())
    async updateProductVendor(@Body() updateProductVendorDTO: UpdateProductVendorDTO) {
        return await this.productVendorService.updateProductVendor(updateProductVendorDTO);
    }

    

}