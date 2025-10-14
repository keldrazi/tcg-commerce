import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceProductCardBaseDTO, UpdatePriceProductCardBaseDTO, PriceProductCardBaseDTO } from './dto/price.product.card.base.dto';
import { PriceProductCardBaseService } from './price.product.card.base.service';



@Controller('price/product/card/base')
export class PriceProductCardBaseController {

    constructor(
        private priceProductCardBaseService: PriceProductCardBaseService,
    ) { }


    @Get('id/:priceProductCardBaseId')
    async getPriceProductCardBase(@Param('priceProductCardBaseId') priceProductCardBaseId: string) {
        return await this.priceProductCardBaseService.getPriceProductCardBaseById(priceProductCardBaseId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceProductCardBase(@Body() createPriceProductCardBaseDTO: CreatePriceProductCardBaseDTO) {
        return await this.priceProductCardBaseService.createPriceProductCardBase(createPriceProductCardBaseDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceProductCardBase(@Body() updatePriceProductCardBaseDTO: UpdatePriceProductCardBaseDTO) {
        return await this.priceProductCardBaseService.updatePriceProductCardBase(updatePriceProductCardBaseDTO);
    }

}