import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductModuleService } from './product.module.service';
import { CreateProductModuleDTO, UpdateProductModuleDTO } from './dto/product.module.dto';



@Controller('product/module')
export class ProductModuleController {

    constructor(
        private productModuleService: ProductModuleService,
    ) { }
    
    @Get('/all')
    async getProductModules() {
        return await this.productModuleService.getProductModules();
    }

    @Get('/:moduleId')
    async getProductModule(@Param('productModuleId') applicatioModuleId: string) {
        return await this.productModuleService.getProductModule(applicatioModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getProductModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.productModuleService.getProductModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductModule(@Body() createProductModuleDTO: CreateProductModuleDTO) {
        return this.productModuleService.createProductModule(createProductModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductModule(@Body() updateProductModuleDTO: UpdateProductModuleDTO) {
        return this.productModuleService.updateProductModule(updateProductModuleDTO);
    }

}