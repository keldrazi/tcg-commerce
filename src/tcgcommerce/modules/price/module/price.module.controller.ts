import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PriceModuleService } from './price.module.service';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO } from './dto/price.module.dto';

@Controller('price/module')
export class PriceModuleController {

    constructor(
        private priceModuleService: PriceModuleService,
    ) { }
    
    @Get()
    async getPriceModules() {
        try {
            return await this.priceModuleService.getPriceModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get price modules');
        }
    }

    @Get('id/:priceModuleId')
    async getPriceModuleById(@Param('priceModuleId') priceModuleId: string) {
        try {
            return await this.priceModuleService.getPriceModuleById(priceModuleId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get price module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getPriceModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.priceModuleService.getPriceModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get price module by commerce account');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPriceModule(@Body() createPriceModuleDTO: CreatePriceModuleDTO) {
        try {
            return await this.priceModuleService.createPriceModule(createPriceModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create price module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePriceModule(@Body() updatePriceModuleDTO: UpdatePriceModuleDTO) {
        try {
            return await this.priceModuleService.updatePriceModule(updatePriceModuleDTO);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to update price module');
        }
    }

}