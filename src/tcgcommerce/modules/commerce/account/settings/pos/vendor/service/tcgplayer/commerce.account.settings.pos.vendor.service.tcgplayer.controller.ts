import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerService } from './commerce.account.settings.pos.vendor.service.tcgplayer.service';
import { CommerceAccountSettingsPOSVendorServiceTCGPlayerDTO } from './dto/commerce.account.settings.pos.vendor.service.tcgplayer.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/account/settings/pos/vendor/service/tcgplayer')
export class CommerceAccountSettingsPOSVendorServiceTCGPlayerController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceTCGPlayerService: CommerceAccountSettingsPOSVendorServiceTCGPlayerService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service TCGPlayer not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service TCGPlayer');
        }
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceTCGPlayerId')
    async getCommerceAccountSettingsPOSVendorServiceTCGPlayer(@Param('commerceAccountSettingsPOSVendorServiceTCGPlayerId') commerceAccountSettingsPOSVendorServiceTCGPlayerId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceTCGPlayerService.getCommerceAccountSettingsPOSVendorServiceTCGPlayerById(commerceAccountSettingsPOSVendorServiceTCGPlayerId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service TCGPlayer not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service TCGPlayer');
        }
    }
}