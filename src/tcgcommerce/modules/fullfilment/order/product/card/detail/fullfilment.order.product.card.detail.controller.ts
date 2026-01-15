import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FullfilmentOrderService } from './fullfilment.order.service';

@Controller('fullfilment/order')
export class FullfilmentOrderController {

    constructor(
        private fullfilmentOrderService: FullfilmentOrderService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderId')
    async getFullfilmentOrderById(@Param('fullfilmentOrderId') fullfilmentOrderId: string) {
        return await this.fullfilmentOrderService.getFullfilmentOrderById(fullfilmentOrderId);
    }

    @Get('/caid/:commerceAccountId')
    async getFullfilmentOrdersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.fullfilmentOrderService.getFullfilmentOrdersByCommerceAccountId(commerceAccountId);
    }

}