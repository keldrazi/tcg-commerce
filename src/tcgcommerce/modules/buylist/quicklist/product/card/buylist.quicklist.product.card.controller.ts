import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { CreateBuylistQuicklistProductCardDTO, UpdateBuylistQuicklistProductCardDTO } from './dto/buylist.quicklist.product.card.dto';
import { BuylistQuicklistProductCardService } from './buylist.quicklist.product.card.service';

@Controller('buylist/quicklist/product/card')
export class BuylistQuicklistProductCardController {

    constructor(
        private buylistQuicklistProductCardService: BuylistQuicklistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistQuicklistProductCardId')
    async getBuylistQuicklistProductCardById(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        return await this.buylistQuicklistProductCardService.getBuylistQuicklistProductCardById(buylistQuicklistProductCardId);
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistQuicklistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistQuicklistProductCardService.getBuylistQuicklistProductCardsByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistQuicklistProductCard(@Body() createBuylistQuicklistProductCardDTO: CreateBuylistQuicklistProductCardDTO) {
        return await this.buylistQuicklistProductCardService.createBuylistQuicklistProductCard(createBuylistQuicklistProductCardDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistQuicklistProductCard(@Body() updateBuylistQuicklistProductCardDTO: UpdateBuylistQuicklistProductCardDTO) {
        return await this.buylistQuicklistProductCardService.updateBuylistQuicklistProductCard(updateBuylistQuicklistProductCardDTO);
    }

    @Delete('/delete/:buylistQuicklistProductCardId')
    async deleteBuylistQuicklistProductCard(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        return await this.buylistQuicklistProductCardService.deleteBuylistQuicklistProductCard(buylistQuicklistProductCardId);
    }

}