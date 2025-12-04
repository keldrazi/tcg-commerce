import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { BuylistUserService } from './buylist.user.service';
import { CreateBuylistUserDTO, UpdateBuylistUserDTO } from './dto/buylist.user.dto';



@Controller('commerce/user')
export class BuylistUserController {

    constructor(
        private buylistUserService: BuylistUserService,
    ) { }
    
    @Get('/:buylistUserId')
    async getBuylistUser(@Param('buylistUserId') buylistUserId: string) {
        return await this.buylistUserService.getBuylistUserById(buylistUserId);
    }

    @Get('/all/:commerceAccountId')
    async getBuylistUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.buylistUserService.getBuylistUsersByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistUser(@Body() createBuylistUserDTO: CreateBuylistUserDTO) {
        return this.buylistUserService.createBuylistUser(createBuylistUserDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistUser(@Body() updateBuylistUserDTO: UpdateBuylistUserDTO) {
        return this.buylistUserService.updateBuylistUser(updateBuylistUserDTO);
    }


}