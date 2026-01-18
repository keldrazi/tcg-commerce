import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FullfilmentOrderProductCardItemService } from './fullfilment.order.product.card.item.service';

@Controller('fullfilment/order/product/card/item')
export class FullfilmentOrderProductCardItemController {

    constructor(
        private fullfilmentOrderProductCardItemService: FullfilmentOrderProductCardItemService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderProductCardItemId')
    async getFullfilmentOrderProductCardItemById(@Param('fullfilmentOrderProductCardItemId') fullfilmentOrderProductCardItemId: string) {
        return await this.fullfilmentOrderProductCardItemService.getFullfilmentOrderProductCardItemById(fullfilmentOrderProductCardItemId);
    }

    @Get('/foid/:fullfilmentOrderId')
    async getFullfilmentOrderProductCardItemsByFullfilmentOrderId(@Param('fullfilmentOrderId') fullfilmentOrderId: string) {
        return await this.fullfilmentOrderProductCardItemService.getFullfilmentOrderProductCardItemsByFullfilmentOrderId(fullfilmentOrderId);
    }

}