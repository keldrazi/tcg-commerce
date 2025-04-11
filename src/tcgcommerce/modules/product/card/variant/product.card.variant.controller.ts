import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardVariantDTO, UpdateProductCardVariantDTO, ProductCardVariantDTO } from './dto/product.card.variant.dto';
import { ProductCardVariantService } from './product.card.variant.service';

@Controller('product/card/variant')
export class ProductCardVariantController {

    constructor(
        private productCardVariantService: ProductCardVariantService,
    ) { }
    
    
    @Get()
    async getProductCardVariants() {
        return await this.productCardVariantService.getProductCardVariants();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardVariant(@Body() createProductCardVariantDTO: CreateProductCardVariantDTO) {
        return await this.productCardVariantService.createProductCardVariant(createProductCardVariantDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardVariant(@Body() updateProductCardVariantDTO: UpdateProductCardVariantDTO) {
        return await this.productCardVariantService.updateProductCardVariant(updateProductCardVariantDTO);
    }


}