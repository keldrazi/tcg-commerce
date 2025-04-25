import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardLanguageDTO, UpdateProductCardLanguageDTO, ProductCardLanguageDTO } from './dto/product.card.language.dto';
import { ProductCardLanguageService } from './product.card.language.service';

@Controller('product/card/language')
export class ProductCardLanguageController {

    constructor(
        private productCardLanguageService: ProductCardLanguageService,
    ) { }
    
    
    @Get()
    async getProductCardLanguages() {
        return await this.productCardLanguageService.getProductCardLanguages();
    }

    @Get('/code/:productLineCode')
    async getProductCardLanguagesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardLanguageService.getProductCardLanguagesByProductLineCode(productLineCode);
    }

    @Get('/create/:productLineName')
    async createProductCardLanguagesByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productCardLanguageService.createProductCardLanguagesByProductLineName(productLineName);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardLanguage(@Body() createProductCardLanguageDTO: CreateProductCardLanguageDTO) {
        return await this.productCardLanguageService.createProductCardLanguage(createProductCardLanguageDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardLanguage(@Body() updateProductCardLanguageDTO: UpdateProductCardLanguageDTO) {
        return await this.productCardLanguageService.updateProductCardLanguage(updateProductCardLanguageDTO);
    }


}