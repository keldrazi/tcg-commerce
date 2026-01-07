import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO } from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlistService } from './buylist.price.product.card.rule.hotlist.service';

@Controller('buylist/price/product/card/rule/hotlist')
export class BuylistPriceProductCardRuleHotlistController {

    constructor(
        private buylistPriceProductCardRuleHotlistService: BuylistPriceProductCardRuleHotlistService,
    ) { }


    @Get('/id/:buylistPriceProductCardRuleHotlistId')
    async getBuylistPriceProductCardRuleHotlist(@Param('buylistPriceProductCardRuleHotlistId') buylistPriceProductCardRuleHotlistId: string) {
        return await this.buylistPriceProductCardRuleHotlistService.getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId);
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getBuylistPriceProductCardRuleHotlistByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        return await this.buylistPriceProductCardRuleHotlistService.getBuylistPriceProductCardRuleHotlistByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleHotlist(@Body() createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO) {
        return await this.buylistPriceProductCardRuleHotlistService.createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleHotlist(@Body() updateBuylistPriceProductCardRuleHotlistDTO: UpdateBuylistPriceProductCardRuleHotlistDTO) {
        return await this.buylistPriceProductCardRuleHotlistService.updateBuylistPriceProductCardRuleHotlist(updateBuylistPriceProductCardRuleHotlistDTO);
    }

}