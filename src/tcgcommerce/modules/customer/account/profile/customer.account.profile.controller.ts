import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerAccountProfileService } from './customer.account.profile.service';
import { CreateCustomerAccountProfileDTO, UpdateCustomerAccountProfileDTO } from './dto/customer.account.profile.dto';



@Controller('customer/account/profile')
export class CustomerAccountProfileController {

    constructor(
        private customerAccountProfileService: CustomerAccountProfileService,
    ) { }
    
    @Get('/:customerAccountUserId')
    async getCustomerAccountProfile(@Param('customerAccountUserId') customerAccountUserId: string) {
        return await this.customerAccountProfileService.getCustomerAccountProfileById(customerAccountUserId);
    }

    @Get('/all/:commerceAccountId')
    async getCustomerAccountProfilesByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.customerAccountProfileService.getCustomerAccountProfilesByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerAccountProfile(@Body() createCustomerAccountProfileDTO: CreateCustomerAccountProfileDTO) {
        return this.customerAccountProfileService.createCustomerAccountProfile(createCustomerAccountProfileDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerAccountProfile(@Body() updateCustomerAccountProfileDTO: UpdateCustomerAccountProfileDTO) {
        return this.customerAccountProfileService.updateCustomerAccountProfile(updateCustomerAccountProfileDTO);
    }


}