import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceUserService } from './commerce.user.service';
import { CreateCommerceUserDTO, UpdateCommerceUserDTO } from './dto/commerce.user.dto';

@Controller('commerce/user')
export class CommerceUserController {

    constructor(
        private commerceUserService: CommerceUserService,
    ) { }
    
    @Get('/id/:commerceUserId')
    async getCommerceUser(@Param('commerceUserId') commerceUserId: string) {
        return await this.commerceUserService.getCommerceUserById(commerceUserId);
    }

    @Get('/caid/:commerceAccountId')
    async getCommerceUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceUserService.getCommerceUsersByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceUser(@Body() createCommerceUserDTO: CreateCommerceUserDTO) {
        return this.commerceUserService.createCommerceUser(createCommerceUserDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceUser(@Body() updateCommerceUserDTO: UpdateCommerceUserDTO) {
        return this.commerceUserService.updateCommerceUser(updateCommerceUserDTO);
    }
}