import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO } from './dto/commerce.account.dto';
import { CommerceAccountService } from './commerce.account.service';

@Controller('commerce/account')
export class CommerceAccountController {

    constructor(
        private commerceAccountService: CommerceAccountService,
    ) { }
     
    @Get('/:commerceAccountId')
    async getCommerceAccount(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountService.getCommerceAccount(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccount(@Body() createCommerceAcountDTO: CreateCommerceAccountDTO) {
        return await this.commerceAccountService.createCommerceAccount(createCommerceAcountDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccount(@Body() updateCommerceAcountDTO: UpdateCommerceAccountDTO) {
        return await this.commerceAccountService.updateCommerceAccount(updateCommerceAcountDTO);
    }

}