import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO } from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlistService } from './buylist.price.product.card.rule.hotlist.service';

@Controller('buylist/price/product/card/rule/hotlist')
export class BuylistPriceProductCardRuleHotlistController {

    constructor(
        private buylistPriceProductCardRuleHotlistService: BuylistPriceProductCardRuleHotlistService,
    ) { }


    @Get('id/:buylistPriceProductCardRuleHotlistId')
    async getBuylistPriceProductCardRuleHotlist(@Param('buylistPriceProductCardRuleHotlistId') buylistPriceProductCardRuleHotlistId: string) {
        return await this.buylistPriceProductCardRuleHotlistService.getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleHotlist(@Body() createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO) {
        return await this.buylistPriceProductCardRuleHotlistService.createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleHotlist(@Body() updateBuylistPriceProductCardRuleHotlistDTO: UpdateBuylistPriceProductCardRuleHotlistDTO) {
        return await this.buylistPriceProductCardRuleHotlistService.updateBuylistPriceProductCardRuleHotlist(updateBuylistPriceProductCardRuleHotlistDTO);
    }

}