import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateProductLineDTO, UpdateProductLineDTO, ProductLineDTO } from './dto/product.line.dto';
import { ProductLineService } from './product.line.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/line')
export class ProductLineController {

    constructor(
        private productLineService: ProductLineService,
    ) { }
    
    
    @Get('/id/:productLineId')
    async getProductLineById(@Param('productLineId') productLineId: string) {
        try {
            return await this.productLineService.getProductLineById(productLineId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product line not found');
            }
            throw new InternalServerErrorException('Failed to get product line by ID');
        }
    }

    @Get('/pvid/:productVendorId')
    async getProductLinesByVendor(@Param('productVendorId') productVendorId: string) {
        try {
            return await this.productLineService.getProductLinesByVendor(productVendorId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product lines by vendor');
        }
    }

    @Get()
    async getProductLines() {
        try {
            return await this.productLineService.getProductLines();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product lines');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductLine(@Body() createProductLineDTO: CreateProductLineDTO) {
        try {
            return await this.productLineService.createProductLine(createProductLineDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product line');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductLine(@Body() updateProductLineDTO: UpdateProductLineDTO) {
        try {
            return await this.productLineService.updateProductLine(updateProductLineDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product line not found');
            }
            throw new InternalServerErrorException('Failed to get product line by ID');
        }
    }

    

}