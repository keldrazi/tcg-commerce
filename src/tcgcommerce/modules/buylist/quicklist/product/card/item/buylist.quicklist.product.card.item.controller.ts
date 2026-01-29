import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, Delete, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistQuicklistProductCardItemDTO } from './dto/buylist.quicklist.product.card.item.dto';
import { BuylistQuicklistProductCardItemService } from './buylist.quicklist.product.card.item.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/quicklist/product/card/item')
export class BuylistQuicklistProductCardItemController {

    constructor(
        private buylistQuicklistProductCardItemService: BuylistQuicklistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistQuicklistProductCardItemId')
    async getBuylistQuicklistProductCardItemById(@Param('buylistQuicklistProductCardItemId') buylistQuicklistProductCardItemId: string) {
        try {
            return await this.buylistQuicklistProductCardItemService.getBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist quicklist product card item was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist quicklist product card item');
        }
    }

    @Get('/blqlpcid/:buylistQuicklistProductCardId')
    async getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        try {
            return await this.buylistQuicklistProductCardItemService.getBuylistQuicklistProductCardItemsByBuyListQuicklistProductCardId(buylistQuicklistProductCardId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist quicklist product card items');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistQuicklistProductCardItem(@Body() createBuylistQuicklistProductCardItemDTO: CreateBuylistQuicklistProductCardItemDTO) {
        try {
            return await this.buylistQuicklistProductCardItemService.createBuylistQuicklistProductCardItem(createBuylistQuicklistProductCardItemDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist quicklist product card item');
        }
    }

    @Delete('/delete/:buylistQuicklistProductCardItemId')
    async deleteBuylistQuicklistProductCardItemById(@Param('buylistQuicklistProductCardItemId') buylistQuicklistProductCardItemId: string) {
        try {
            return await this.buylistQuicklistProductCardItemService.deleteBuylistQuicklistProductCardItemById(buylistQuicklistProductCardItemId);
        } catch (e) {
            if(e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to delete buylist quicklist product card item');
        }
    }

    @Delete('/delete/blqlpcid/:buylistQuicklistProductCardId')
    async deleteBuylistQuicklistProductCardItemsByBuylistQuicklistProductCardId(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        try {
            return await this.buylistQuicklistProductCardItemService.deleteBuylistQuicklistProductCardItemsByBuylistQuicklistProductCardId(buylistQuicklistProductCardId);
        } catch (e) {
            if(e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to delete buylist quicklist product card items');
        }
    }
}