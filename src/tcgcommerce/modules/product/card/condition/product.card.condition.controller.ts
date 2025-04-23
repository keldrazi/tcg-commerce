import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardConditionDTO, UpdateProductCardConditionDTO, ProductCardConditionDTO } from './dto/product.card.condition.dto';
import { ProductCardConditionService } from './product.card.condition.service';

@Controller('product/card/condition')
export class ProductCardConditionController {

    constructor(
        private productCardConditionService: ProductCardConditionService,
    ) { }
    
    
    @Get()
    async getProductCardConditions() {
        return await this.productCardConditionService.getProductCardConditions();
    }

    @Get('/create/:productLineName')
    async createProductCardConditionsByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productCardConditionService.createProductCardConditionsByProductLineName(productLineName);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardCondition(@Body() createProductCardConditionDTO: CreateProductCardConditionDTO) {
        return await this.productCardConditionService.createProductCardCondition(createProductCardConditionDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardCondition(@Body() updateProductCardConditionDTO: UpdateProductCardConditionDTO) {
        return await this.productCardConditionService.updateProductCardCondition(updateProductCardConditionDTO);
    }




}