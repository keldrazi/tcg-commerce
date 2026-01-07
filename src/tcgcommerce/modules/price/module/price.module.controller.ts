import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PriceModuleService } from './price.module.service';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO } from './dto/price.module.dto';



@Controller('price/module')
export class PriceModuleController {

    constructor(
        private priceModuleService: PriceModuleService,
    ) { }
    
    @Get()
    async getPriceModules() {
        return await this.priceModuleService.getPriceModules();
    }

    @Get('id/:priceModuleId')
    async getPriceModuleById(@Param('priceModuleId') priceModuleId: string) {
        return await this.priceModuleService.getPriceModuleById(priceModuleId);
    }

    @Get('/caid/:commerceAccountId')
    async getPriceModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.priceModuleService.getPriceModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPriceModule(@Body() createPriceModuleDTO: CreatePriceModuleDTO) {
        return this.priceModuleService.createPriceModule(createPriceModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePriceModule(@Body() updatePriceModuleDTO: UpdatePriceModuleDTO) {
        return this.priceModuleService.updatePriceModule(updatePriceModuleDTO);
    }

}