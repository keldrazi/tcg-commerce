import { Controller, Get, Post, Body, Put, Param, InternalServerErrorException } from '@nestjs/common';
import { InventoryProductCardService } from './inventory.product.card.service';



@Controller('inventory/product/card')
export class InventoryProductCardController {

    constructor(
        private inventoryProductCardService: InventoryProductCardService,
    ) { }
    
    
    @Get('/caid/:commerceAccountId')
    async getInventoryProductCardsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.inventoryProductCardService.getInventoryProductCardsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product cards');
        }
    }

    @Get('/caid/:commerceAccountId/clid/:commerceLocationId')
    async getInventoryProductCardsByCommerceAccountIdAndCommerceLocationId(@Param('commerceAccountId') commerceAccountId: string, @Param('commerceLocationId') commerceLocationId: string) {
        try {
            return await this.inventoryProductCardService.getInventoryProductCardsByCommerceAccountIdAndCommerceLocationId(commerceAccountId, commerceLocationId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product cards');
        }
    }

    @Get('/caid/:commerceAccountId/clid/:commerceLocationId/psid/:productSetId/plid/:productLanguageId')
    async getInventoryProductCardsByProductSetId(@Param('commerceAccountId') commerceAccountId: string, @Param('commerceLocationId') commerceLocationId: string, @Param('productSetId') productSetId: string, @Param('productLanguageId') productLanguageId: string) {
        try {
            return await this.inventoryProductCardService.getInventoryProductCardsByProductSetId(commerceAccountId, commerceLocationId, productSetId, productLanguageId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product cards');
        }
    }

}