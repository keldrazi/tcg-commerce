import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistProductCardItemDTO, UpdateBuylistProductCardItemDTO } from './dto/buylist.product.card.item.dto';
import { BuylistProductCardItemService } from './buylist.product.card.item.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/product/card/item')
export class BuylistProductCardItemController {

    constructor(
        private buylistProductCardItemService: BuylistProductCardItemService,
    ) { }
    
    
    @Get('/id/:buylistProductCardItemId')
    async getBuylistProductCardItemById(@Param('buylistProductCardItemId') buylistProductCardItemId: string) {
        try {
            return await this.buylistProductCardItemService.getBuylistProductCardItemById(buylistProductCardItemId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Product Card Item not found');
            }
            throw new InternalServerErrorException('Failed to get buylist product card item');
        }
    }

    @Get('/blpcid/:buylistProductCardId')
    async getBuylistProductCardItemsByBuylistProductCardId(@Param('buylistProductCardId') buylistProductCardId: string) {
        try {
            return await this.buylistProductCardItemService.getBuylistProductCardItemsByBuylistProductCardId(buylistProductCardId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist product card items');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCardItem(@Body() createBuylistProductCardItemDTO: CreateBuylistProductCardItemDTO) {
        try {
            return await this.buylistProductCardItemService.createBuylistProductCardItem(createBuylistProductCardItemDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist product card item');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistProductCardItem(@Body() updateBuylistProductCardItemDTO: UpdateBuylistProductCardItemDTO) {
        try {
        return await this.buylistProductCardItemService.updateBuylistProductCardItem(updateBuylistProductCardItemDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Product Card Item not found');
            }
            throw new InternalServerErrorException('Failed to update buylist product card item');
        }
    }

    @Delete('/delete/:buylistProductCardItemId')
    async deleteBuylistProductCardItem(@Param('buylistProductCardItemId') buylistProductCardItemId: string) {
        try {
            return await this.buylistProductCardItemService.deleteBuylistProductCardItemById(buylistProductCardItemId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Product Card Item not found');
            }
            throw new InternalServerErrorException('Failed to delete buylist product card item');
        }
    }

}