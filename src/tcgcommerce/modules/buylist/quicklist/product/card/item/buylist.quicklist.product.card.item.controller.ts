import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { CreateBuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItemService } from './buylist.quicklist.product.card.item.service';

@Controller('buylist/quicklist/product/card/item')
export class BuylistQuicklistProductCardItemController {

    constructor(
        private buylistQuicklistProductCardItemService: BuylistQuicklistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistQuicklistProductCardItemId')
    async getBuylistQuicklistProductCardItemById(@Param('buylistQuicklistProductCardItemId') buylistQuicklistProductCardItemId: string) {
        return await this.buylistQuicklistProductCardItemService.getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId);
    }

    @Get('/blqlpcid/:buylistQuicklistProductCardId')
    async getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        return await this.buylistQuicklistProductCardItemService.getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(buylistQuicklistProductCardId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistQuicklistProductCardItem(@Body() createBuylistQuicklistProductCardItemDTO: CreateBuylistQuicklistProductCardItemDTO) {
        return await this.buylistQuicklistProductCardItemService.createBuylistQuicklistProductCardItem(createBuylistQuicklistProductCardItemDTO);
    }

    @Delete('/delete/:buylistQuicklistProductCardItemId')
    async deleteBuylistQuicklistProductCardItemById(@Param('buylistQuicklistProductCardItemId') buylistQuicklistProductCardItemId: string) {
        return await this.buylistQuicklistProductCardItemService.deleteBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId);
    }

    @Delete('/delete/blqlpcid/:buylistQuicklistProductCardId')
    async deleteBuylistQuicklistProductCardItemsByBuylistQuicklistProductCardId(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        return await this.buylistQuicklistProductCardItemService.deleteBuylistQuicklistProductCardItemsByBuylistQuicklistProductCardId(buylistQuicklistProductCardId);
    }

}