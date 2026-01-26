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
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user was not found for customerUserId: ' + customerUserId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while getting the customer user');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.customerUserService.getCustomerUsersByCommerceAccountId(commerceAccountId);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer users not found for commerceAccountId: ' + commerceAccountId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while getting customer users');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerUser(@Body() createCustomerUserDTO: CreateCustomerUserDTO) {
        try {
            return await this.customerUserService.createCustomerUser(createCustomerUserDTO);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user not found');
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while creating the customer user');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerUser(@Body() updateCustomerUserDTO: UpdateCustomerUserDTO) {
        try {
            return await this.customerUserService.updateCustomerUser(updateCustomerUserDTO);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user not found for customerUserId: ' + updateCustomerUserDTO.customerUserId);
            }
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('An error occurred while updating the customer user');
        }
    }


}