import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateProductLanguageDTO, UpdateProductLanguageDTO, ProductLanguageDTO } from './dto/product.language.dto';
import { ProductLanguageService } from './product.language.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('product/language')
export class ProductLanguageController {

    constructor(
        private productCardLanguageService: ProductLanguageService,
    ) { }
    
    @Get()
    async getProductLanguages() {
        try {
            return await this.productCardLanguageService.getProductLanguages();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product languages');
        }
    }

    @Get('/plc/:productLineCode')
    async getProductLanguagesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardLanguageService.getProductLanguagesByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product languages by product line code');
        }
    }

    @Post('/create/plc/:productLineCode')
    async createProductLanguagesByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardLanguageService.createProductLanguagesByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to create product languages by product line code');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductLanguage(@Body() createProductLanguageDTO: CreateProductLanguageDTO) {
        try {
            return await this.productCardLanguageService.createProductLanguage(createProductLanguageDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product line');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductLanguage(@Body() updateProductLanguageDTO: UpdateProductLanguageDTO) {
        try {
            return await this.productCardLanguageService.updateProductLanguage(updateProductLanguageDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product line not found');
            }
            throw new InternalServerErrorException('Failed to get product line by ID');
        }
    }


}