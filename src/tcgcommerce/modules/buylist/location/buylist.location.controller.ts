import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistLocationDTO, UpdateBuylistLocationDTO, BuylistLocationDTO } from './dto/buylist.location.dto';
import { BuylistLocationService } from './buylist.location.service';



@Controller('buylist/location')
export class BuylistLocationController {

    constructor(
        private buylistLocationService: BuylistLocationService,
    ) { }
    
    
    @Get('/id/:buylistLocationId')
    async getBuylistLocationById(@Param('buylistLocationId') buylistLocationId: string) {
        return await this.buylistLocationService.getBuylistLocationById(buylistLocationId);
    }

    @Get('/all/:commerceAccountId')
    async getBuylistLocationsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistLocationService.getBuylistLocationsByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistLocation(@Body() createBuylistLocationDTO: CreateBuylistLocationDTO) {
        return await this.buylistLocationService.createBuylistLocation(createBuylistLocationDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistLocation(@Body() updateBuylistLocationDTO: UpdateBuylistLocationDTO) {
        return await this.buylistLocationService.updateBuylistLocation(updateBuylistLocationDTO);
    }

}