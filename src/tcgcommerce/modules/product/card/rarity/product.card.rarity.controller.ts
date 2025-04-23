import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardRarityDTO, UpdateProductCardRarityDTO, ProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarityService } from './product.card.rarity.service';

@Controller('product/card/rarity')
export class ProductCardRarityController {

    constructor(
        private productCardRarityService: ProductCardRarityService,
    ) { }
    
    
    @Get()
    async getProductCardRaritys() {
        return await this.productCardRarityService.getProductCardRaritys();
    }

    @Get('/create/:productLineName')
    async createProductCardRaritiesByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productCardRarityService.createProductCardRaritiesByProductLineName(productLineName);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardRarity(@Body() createProductCardRarityDTO: CreateProductCardRarityDTO) {
        return await this.productCardRarityService.createProductCardRarity(createProductCardRarityDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardRarity(@Body() updateProductCardRarityDTO: UpdateProductCardRarityDTO) {
        return await this.productCardRarityService.updateProductCardRarity(updateProductCardRarityDTO);
    }


}