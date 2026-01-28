import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreatePriceRuleProductCardUpdateDailyDTO, UpdatePriceRuleProductCardUpdateDailyDTO, PriceRuleProductCardUpdateDailyDTO } from './dto/price.rule.product.card.update.daily.dto';
import { PriceRuleProductCardUpdateDailyService } from './price.rule.product.card.update.daily.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('price/rule/product/card/update/daily')
export class PriceRuleProductCardUpdateDailyController {

    constructor(
        private priceRuleProductCardUpdateDailyService: PriceRuleProductCardUpdateDailyService,
    ) { }


    @Get('/id/:priceRuleProductCardUpdateDailyId')
    async getPriceRuleProductCardUpdateDailyById(@Param('priceRuleProductCardUpdateDailyId') priceRuleProductCardUpdateDailyId: string) {
        try {
            return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyById(priceRuleProductCardUpdateDailyId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card update daily was not found');
            }
            throw new InternalServerErrorException('Failed to get price rule product card update daily');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getPriceRuleProductCardUpdateDailyByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get price rule product card update daily');
        }
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        try {
            return await this.priceRuleProductCardUpdateDailyService.getPriceRuleProductCardUpdateDailyByCommerceAccountIdAndVendorId(commerceAccountId, productVendorId, productLineId, productTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card update daily was not found');
            }
            throw new InternalServerErrorException('Failed to get price rule product card update daily');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPriceRuleProductCardUpdateDaily(@Body() createPriceRuleProductCardUpdateDailyDTO: CreatePriceRuleProductCardUpdateDailyDTO) {
        try {
            return await this.priceRuleProductCardUpdateDailyService.createPriceRuleProductCardUpdateDaily(createPriceRuleProductCardUpdateDailyDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create price rule product card update daily');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePriceRuleProductCardUpdateDaily(@Body() updatePriceRuleProductCardUpdateDailyDTO: UpdatePriceRuleProductCardUpdateDailyDTO) {
        try {
            return await this.priceRuleProductCardUpdateDailyService.updatePriceRuleProductCardUpdateDaily(updatePriceRuleProductCardUpdateDailyDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card update daily was not found');
            }
            throw new InternalServerErrorException('Failed to update price rule product card update daily');
        }
    }

}