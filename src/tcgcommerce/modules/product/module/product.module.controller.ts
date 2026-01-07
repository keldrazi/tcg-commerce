import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModuleService } from './product.module.service';
import { CreateProductModuleDTO, UpdateProductModuleDTO } from './dto/product.module.dto';

@Controller('product/module')
export class ProductModuleController {

    constructor(
        private productModuleService: ProductModuleService,
    ) { }
    
    @Get()
    async getProductModules() {
        return await this.productModuleService.getProductModules();
    }

    @Get('/id/:productModuleId')
    async getProductModuleById(@Param('productModuleId') productModuleId: string) {
        return await this.productModuleService.getProductModuleById(productModuleId);
    }

    @Get('/caid/:commerceAccountId')
    async getProductModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.productModuleService.getProductModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductModule(@Body() createProductModuleDTO: CreateProductModuleDTO) {
        return this.productModuleService.createProductModule(createProductModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductModule(@Body() updateProductModuleDTO: UpdateProductModuleDTO) {
        return this.productModuleService.updateProductModule(updateProductModuleDTO);
    }

}