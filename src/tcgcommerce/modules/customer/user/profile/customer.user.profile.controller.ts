import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerUserProfileService } from './customer.user.profile.service';
import { CreateCustomerUserProfileDTO, UpdateCustomerUserProfileDTO } from './dto/customer.user.profile.dto';


@Controller('customer/user/profile')
export class CustomerUserProfileController {

    constructor(
        private customerUserProfileService: CustomerUserProfileService,
    ) { }
    
    @Get('id/:customerUserId')
    async getCustomerUserProfile(@Param('customerUserId') customerUserId: string) {
        return await this.customerUserProfileService.getCustomerUserProfileById(customerUserId);
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerUserProfilesByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.customerUserProfileService.getCustomerUserProfilesByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerUserProfile(@Body() createCustomerUserProfileDTO: CreateCustomerUserProfileDTO) {
        return this.customerUserProfileService.createCustomerUserProfile(createCustomerUserProfileDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerUserProfile(@Body() updateCustomerUserProfileDTO: UpdateCustomerUserProfileDTO) {
        return this.customerUserProfileService.updateCustomerUserProfile(updateCustomerUserProfileDTO);
    }


}