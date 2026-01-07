import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceRuleProductCardBaseDTO, UpdatePriceRuleProductCardBaseDTO, PriceRuleProductCardBaseDTO } from './dto/price.rule.product.card.base.dto';
import { PriceRuleProductCardBaseService } from './price.rule.product.card.base.service';



@Controller('price/rule/product/card/base')
export class PriceRuleProductCardBaseController {

    constructor(
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
    ) { }


    @Get('/id/:priceRuleProductCardBaseId')
    async getPriceRuleProductCardBaseById(@Param('priceRuleProductCardBaseId') priceRuleProductCardBaseId: string) {
        return await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseById(priceRuleProductCardBaseId);
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getPriceRuleProductCardBaseByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPriceRuleProductCardBase(@Body() createPriceRuleProductCardBaseDTO: CreatePriceRuleProductCardBaseDTO) {
        return await this.priceRuleProductCardBaseService.createPriceRuleProductCardBase(createPriceRuleProductCardBaseDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePriceRuleProductCardBase(@Body() updatePriceRuleProductCardBaseDTO: UpdatePriceRuleProductCardBaseDTO) {
        return await this.priceRuleProductCardBaseService.updatePriceRuleProductCardBase(updatePriceRuleProductCardBaseDTO);
    }

}