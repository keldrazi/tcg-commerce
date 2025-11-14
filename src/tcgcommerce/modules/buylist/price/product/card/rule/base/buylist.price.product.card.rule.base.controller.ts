import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO } from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBaseService } from './buylist.price.product.card.rule.base.service';



@Controller('buylist/price/product/card/rule/base')
export class BuylistPriceProductCardRuleBaseController {

    constructor(
        private buylistPriceProductCardRuleBaseService: BuylistPriceProductCardRuleBaseService,
    ) { }


    @Get('id/:buylistPriceProductCardRuleBaseId')
    async getBuylistPriceProductCardRuleBase(@Param('buylistPriceProductCardRuleBaseId') buylistPriceProductCardRuleBaseId: string) {
        return await this.buylistPriceProductCardRuleBaseService.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleBase(@Body() createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO) {
        return await this.buylistPriceProductCardRuleBaseService.createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleBase(@Body() updateBuylistPriceProductCardRuleBaseDTO: UpdateBuylistPriceProductCardRuleBaseDTO) {
        return await this.buylistPriceProductCardRuleBaseService.updateBuylistPriceProductCardRuleBase(updateBuylistPriceProductCardRuleBaseDTO);
    }

}