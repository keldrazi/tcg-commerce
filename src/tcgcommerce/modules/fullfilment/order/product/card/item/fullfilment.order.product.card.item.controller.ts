import { Controller, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FullfilmentOrderProductCardItemService } from './fullfilment.order.product.card.item.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('fullfilment/order/product/card/item')
export class FullfilmentOrderProductCardItemController {

    constructor(
        private fullfilmentOrderProductCardItemService: FullfilmentOrderProductCardItemService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderProductCardItemId')
    async getFullfilmentOrderProductCardItemById(@Param('fullfilmentOrderProductCardItemId') fullfilmentOrderProductCardItemId: string) {
        try {
            return await this.fullfilmentOrderProductCardItemService.getFullfilmentOrderProductCardItemById(fullfilmentOrderProductCardItemId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment order product card item not found');
            }
            throw new InternalServerErrorException('Failed to get fullfilment order product card item');
        }
    }

    @Get('/foid/:fullfilmentOrderId')
    async getFullfilmentOrderProductCardItemsByFullfilmentOrderId(@Param('fullfilmentOrderId') fullfilmentOrderId: string) {
        try {
            return await this.fullfilmentOrderProductCardItemService.getFullfilmentOrderProductCardItemsByFullfilmentOrderId(fullfilmentOrderId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get fullfilment order product card items');
        }
    }

}