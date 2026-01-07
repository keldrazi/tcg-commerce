import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardRarityDTO, UpdateProductCardRarityDTO, ProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarityService } from './product.card.rarity.service';

@Controller('product/card/rarity')
export class ProductCardRarityController {

    constructor(
        private productCardRarityService: ProductCardRarityService,
    ) { }
    
    
    @Get()
    async getProductCardRarities() {
        return await this.productCardRarityService.getProductCardRarities();
    }

    @Get('/plc/:productLineCode')
    async getProductCardRaritiesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardRarityService.getProductCardRaritiesByProductLineCode(productLineCode);
    }

    @Get('/create/plc/:productLineCode')
    async createProductCardRaritiesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardRarityService.createProductCardRaritiesByProductLineCode(productLineCode.toUpperCase());
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductCardRarity(@Body() createProductCardRarityDTO: CreateProductCardRarityDTO) {
        return await this.productCardRarityService.createProductCardRarity(createProductCardRarityDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductCardRarity(@Body() updateProductCardRarityDTO: UpdateProductCardRarityDTO) {
        return await this.productCardRarityService.updateProductCardRarity(updateProductCardRarityDTO);
    }


}