import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateBuylistProductCardDTO, UpdateBuylistProductCardDTO } from './dto/buylist.product.card.dto';
import { BuylistProductCardService } from './buylist.product.card.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/product/card')
export class BuylistProductCardController {

    constructor(
        private buylistProductCardService: BuylistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistProductCardId')
    async getBuylistProductCardById(@Param('buylistProductCardId') buylistProductCardId: string) {
        try {
            return await this.buylistProductCardService.getBuylistProductCardById(buylistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist product card was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist product card');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.buylistProductCardService.getBuylistProductCardsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist product cards');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCard(@Body() createBuylistProductCardDTO: CreateBuylistProductCardDTO) {
        try {
            return await this.buylistProductCardService.createBuylistProductCard(createBuylistProductCardDTO);
        } catch (e) {
            throw new InternalServerErrorException('Failed to create buylist product card');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistProductCard(@Body() updateBuylistProductCardDTO: UpdateBuylistProductCardDTO) {
        try {
            return await this.buylistProductCardService.updateBuylistProductCard(updateBuylistProductCardDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist product card was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist product card');
        }
    }

}