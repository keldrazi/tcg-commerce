import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductLanguageDTO, UpdateProductLanguageDTO, ProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguageService } from './product.language.service';

@Controller('product/language')
export class ProductLanguageController {

    constructor(
        private productCardLanguageService: ProductLanguageService,
    ) { }
    
    
    @Get()
    async getProductLanguages() {
        return await this.productCardLanguageService.getProductLanguages();
    }

    @Get('/plc/:productLineCode')
    async getProductLanguagesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardLanguageService.getProductLanguagesByProductLineCode(productLineCode.toUpperCase());
    }

    @Get('/create/plc/:productLineCode')
    async createProductLanguagesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardLanguageService.createProductLanguagesByProductLineCode(productLineCode.toUpperCase());
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductLanguage(@Body() createProductLanguageDTO: CreateProductLanguageDTO) {
        return await this.productCardLanguageService.createProductLanguage(createProductLanguageDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductLanguage(@Body() updateProductLanguageDTO: UpdateProductLanguageDTO) {
        return await this.productCardLanguageService.updateProductLanguage(updateProductLanguageDTO);
    }


}