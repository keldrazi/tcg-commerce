import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceShopifyService } from './commerce.account.settings.pos.vendor.service.shopify.service';
import { CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO, UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO } from './dto/commerce.account.settings.pos.vendor.service.shopify.dto';

@Controller('commerce/account/settings/pos/vendor/service/manapool')
export class CommerceAccountSettingsPOSVendorServiceShopifyController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceShopifyService: CommerceAccountSettingsPOSVendorServiceShopifyService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceShopifyService.getCommerceAccountSettingsPOSVendorServiceShopifyByCommerceAccountId(commerceAccountId);
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceShopifyId')
    async getCommerceAccountSettingsPOSVendorServiceShopify(@Param('commerceAccountSettingsPOSVendorServiceShopifyId') commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceShopifyService.getCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId);
    }

    @Get('/verify/:commerceAccountSettingsPOSVendorServiceShopifyId')
    async verifyCommerceAccountSettingsPOSVendorServiceShopifyById(@Param('commerceAccountSettingsPOSVendorServiceShopifyId') commerceAccountSettingsPOSVendorServiceShopifyId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceShopifyService.verifyCommerceAccountSettingsPOSVendorServiceShopifyById(commerceAccountSettingsPOSVendorServiceShopifyId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountSettingsPOSVendorServiceShopify(@Body() createCommerceAccountSettingsPOSVendorServiceShopifyDTO: CreateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        return this.commerceAccountSettingsPOSVendorServiceShopifyService.createCommerceAccountSettingsPOSVendorServiceShopify(createCommerceAccountSettingsPOSVendorServiceShopifyDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountSettingsPOSVendorServiceShopify(@Body() updateCommerceAccountSettingsPOSVendorServiceShopifyDTO: UpdateCommerceAccountSettingsPOSVendorServiceShopifyDTO) {
        return this.commerceAccountSettingsPOSVendorServiceShopifyService.updateCommerceAccountSettingsPOSVendorServiceShopify(updateCommerceAccountSettingsPOSVendorServiceShopifyDTO);
    }
}