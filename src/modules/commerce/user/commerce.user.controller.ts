import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceUserService } from './commerce.user.service';
import { CreateCommerceUserDTO } from './dto/commerce.user.dto';



@Controller('commerce/user')
export class CommerceUserController {

    constructor(
        private commerceUserService: CommerceUserService,
    ) { }
    
    @Get('/:commerceUserId')
    async getCommerceUser(@Param('commerceUserId') commerceUserId: string) {
        return await this.commerceUserService.getCommerceUser(commerceUserId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceUser(@Body() createCommerceUserDTO: CreateCommerceUserDTO) {
        return this.commerceUserService.createCommerceUser(createCommerceUserDTO);
    }

}