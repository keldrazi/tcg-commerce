import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProductCardRarityDTO, UpdateProductCardRarityDTO, ProductCardRarityDTO } from './dto/product.card.rarity.dto';
import { ProductCardRarityService } from './product.card.rarity.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/card/rarity')
export class ProductCardRarityController {

    constructor(
        private productCardRarityService: ProductCardRarityService,
    ) { }
    
    
    @Get()
    async getProductCardRarities() {
        try {
            return await this.productCardRarityService.getProductCardRarities();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product card rarities');
        }
    }

    @Get('/plc/:productLineCode')
    async getProductCardRaritiesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardRarityService.getProductCardRaritiesByProductLineCode(productLineCode);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product card rarities by product line code');
        }
    }

    @Post('/create/plc/:productLineCode')
    async createProductCardRaritiesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardRarityService.createProductCardRaritiesByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to create product card rarities by product line code');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductCardRarity(@Body() createProductCardRarityDTO: CreateProductCardRarityDTO) {
        try {
            return await this.productCardRarityService.createProductCardRarity(createProductCardRarityDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product line');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductCardRarity(@Body() updateProductCardRarityDTO: UpdateProductCardRarityDTO) {
        try {
            return await this.productCardRarityService.updateProductCardRarity(updateProductCardRarityDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product line not found');
            }
            throw new InternalServerErrorException('Failed to get product line by ID');
        }
    }


}