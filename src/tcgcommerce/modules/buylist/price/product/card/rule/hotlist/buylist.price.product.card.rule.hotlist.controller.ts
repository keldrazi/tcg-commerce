import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleHotlistDTO, UpdateBuylistPriceProductCardRuleHotlistDTO } from './dto/buylist.price.product.card.rule.hotlist.dto';
import { BuylistPriceProductCardRuleHotlistService } from './buylist.price.product.card.rule.hotlist.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/price/product/card/rule/hotlist')
export class BuylistPriceProductCardRuleHotlistController {

    constructor(
        private buylistPriceProductCardRuleHotlistService: BuylistPriceProductCardRuleHotlistService,
    ) { }


    @Get('/id/:buylistPriceProductCardRuleHotlistId')
    async getBuylistPriceProductCardRuleHotlist(@Param('buylistPriceProductCardRuleHotlistId') buylistPriceProductCardRuleHotlistId: string) {
        try {
            return await this.buylistPriceProductCardRuleHotlistService.getBuylistPriceProductCardRuleHotlistById(buylistPriceProductCardRuleHotlistId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist price product card rule hotlist was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist price product card rule hotlist');
        }
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getBuylistPriceProductCardRuleHotlistByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        try {
            return await this.buylistPriceProductCardRuleHotlistService.getBuylistPriceProductCardRuleHotlistByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist price product card rule hotlist was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist price product card rule hotlist');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleHotlist(@Body() createBuylistPriceProductCardRuleHotlistDTO: CreateBuylistPriceProductCardRuleHotlistDTO) {
        try {
            return await this.buylistPriceProductCardRuleHotlistService.createBuylistPriceProductCardRuleHotlist(createBuylistPriceProductCardRuleHotlistDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist price product card rule hotlist');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleHotlist(@Body() updateBuylistPriceProductCardRuleHotlistDTO: UpdateBuylistPriceProductCardRuleHotlistDTO) {
        try {
            return await this.buylistPriceProductCardRuleHotlistService.updateBuylistPriceProductCardRuleHotlist(updateBuylistPriceProductCardRuleHotlistDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist price product card rule hotlist was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist price product card rule hotlist');
        }
    }

}