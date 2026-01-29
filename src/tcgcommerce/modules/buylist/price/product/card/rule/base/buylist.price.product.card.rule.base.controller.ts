import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistPriceProductCardRuleBaseDTO, UpdateBuylistPriceProductCardRuleBaseDTO } from './dto/buylist.price.product.card.rule.base.dto';
import { BuylistPriceProductCardRuleBaseService } from './buylist.price.product.card.rule.base.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/price/product/card/rule/base')
export class BuylistPriceProductCardRuleBaseController {

    constructor(
        private buylistPriceProductCardRuleBaseService: BuylistPriceProductCardRuleBaseService,
    ) { }


    @Get('/id/:buylistPriceProductCardRuleBaseId')
    async getBuylistPriceProductCardRuleBase(@Param('buylistPriceProductCardRuleBaseId') buylistPriceProductCardRuleBaseId: string) {
        try {
            return await this.buylistPriceProductCardRuleBaseService.getBuylistPriceProductCardRuleBaseById(buylistPriceProductCardRuleBaseId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Price Product Card Rule Base not found');
            }
            throw new InternalServerErrorException('Failed to get buylist price product card rule base');
        }
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getBuylistPriceProductCardRuleBaseByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        try {
            return await this.buylistPriceProductCardRuleBaseService.getBuylistPriceProductCardRuleBaseByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Price Product Card Rule Base not found');
            }
            throw new InternalServerErrorException('Failed to get buylist price product card rule base');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPriceProductCardRuleBase(@Body() createBuylistPriceProductCardRuleBaseDTO: CreateBuylistPriceProductCardRuleBaseDTO) {
        try {
            return await this.buylistPriceProductCardRuleBaseService.createBuylistPriceProductCardRuleBase(createBuylistPriceProductCardRuleBaseDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist price product card rule base');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPriceProductCardRuleBase(@Body() updateBuylistPriceProductCardRuleBaseDTO: UpdateBuylistPriceProductCardRuleBaseDTO) {
        try {
        return await this.buylistPriceProductCardRuleBaseService.updateBuylistPriceProductCardRuleBase(updateBuylistPriceProductCardRuleBaseDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist Price Product Card Rule Base not found');
            }
            throw new InternalServerErrorException('Failed to update buylist price product card rule base');
        }
    }
}