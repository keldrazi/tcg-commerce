import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from './commerce.account.settings.pos.vendor.service.manapool.service';
import { CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO, UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO } from './dto/commerce.account.settings.pos.vendor.service.manapool.dto';

@Controller('commerce/account/settings/pos/vendor/service/manapool')
export class CommerceAccountSettingsPOSVendorServiceManaPoolController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceManaPoolId')
    async getCommerceAccountSettingsPOSVendorServiceManaPool(@Param('commerceAccountSettingsPOSVendorServiceManaPoolId') commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId);
    }

    @Get('/verify/:commerceAccountSettingsPOSVendorServiceManaPoolId')
    async verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(@Param('commerceAccountSettingsPOSVendorServiceManaPoolId') commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountSettingsPOSVendorServiceManaPool(@Body() createCommerceAccountSettingsPOSVendorServiceManaPoolDTO: CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        return this.commerceAccountSettingsPOSVendorServiceManaPoolService.createCommerceAccountSettingsPOSVendorServiceManaPool(createCommerceAccountSettingsPOSVendorServiceManaPoolDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountSettingsPOSVendorServiceManaPool(@Body() updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO: UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        return this.commerceAccountSettingsPOSVendorServiceManaPoolService.updateCommerceAccountSettingsPOSVendorServiceManaPool(updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO);
    }
}