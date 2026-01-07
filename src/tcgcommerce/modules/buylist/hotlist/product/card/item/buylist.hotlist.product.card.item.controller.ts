import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistHotlistProductCardItemDTO, UpdateBuylistHotlistProductCardItemDTO } from './dto/buylist.hotlist.product.card.item.dto';
import { BuylistHotlistProductCardItemService } from './buylist.hotlist.product.card.item.service';

@Controller('buylist/hotlist/product/card/item')
export class BuylistHotlistProductCardItemController {

    constructor(
        private buylistHotlistProductCardItemService: BuylistHotlistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistHotlistProductCardItemId')
    async getBuylistHotlistProductCardItemById(@Param('buylistHotlistProductCardItemId') buylistHotlistProductCardItemId: string) {
        return await this.buylistHotlistProductCardItemService.getBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId);
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistHotlistProductCardItems(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistHotlistProductCardItemService.getBuylistHotlistProductCardItemsByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistHotlistProductCardItem(@Body() createBuylistHotlistProductCardItemDTO: CreateBuylistHotlistProductCardItemDTO) {
        return await this.buylistHotlistProductCardItemService.createBuylistHotlistProductCardItem(createBuylistHotlistProductCardItemDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistHotlistProductCardItem(@Body() updateBuylistHotlistProductCardItemDTO: UpdateBuylistHotlistProductCardItemDTO) {
        return await this.buylistHotlistProductCardItemService.updateBuylistHotlistProductCardItem(updateBuylistHotlistProductCardItemDTO);
    }

}