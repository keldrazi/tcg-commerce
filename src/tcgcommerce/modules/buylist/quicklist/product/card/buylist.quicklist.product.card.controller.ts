import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, Delete, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistQuicklistProductCardDTO, UpdateBuylistQuicklistProductCardDTO } from './dto/buylist.quicklist.product.card.dto';
import { BuylistQuicklistProductCardService } from './buylist.quicklist.product.card.service';
import { EntityNotFoundError } from 'typeorm';


@Controller('buylist/quicklist/product/card')
export class BuylistQuicklistProductCardController {

    constructor(
        private buylistQuicklistProductCardService: BuylistQuicklistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistQuicklistProductCardId')
    async getBuylistQuicklistProductCardById(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        try {
            return await this.buylistQuicklistProductCardService.getBuylistQuicklistProductCardById(buylistQuicklistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist quicklist product card was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist quicklist product card');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistQuicklistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.buylistQuicklistProductCardService.getBuylistQuicklistProductCardsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist quicklist product card was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist quicklist product cards');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistQuicklistProductCard(@Body() createBuylistQuicklistProductCardDTO: CreateBuylistQuicklistProductCardDTO) {
        try {
            return await this.buylistQuicklistProductCardService.createBuylistQuicklistProductCard(createBuylistQuicklistProductCardDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist quicklist product card');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistQuicklistProductCard(@Body() updateBuylistQuicklistProductCardDTO: UpdateBuylistQuicklistProductCardDTO) {
        try {
            return await this.buylistQuicklistProductCardService.updateBuylistQuicklistProductCard(updateBuylistQuicklistProductCardDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist quicklist product card was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist quicklist product card');
        }
    }

    @Delete('/delete/:buylistQuicklistProductCardId')
    async deleteBuylistQuicklistProductCard(@Param('buylistQuicklistProductCardId') buylistQuicklistProductCardId: string) {
        try {
            return await this.buylistQuicklistProductCardService.deleteBuylistQuicklistProductCard(buylistQuicklistProductCardId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist quicklist product card was not found');
            }
            throw new InternalServerErrorException('Failed to delete buylist quicklist product card');
        }
    }

}