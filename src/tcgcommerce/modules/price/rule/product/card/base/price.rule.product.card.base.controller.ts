import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceRuleProductCardBaseDTO, UpdatePriceRuleProductCardBaseDTO, PriceRuleProductCardBaseDTO } from './dto/price.rule.product.card.base.dto';
import { PriceRuleProductCardBaseService } from './price.rule.product.card.base.service';



@Controller('price/rule/product/card/base')
export class PriceRuleProductCardBaseController {

    constructor(
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
    ) { }


    @Get('id/:priceRuleProductCardBaseId')
    async getPriceRuleProductCardBase(@Param('priceRuleProductCardBaseId') priceRuleProductCardBaseId: string) {
        return await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseById(priceRuleProductCardBaseId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceRuleProductCardBase(@Body() createPriceRuleProductCardBaseDTO: CreatePriceRuleProductCardBaseDTO) {
        return await this.priceRuleProductCardBaseService.createPriceRuleProductCardBase(createPriceRuleProductCardBaseDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceRuleProductCardBase(@Body() updatePriceRuleProductCardBaseDTO: UpdatePriceRuleProductCardBaseDTO) {
        return await this.priceRuleProductCardBaseService.updatePriceRuleProductCardBase(updatePriceRuleProductCardBaseDTO);
    }

}