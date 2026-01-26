import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CommerceAccountSettingsPOSVendorServiceManaPoolService } from './commerce.account.settings.pos.vendor.service.manapool.service';
import { CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO, UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO } from './dto/commerce.account.settings.pos.vendor.service.manapool.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/account/settings/pos/vendor/service/manapool')
export class CommerceAccountSettingsPOSVendorServiceManaPoolController {

    constructor(
        private commerceAccountSettingsPOSVendorServiceManaPoolService: CommerceAccountSettingsPOSVendorServiceManaPoolService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service ManaPool not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service ManaPool');
        }
    }

    @Get('/id/:commerceAccountSettingsPOSVendorServiceManaPoolId')
    async getCommerceAccountSettingsPOSVendorServiceManaPool(@Param('commerceAccountSettingsPOSVendorServiceManaPoolId') commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.getCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service ManaPool not found');
            }
            throw new InternalServerErrorException('Failed to get commerce account settings POS vendor service ManaPool');
        }
    }

    @Get('/verify/:commerceAccountSettingsPOSVendorServiceManaPoolId')
    async verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(@Param('commerceAccountSettingsPOSVendorServiceManaPoolId') commerceAccountSettingsPOSVendorServiceManaPoolId: string) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.verifyCommerceAccountSettingsPOSVendorServiceManaPoolById(commerceAccountSettingsPOSVendorServiceManaPoolId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service ManaPool not found');
            }
            throw new InternalServerErrorException('Failed to verify commerce account settings POS vendor service ManaPool');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceAccountSettingsPOSVendorServiceManaPool(@Body() createCommerceAccountSettingsPOSVendorServiceManaPoolDTO: CreateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.createCommerceAccountSettingsPOSVendorServiceManaPool(createCommerceAccountSettingsPOSVendorServiceManaPoolDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create commerce account settings POS vendor service ManaPool');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceAccountSettingsPOSVendorServiceManaPool(@Body() updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO: UpdateCommerceAccountSettingsPOSVendorServiceManaPoolDTO) {
        try {
            return await this.commerceAccountSettingsPOSVendorServiceManaPoolService.updateCommerceAccountSettingsPOSVendorServiceManaPool(updateCommerceAccountSettingsPOSVendorServiceManaPoolDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce account settings POS vendor service ManaPool not found');
            }
            throw new InternalServerErrorException('Failed to update commerce account settings POS vendor service ManaPool');
        }
    }
}