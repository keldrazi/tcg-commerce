import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItemService } from './buylist.product.card.item.service';

@Controller('buylist/product/card/item')
export class BuylistProductCardItemController {

    constructor(
        private buylistProductCardItemService: BuylistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistProductCardItemId')
    async getBuylistProductCardItemById(@Param('buylistProductCardItemId') buylistProductCardItemId: string) {
        return await this.buylistProductCardItemService.getBuylistProductCardItemById(buylistProductCardItemId);
    }

    @Get('/blpcid/:buylistProductCardId')
    async getBuylistProductCardItemsByBuylistProductCardId(@Param('buylistProductCardId') buylistProductCardId: string) {
        return await this.buylistProductCardItemService.getBuylistProductCardItemsByBuylistProductCardId(buylistProductCardId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCardItem(@Body() createBuylistProductCardItemDTO: CreateBuylistProductCardItemDTO) {
        return await this.buylistProductCardItemService.createBuylistProductCardItem(createBuylistProductCardItemDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistProductCardItem(@Body() updateBuylistProductCardItemDTO: UpdateBuylistProductCardItemDTO) {
        return await this.buylistProductCardItemService.updateBuylistProductCardItem(updateBuylistProductCardItemDTO);
    }

    @Delete('/delete/:buylistProductCardItemId')
    async deleteBuylistProductCardItem(@Param('buylistProductCardItemId') buylistProductCardItemId: string) {
        return await this.buylistProductCardItemService.deleteBuylistProductCardItemById(buylistProductCardItemId);
    }

}