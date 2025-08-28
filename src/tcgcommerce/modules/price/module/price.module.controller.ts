import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PriceModuleService } from './price.module.service';
import { CreatePriceModuleDTO, UpdatePriceModuleDTO } from './dto/price.module.dto';



@Controller('price/module')
export class PriceModuleController {

    constructor(
        private priceModuleService: PriceModuleService,
    ) { }
    
    @Get('/all')
    async getPriceModules() {
        return await this.priceModuleService.getPriceModules();
    }

    @Get('/:moduleId')
    async getPriceModule(@Param('priceModuleId') applicatioModuleId: string) {
        return await this.priceModuleService.getPriceModule(applicatioModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getPriceModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.priceModuleService.getPriceModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPriceModule(@Body() createPriceModuleDTO: CreatePriceModuleDTO) {
        return this.priceModuleService.createPriceModule(createPriceModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePriceModule(@Body() updatePriceModuleDTO: UpdatePriceModuleDTO) {
        return this.priceModuleService.updatePriceModule(updatePriceModuleDTO);
    }

}