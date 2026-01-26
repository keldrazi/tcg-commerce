import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductVendorDTO, UpdateProductVendorDTO, ProductVendorDTO } from './dto/product.vendor.dto';
import { ProductVendorService } from './product.vendor.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/vendor')
export class ProductVendorController {

    constructor(
        private productVendorService: ProductVendorService,
    ) { }
    
    
    @Get('/id/:productVendorId')
    async getProductVendor(@Param('productVendorId') productVendorId: string) {
        try {
            return await this.productVendorService.getProductVendorById(productVendorId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product vendor not found');
            }
            throw new InternalServerErrorException('Failed to get product vendor');
        }
    }

    @Get()
    async getProductVendors() {
        try {
            return await this.productVendorService.getProductVendors();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product vendors');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductVendor(@Body() createProductVendorDTO: CreateProductVendorDTO) {
        try {
            return await this.productVendorService.createProductVendor(createProductVendorDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product vendor');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductVendor(@Body() updateProductVendorDTO: UpdateProductVendorDTO) {
        try {
            return await this.productVendorService.updateProductVendor(updateProductVendorDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product vendor not found');
            }
            throw new InternalServerErrorException('Failed to update product vendor');
        }
    }
}