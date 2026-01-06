import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerUserService } from './customer.user.service';
import { CreateCustomerUserDTO, UpdateCustomerUserDTO } from './dto/customer.user.dto';



@Controller('customer/user')
export class CustomerUserController {

    constructor(
        private customerUserService: CustomerUserService,
    ) { }
    
    @Get('id/:customerUserId')
    async getCustomerUserById(@Param('customerUserId') customerUserId: string) {
        return await this.customerUserService.getCustomerUserById(customerUserId);
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.customerUserService.getCustomerUsersByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerUser(@Body() createCustomerUserDTO: CreateCustomerUserDTO) {
        return this.customerUserService.createCustomerUser(createCustomerUserDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerUser(@Body() updateCustomerUserDTO: UpdateCustomerUserDTO) {
        return this.customerUserService.updateCustomerUser(updateCustomerUserDTO);
    }


}