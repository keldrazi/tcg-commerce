import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO, BuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
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

}