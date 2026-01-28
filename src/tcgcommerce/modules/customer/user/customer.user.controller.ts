import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CustomerUserService } from './customer.user.service';
import { CreateCustomerUserDTO, UpdateCustomerUserDTO } from './dto/customer.user.dto';
import { EntityNotFoundError } from 'typeorm';



@Controller('customer/user')
export class CustomerUserController {

    constructor(
        private customerUserService: CustomerUserService,
    ) { }
    
    @Get('id/:customerUserId')
    async getCustomerUserById(@Param('customerUserId') customerUserId: string) {
        try {
            return await this.customerUserService.getCustomerUserById(customerUserId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user was not found');
            }
            throw new InternalServerErrorException('An error occurred while getting the customer user');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.customerUserService.getCustomerUsersByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer users not found');
            }
            throw new InternalServerErrorException('An error occurred while getting customer users');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerUser(@Body() createCustomerUserDTO: CreateCustomerUserDTO) {
        try {
            return await this.customerUserService.createCustomerUser(createCustomerUserDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('An error occurred while creating the customer user');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerUser(@Body() updateCustomerUserDTO: UpdateCustomerUserDTO) {
        try {
            return await this.customerUserService.updateCustomerUser(updateCustomerUserDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user not found');
            }
            throw new InternalServerErrorException('An error occurred while updating the customer user');
        }
    }


}