import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductTypeDTO, UpdateProductTypeDTO, ProductTypeDTO } from './dto/product.type.dto';
import { ProductTypeService } from './product.type.service';

@Controller('product/type')
export class ProductTypeController {

    constructor(
        private productTypeService: ProductTypeService,
    ) { }
    
    
    @Get('/id/:productTypeId')
    async getProductTypeById(@Param('productTypeId') productTypeId: string) {
        return await this.productTypeService.getProductTypeById(productTypeId);
    }

    @Get('/pvid/:productVendorId/plid/:productLineId')
    async getProductTypesByProductVendorIdAndProductLineId(@Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string) {
        return await this.productTypeService.getProductTypesByProductVendorIdAndProductLineId(productVendorId, productLineId);
    }

    @Get()
    async getProductTypes() {
        return await this.productTypeService.getProductTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductType(@Body() createProductTypeDTO: CreateProductTypeDTO) {
        return await this.productTypeService.createProductType(createProductTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductType(@Body() updateProductTypeDTO: UpdateProductTypeDTO) {
        return await this.productTypeService.updateProductType(updateProductTypeDTO);
    }

}