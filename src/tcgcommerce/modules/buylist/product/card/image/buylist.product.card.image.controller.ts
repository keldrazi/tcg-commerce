import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistProductCardDTO, UpdateBuylistProductCardDTO, BuylistProductCardDTO } from './dto/buylist.product.card.dto';
import { BuylistProductCardService } from './buylist.product.card.service';



@Controller('buylist/product/card/image')
export class BuylistProductCardController {

    constructor(
        private buylistProductCardService: BuylistProductCardService,
    ) { }
    
    
    @Get('/id/:buylistProductCardId')
    async getBuylistProductCardById(@Param('buylistProductCardId') buylistProductCardId: string) {
        return await this.buylistProductCardService.getBuylistProductCardById(buylistProductCardId);
    }

    @Get('/all/:commerceAccountId')
    async getBuylistProductCards(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistProductCardService.getBuylistProductCardsByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistProductCard(@Body() createBuylistProductCardDTO: CreateBuylistProductCardDTO) {
        return await this.buylistProductCardService.createBuylistProductCard(createBuylistProductCardDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistProductCard(@Body() updateBuylistProductCardDTO: UpdateBuylistProductCardDTO) {
        return await this.buylistProductCardService.updateBuylistProductCard(updateBuylistProductCardDTO);
    }

}