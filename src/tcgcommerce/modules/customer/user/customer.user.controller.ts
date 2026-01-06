import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerAccountUserService } from './customer.account.user.service';
import { CreateCustomerAccountUserDTO, UpdateCustomerAccountUserDTO } from './dto/customer.user.dto';



@Controller('customer/account/user')
export class CustomerAccountUserController {

    constructor(
        private customerAccountUserService: CustomerAccountUserService,
    ) { }
    
    @Get('/:customerAccountUserId')
    async getCustomerAccountUser(@Param('customerAccountUserId') customerAccountUserId: string) {
        return await this.customerAccountUserService.getCustomerAccountUserById(customerAccountUserId);
    }

    @Get('/all/:commerceAccountId')
    async getCustomerAccountUsersByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.customerAccountUserService.getCustomerAccountUsersByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerAccountUser(@Body() createCustomerAccountUserDTO: CreateCustomerAccountUserDTO) {
        return this.customerAccountUserService.createCustomerAccountUser(createCustomerAccountUserDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerAccountUser(@Body() updateCustomerAccountUserDTO: UpdateCustomerAccountUserDTO) {
        return this.customerAccountUserService.updateCustomerAccountUser(updateCustomerAccountUserDTO);
    }


}