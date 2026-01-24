import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateProductTypeDTO, UpdateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductTypeService } from './product.type.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/type')
export class ProductTypeController {

    constructor(
        private productTypeService: ProductTypeService,
    ) { }
    
    
    @Get('/id/:productTypeId')
    async getProductTypeById(@Param('productTypeId') productTypeId: string) {
        try {
            return await this.productTypeService.getProductTypeById(productTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product type not found');
            }
            throw new InternalServerErrorException('Failed to get product type by ID');
        }
    }

    @Get('/pvid/:productVendorId/plid/:productLineId')
    async getProductTypesByProductVendorIdAndProductLineId(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string) {
        try {
            return await this.productTypeService.getProductTypesByProductVendorIdAndProductLineId(productVendorId, productLineId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product types');
        }
    }

    @Get()
    async getProductTypes() {
        try {
            return await this.productTypeService.getProductTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductType(@Body() createProductTypeDTO: CreateProductTypeDTO) {
        try {
            return await this.productTypeService.createProductType(createProductTypeDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductType(@Body() updateProductTypeDTO: UpdateProductTypeDTO) {
        try {
            return await this.productTypeService.updateProductType(updateProductTypeDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product type not found');
            }
            throw new InternalServerErrorException('Failed to get product type by ID');
        }
    }

}