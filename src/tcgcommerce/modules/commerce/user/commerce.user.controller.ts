import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { CommerceUserService } from './commerce.user.service';
import { CreateCommerceUserDTO, UpdateCommerceUserDTO } from './dto/commerce.user.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/user')
export class CommerceUserController {

    constructor(
        private commerceUserService: CommerceUserService,
    ) { }
    
    @Get('/id/:commerceUserId')
    async getCommerceUser(@Param('commerceUserId') commerceUserId: string) {
        try {
            return await this.commerceUserService.getCommerceUserById(commerceUserId);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce user was not found for commerceUserId: ' + commerceUserId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while getting the commerce user');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCommerceUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceUserService.getCommerceUsersByCommerceAccountId(commerceAccountId);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce users not found for commerceAccountId: ' + commerceAccountId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while getting commerce users');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceUser(@Body() createCommerceUserDTO: CreateCommerceUserDTO) {
        try {
            return await this.commerceUserService.createCommerceUser(createCommerceUserDTO);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce user not found');
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while creating the commerce user');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceUser(@Body() updateCommerceUserDTO: UpdateCommerceUserDTO) {
        try {
            return await this.commerceUserService.updateCommerceUser(updateCommerceUserDTO);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce user not found for commerceUserId: ' + updateCommerceUserDTO.commerceUserId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while updating the commerce user');
        }
    }
}