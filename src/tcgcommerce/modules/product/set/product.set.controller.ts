import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { UpdateProductSetDTO } from './dto/product.set.dto';
import { ProductSetService } from './product.set.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/set')
export class ProductSetController {

    constructor(
        private productSetService: ProductSetService,
    ) { }
    
    
    @Get('/pvc/:productVendorCode/plc/:productLineCode')
    async getProductSetsByProductVendorCodeAndProductLineCode(@Param('productVendorCode') productVendorCode: string, @Param('productLineCode') productLineCode: string) {
        try {
            return await this.productSetService.getProductSetsByProductVendorCodeAndProductLineCode(productVendorCode.toUpperCase(), productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product sets by product vendor code and product line code');
        }
    }

    @Post('/create/plc/:productLineCode')
    async createProductSetsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
        return await this.productSetService.createProductSetsByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product sets by product line code');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductSet(@Body() updateProductSetDTO: UpdateProductSetDTO) {
        try {
            return await this.productSetService.updateProductSet(updateProductSetDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product set not found');
            }
            throw new InternalServerErrorException('Failed to update product set');
        }
    }
}