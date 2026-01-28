import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreatePriceRuleProductCardBaseDTO, UpdatePriceRuleProductCardBaseDTO, PriceRuleProductCardBaseDTO } from './dto/price.rule.product.card.base.dto';
import { PriceRuleProductCardBaseService } from './price.rule.product.card.base.service';
import { Entity, EntityNotFoundError } from 'typeorm';
import { InternalServerError } from '@aws-sdk/client-textract';



@Controller('price/rule/product/card/base')
export class PriceRuleProductCardBaseController {

    constructor(
        private priceRuleProductCardBaseService: PriceRuleProductCardBaseService,
    ) { }


    @Get('/id/:priceRuleProductCardBaseId')
    async getPriceRuleProductCardBaseById(@Param('priceRuleProductCardBaseId') priceRuleProductCardBaseId: string) {
        try {
            return await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseById(priceRuleProductCardBaseId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card base was not found');
            }
            throw new InternalServerErrorException('Failed to get price rule product card base');
        }
    }

    @Get('/caid/:commerceAccountId/pvid/:productVendorId/plid/:productLineId/ptid/:productTypeId')
    async getPriceRuleProductCardBaseByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string, @Param('productVendorId') productVendorId: string, @Param('productLineId') productLineId: string, @Param('productTypeId') productTypeId: string) {
        try {
            return await this.priceRuleProductCardBaseService.getPriceRuleProductCardBaseByCommerceAccountId(commerceAccountId, productVendorId, productLineId, productTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card base was not found');
            }
            throw new InternalServerErrorException('Failed to get price rule product card base');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPriceRuleProductCardBase(@Body() createPriceRuleProductCardBaseDTO: CreatePriceRuleProductCardBaseDTO) {
        try {
            return await this.priceRuleProductCardBaseService.createPriceRuleProductCardBase(createPriceRuleProductCardBaseDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create price rule product card base');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePriceRuleProductCardBase(@Body() updatePriceRuleProductCardBaseDTO: UpdatePriceRuleProductCardBaseDTO) {
        try {
            return await this.priceRuleProductCardBaseService.updatePriceRuleProductCardBase(updatePriceRuleProductCardBaseDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Price rule product card base was not found');
            }
            throw new InternalServerErrorException('Failed to update price rule product card base');
        }
    }

}