import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistHotlistProductCardDTO, UpdateBuylistHotlistProductCardDTO } from './dto/buylist.hotlist.product.card.dto';
import { BuylistHotlistProductCardService } from './buylist.hotlist.product.card.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/hotlist/product/card')
export class BuylistHotlistProductCardController {

    constructor(
        private buylistHotlistProductCardService: BuylistHotlistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistHotlistProductCardId')
    async getBuylistHotlistProductCardById(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        try {
            return await this.buylistHotlistProductCardService.getBuylistHotlistProductCardById(buylistHotlistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist hotlist product card');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistHotlistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.buylistHotlistProductCardService.getBuylistHotlistProductCardsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist hotlist product cards');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistHotlistProductCard(@Body() createBuylistHotlistProductCardDTO: CreateBuylistHotlistProductCardDTO) {
        try {
            return await this.buylistHotlistProductCardService.createBuylistHotlistProductCard(createBuylistHotlistProductCardDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist hotlist product card');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistHotlistProductCard(@Body() updateBuylistHotlistProductCardDTO: UpdateBuylistHotlistProductCardDTO) {
        try {
            return await this.buylistHotlistProductCardService.updateBuylistHotlistProductCard(updateBuylistHotlistProductCardDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist hotlist product card');
        }
    }

    @Delete('/delete/:buylistHotlistProductCardId')
    async deleteBuylistHotlistProductCard(@Param('buylistHotlistProductCardId') buylistHotlistProductCardId: string) {
        try {
            return await this.buylistHotlistProductCardService.deleteBuylistHotlistProductCard(buylistHotlistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist hotlist product card was not found');
            }
            throw new InternalServerErrorException('Failed to delete buylist hotlist product card');
        }
    }

}