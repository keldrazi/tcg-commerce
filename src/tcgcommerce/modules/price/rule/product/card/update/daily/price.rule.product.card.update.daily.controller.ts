import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePriceRuleProductCardUpdateDailyDTO, UpdatePriceRuleProductCardUpdateDailyDTO, PriceRuleProductCardUpdateDailyDTO } from './dto/price.rule.product.card.update.daily.dto';
import { PriceRuleProductCardUpdateDailyService } from './price.rule.product.card.update.daily.service';



@Controller('price/rule/product/card/update/daily')
export class PriceRuleProductCardUpdateDailyController {

    constructor(
        private priceRuleProductCardUpdateDailyService: PriceRuleProductCardUpdateDailyService,
    ) { }


    @Get('id/:priceRuleProductCardUpdateDailyId')
    async getPriceRuleProductCardUpdateDaily(@Param('priceRuleProductCardUpdateDailyId') priceRuleProductCardUpdateDailyId: string) {
        return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDailyId);
    }

    @Get('commerceAccountId/:commerceAccountId')
    async getPriceRuleProductCardUpdateDailyByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyByCommerceAccountId(commerceAccountId);
    }

    @Get('commerceAccountId/:commerceAccountId/productVendorId/:productVendorId/productLineId/:productLineId/productTypeId/:productTypeId')
    async getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(commerceAccountId, productVendorId, productLineId, productTypeId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceRuleProductCardUpdateDaily(@Body() createPriceRuleProductCardUpdateDailyDTO: CreatePriceRuleProductCardUpdateDailyDTO) {
        return await this.priceRuleProductCardUpdateDailyService.createPriceRuleProductCardUpdateDaily(createPriceRuleProductCardUpdateDailyDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceRuleProductCardUpdateDaily(@Body() updatePriceRuleProductCardUpdateDailyDTO: UpdatePriceRuleProductCardUpdateDailyDTO) {
        return await this.priceRuleProductCardUpdateDailyService.updatePriceRuleProductCardUpdateDaily(updatePriceRuleProductCardUpdateDailyDTO);
    }

}