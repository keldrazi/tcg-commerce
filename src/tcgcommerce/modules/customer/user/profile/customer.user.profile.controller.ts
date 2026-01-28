import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CustomerUserProfileService } from './customer.user.profile.service';
import { CreateCustomerUserProfileDTO, UpdateCustomerUserProfileDTO } from './dto/customer.user.profile.dto';
import { EntityNotFoundError } from 'typeorm';


@Controller('customer/user/profile')
export class CustomerUserProfileController {

    constructor(
        private customerUserProfileService: CustomerUserProfileService,
    ) { }
    
    @Get('id/:customerUserId')
    async getCustomerUserProfile(@Param('customerUserId') customerUserId: string) {
        try {
            return await this.customerUserProfileService.getCustomerUserProfileById(customerUserId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user profile was not found for customerUserId: ' + customerUserId);
            }
            throw new InternalServerErrorException('An error occurred while getting the customer user profile');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCustomerUserProfilesByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.customerUserProfileService.getCustomerUserProfilesByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user profiles not found for commerceAccountId: ' + commerceAccountId);
            }
            throw new InternalServerErrorException('An error occurred while getting customer user profiles');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCustomerUserProfile(@Body() createCustomerUserProfileDTO: CreateCustomerUserProfileDTO) {
        try {
            return await this.customerUserProfileService.createCustomerUserProfile(createCustomerUserProfileDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('An error occurred while creating the customer user profile');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCustomerUserProfile(@Body() updateCustomerUserProfileDTO: UpdateCustomerUserProfileDTO) {
        try {
            return await this.customerUserProfileService.updateCustomerUserProfile(updateCustomerUserProfileDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Customer user profile not found for customerUserProfileId: ' + updateCustomerUserProfileDTO.customerUserProfileId);
            }
            throw new InternalServerErrorException('An error occurred while updating the customer user profile');
        }
    }
}