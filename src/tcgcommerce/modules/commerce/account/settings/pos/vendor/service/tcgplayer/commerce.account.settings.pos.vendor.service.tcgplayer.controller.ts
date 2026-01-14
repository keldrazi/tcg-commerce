import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from './commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { CreateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO, UpdateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from './dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';

@Controller('commerce/account/settings/pos/vendor/service/manapool')
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceTCGPlayerId')
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayer(@Param('commerceAccountSettingsPOSVendorServiceTCGPlayerId') commerceAccountSettingsPOSVendorServiceTCGPlayerId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayerId);
    }

    @Get('/verify/:commerceAccountSettingsPOSVendorServiceTCGPlayerId')
    async verifyCommerceAccountSettingsPOSVendorServiceTCGPlayerById(@Param('commerceAccountSettingsPOSVendorServiceTCGPlayerId') commerceAccountSettingsPOSVendorServiceTCGPlayerId: string) {
        return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.verifyCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayerId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountSettingsPOSVendorServiceTCGPlayer(@Body() createCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO: CreateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO) {
        return this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.createCommerceAccountSettingsPOSVendorServiceTCGPlayer(createCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountSettingsPOSVendorServiceTCGPlayer(@Body() updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO: UpdateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO) {
        return this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.updateCommerceAccountSettingsPOSVendorServiceTCGPlayer(updateCommerceAccountSettingsPOSVendorServiceTCGPlayerDTO);
    }
}