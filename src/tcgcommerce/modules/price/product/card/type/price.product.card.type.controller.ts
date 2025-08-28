import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceProductCardTypeDTO, UpdatePriceProductCardTypeDTO, PriceProductCardTypeDTO } from './dto/price.product.card.type.dto';
import { PriceProductCardTypeService } from './price.product.card.type.service';



@Controller('price/product/card/type')
export class PriceProductCardTypeController {

    constructor(
        private priceProductCardTypeService: PriceProductCardTypeService,
    ) { }
    
    
    @Get(':priceProductCardTypeId')
    async getPriceProductCardType(@Param('priceProductCardTypeId') priceProductCardTypeId: string) {
        return await this.priceProductCardTypeService.getPriceProductCardType(priceProductCardTypeId);
    }

    @Get()
    async getPriceProductCardTypes() {
        return await this.priceProductCardTypeService.getPriceProductCardTypes();
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceProductCardType(@Body() createPriceProductCardTypeDTO: CreatePriceProductCardTypeDTO) {
        return await this.priceProductCardTypeService.createPriceProductCardType(createPriceProductCardTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceProductCardType(@Body() updatePriceProductCardTypeDTO: UpdatePriceProductCardTypeDTO) {
        return await this.priceProductCardTypeService.updatePriceProductCardType(updatePriceProductCardTypeDTO);
    }

}