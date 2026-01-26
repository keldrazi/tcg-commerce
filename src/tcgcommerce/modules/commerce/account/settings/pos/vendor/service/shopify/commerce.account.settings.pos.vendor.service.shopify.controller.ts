import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from './commerce.account.settings.pos.vendor.service.shopify.service';
import { CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO, UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO } from './dto/commerce.account.settings.pos.vendor.service.shopify.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/account/settings/pos/vendor/service/shopify')
export class CommerceAccountSettingsPOSVendorServiceShopifyController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceShopifyService: CommerceAccountSettingsPOSVendorServiceShopifyService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceShopifyService.getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service Shopify not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service Shopify');
        }
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceShopifyId')
    async getCommerceAccountSettingsPOSVendorServiceShopify(@Param('commerceAccountSettingsPOSVendorServiceShopifyId') commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceShopifyService.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service Shopify not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service Shopify');
        }
    }

    @Get('/verify/:commerceAccountSettingsPOSVendorServiceShopifyId')
    async verifyCommerceAccountSettingsPOSVendorServiceShopifyById(@Param('commerceAccountSettingsPOSVendorServiceShopifyId') commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceShopifyService.verifyCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service Shopify not found');
            }
            throw new InternalServerErrorException('Failed to verify commerce account settings POS vendor service Shopify');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountSettingsPOSVendorServiceShopify(@Body() createCommerceAccountSettingsPOSVendorServiceShopifyDTO: CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceShopifyService.createCommerceAccountSettingsPOSVendorServiceShopify(createCommerceAccountSettingsPOSVendorServiceShopifyDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create commerce account settings POS vendor service Shopify');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountSettingsPOSVendorServiceShopify(@Body() updateCommerceAccountSettingsPOSVendorServiceShopifyDTO: UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceShopifyService.updateCommerceAccountSettingsPOSVendorServiceShopify(updateCommerceAccountSettingsPOSVendorServiceShopifyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service Shopify not found');
            }
            throw new InternalServerErrorException('Failed to update commerce account settings POS vendor service Shopify');
        }
    }
}