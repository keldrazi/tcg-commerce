import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO } from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBaseService } from './buylist.price.product.card.rule.base.service';

@Controller('buylist/price/product/card/rule/base')
export class BuylistPriceProductCardRuleBaseController {

    constructor(
        private buylistPriceProductCardRuleBaseService: BuylistPriceProductCardRuleBaseService,
    ) { }


    @Get('/id/:buylistPriceProductCardRuleBaseId')
    async getBuylistPriceProductCardRuleBase(@Param('buylistPriceProductCardRuleBaseId') buylistPriceProductCardRuleBaseId: string) {
        return await this.buylistPriceProductCardRuleBaseService.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId);
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getBuylistPriceProductCardRuleBaseByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.buylistPriceProductCardRuleBaseService.getBuylistPriceProductCardRuleBaseByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleBase(@Body() createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO) {
        return await this.buylistPriceProductCardRuleBaseService.createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleBase(@Body() updateBuylistPriceProductCardRuleBaseDTO: UpdateBuylistPriceProductCardRuleBaseDTO) {
        return await this.buylistPriceProductCardRuleBaseService.updateBuylistPriceProductCardRuleBase(updateBuylistPriceProductCardRuleBaseDTO);
    }

}