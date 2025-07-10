import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePricingProductCardTypeDTO, UpdatePricingProductCardTypeDTO, PricingProductCardTypeDTO } from './dto/pricing.product.card.type.dto';
import { PricingProductCardTypeService } from './pricing.product.card.type.service';



@Controller('pricing/product/card/type')
export class PricingProductCardTypeController {

    constructor(
        private pricingProductCardTypeService: PricingProductCardTypeService,
    ) { }
    
    
    @Get(':pricingProductCardTypeId')
    async getPricingProductCardType(@Param('pricingProductCardTypeId') pricingProductCardTypeId: string) {
        return await this.pricingProductCardTypeService.getPricingProductCardType(pricingProductCardTypeId);
    }

    @Get()
    async getPricingProductCardTypes() {
        return await this.pricingProductCardTypeService.getPricingProductCardTypes();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPricingProductCardType(@Body() createPricingProductCardTypeDTO: CreatePricingProductCardTypeDTO) {
        return await this.pricingProductCardTypeService.createPricingProductCardType(createPricingProductCardTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePricingProductCardType(@Body() updatePricingProductCardTypeDTO: UpdatePricingProductCardTypeDTO) {
        return await this.pricingProductCardTypeService.updatePricingProductCardType(updatePricingProductCardTypeDTO);
    }

}