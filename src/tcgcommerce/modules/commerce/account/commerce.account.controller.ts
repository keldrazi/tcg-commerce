import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateCommerceAccountDTO, UpdateCommerceAccountDTO } from './dto/commerce.account.dto';
import { CommerceAccountService } from './commerce.account.service';
import { Entity, EntityNotFoundError } from 'typeorm';

@Controller('commerce/account')
export class CommerceAccountController {

    constructor(
        private commerceAccountService: CommerceAccountService,
    ) { }
     
    @Get('/id/:commerceAccountId')
    async getCommerceAccountById(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceAccountService.getCommerceAccountById(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccount(@Body() createCommerceAcountDTO: CreateCommerceAccountDTO) {
        try {
        return await this.commerceAccountService.createCommerceAccount(createCommerceAcountDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create application module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccount(@Body() updateCommerceAcountDTO: UpdateCommerceAccountDTO) {
        try {
            return await this.commerceAccountService.updateCommerceAccount(updateCommerceAcountDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account not found');
            }
            throw new InternalServerErrorException('Failed to update commerce account');
        }
    }
}