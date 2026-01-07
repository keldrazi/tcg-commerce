import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
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

    @Get('/blhlpcid/:buylistHotlistProductCardId')
    async getBuylistHotlistProductCardItemsByBuyListHotlistProductCardId(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        return await this.buylistHotlistProductCardItemService.getBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(buylistHotlistProductCardId);
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

    @Delete('/delete/:buylistHotlistProductCardItemId')
    async deleteBuylistHotlistProductCardItem(@Param('buylistHotlistProductCardItemId') buylistHotlistProductCardItemId: string) {
        return await this.buylistHotlistProductCardItemService.deleteBuylistHotlistProductCardItem(buylistHotlistProductCardItemId);
    }

}