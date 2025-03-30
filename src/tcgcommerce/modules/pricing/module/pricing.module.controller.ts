import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PricingModuleService } from './pricing.module.service';
import { CreatePricingModuleDTO, UpdatePricingModuleDTO } from './dto/pricing.module.dto';



@Controller('pricing/module')
export class PricingModuleController {

    constructor(
        private pricingModuleService: PricingModuleService,
    ) { }
    
    @Get('/all')
    async getPricingModules() {
        return await this.pricingModuleService.getPricingModules();
    }

    @Get('/:moduleId')
    async getPricingModule(@Param('pricingModuleId') applicatioModuleId: string) {
        return await this.pricingModuleService.getPricingModule(applicatioModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getPricingModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.pricingModuleService.getPricingModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPricingModule(@Body() createPricingModuleDTO: CreatePricingModuleDTO) {
        return this.pricingModuleService.createPricingModule(createPricingModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePricingModule(@Body() updatePricingModuleDTO: UpdatePricingModuleDTO) {
        return this.pricingModuleService.updatePricingModule(updatePricingModuleDTO);
    }

}