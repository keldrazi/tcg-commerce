import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FullfilmentOrderService } from './fullfilment.order.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('fullfilment/order')
export class FullfilmentOrderController {

    constructor(
        private fullfilmentOrderService: FullfilmentOrderService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderId')
    async getFullfilmentOrderById(@Param('fullfilmentOrderId') fullfilmentOrderId: string) {
        try {
            return await this.fullfilmentOrderService.getFullfilmentOrderById(fullfilmentOrderId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment order not found');
            }
            throw new InternalServerErrorException('Failed to get fullfilment order');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getFullfilmentOrdersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.fullfilmentOrderService.getFullfilmentOrdersByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get fullfilment orders');
        }
    }

}