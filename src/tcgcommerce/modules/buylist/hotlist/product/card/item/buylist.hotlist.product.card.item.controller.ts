import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistHotlistProductCardItemDTO, UpdateBuylistHotlistProductCardItemDTO } from './dto/buylist.hotlist.product.card.item.dto';
import { BuylistHotlistProductCardItemService } from './buylist.hotlist.product.card.item.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/hotlist/product/card/item')
export class BuylistHotlistProductCardItemController {

    constructor(
        private buylistHotlistProductCardItemService: BuylistHotlistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistHotlistProductCardItemId')
    async getBuylistHotlistProductCardItemById(@Param('buylistHotlistProductCardItemId') buylistHotlistProductCardItemId: string) {
        try {
            return await this.buylistHotlistProductCardItemService.getBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card item was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist hotlist product card item');
        }
    }

    @Get('/blhlpcid/:buylistHotlistProductCardId')
    async getBuylistHotlistProductCardItemsByBuyListHotlistProductCardId(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        try {
            return await this.buylistHotlistProductCardItemService.getBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(buylistHotlistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card items were not found');
            }
            throw new InternalServerErrorException('Failed to get buylist hotlist product card items');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistHotlistProductCardItem(@Body() createBuylistHotlistProductCardItemDTO: CreateBuylistHotlistProductCardItemDTO) {
        try {
            return await this.buylistHotlistProductCardItemService.createBuylistHotlistProductCardItem(createBuylistHotlistProductCardItemDTO);
        } catch (e) {
            if( e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist hotlist product card item');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistHotlistProductCardItem(@Body() updateBuylistHotlistProductCardItemDTO: UpdateBuylistHotlistProductCardItemDTO) {
        try {
            return await this.buylistHotlistProductCardItemService.updateBuylistHotlistProductCardItem(updateBuylistHotlistProductCardItemDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card item not found');
            }
            throw new InternalServerErrorException('Failed to update buylist hotlist product card item');
        }
    }

    @Delete('/delete/:buylistHotlistProductCardItemId')
    async deleteBuylistHotlistProductCardItemById(@Param('buylistHotlistProductCardItemId') buylistHotlistProductCardItemId: string) {
        try {
            return await this.buylistHotlistProductCardItemService.deleteBuylistHotlistProductCardItemById(buylistHotlistProductCardItemId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card item not found');
            }
            throw new InternalServerErrorException('Failed to delete buylist hotlist product card item');
        }
    }

    @Delete('/delete/blhlpcid/:buylistHotlistProductCardId')
    async deleteBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        try {
            return await this.buylistHotlistProductCardItemService.deleteBuylistHotlistProductCardItemsByBuylistHotlistProductCardId(buylistHotlistProductCardId);
        } catch (e) {
            if(e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to delete buylist hotlist product card items');
        }
    }

}