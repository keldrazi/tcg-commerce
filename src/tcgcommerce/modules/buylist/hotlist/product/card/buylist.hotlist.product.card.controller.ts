import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistHotlistProductCardDTO, UpdateBuylistHotlistProductCardDTO } from './dto/buylist.hotlist.product.card.dto';
import { BuylistHotlistProductCardService } from './buylist.hotlist.product.card.service';



@Controller('buylist/hotlist/product/card')
export class BuylistHotlistProductCardController {

    constructor(
        private buylistHotlistProductCardService: BuylistHotlistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistHotlistProductCardId')
    async getBuylistHotlistProductCardById(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        return await this.buylistHotlistProductCardService.getBuylistHotlistProductCardById(buylistHotlistProductCardId);
    }

    @Get('/all/:commerceAccountId')
    async getBuylistHotlistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistHotlistProductCardService.getBuylistHotlistProductCardsByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistHotlistProductCard(@Body() createBuylistHotlistProductCardDTO: CreateBuylistHotlistProductCardDTO) {
        return await this.buylistHotlistProductCardService.createBuylistHotlistProductCard(createBuylistHotlistProductCardDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistHotlistProductCard(@Body() updateBuylistHotlistProductCardDTO: UpdateBuylistHotlistProductCardDTO) {
        return await this.buylistHotlistProductCardService.updateBuylistHotlistProductCard(updateBuylistHotlistProductCardDTO);
    }

}