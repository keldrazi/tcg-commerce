import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceModuleService } from './commerce.module.service';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO } from './dto/commerce.module.dto';



@Controller('commerce/module')
export class CommerceModuleController {

    constructor(
        private commerceModuleService: CommerceModuleService,
    ) { }
    
    @Get()
    async getCommerceModules() {
        return await this.commerceModuleService.getCommerceModules();
    }

    @Get('id/:commerceModuleId')
    async getCommerceModuleById(@Param('commerceModuleId') commerceModuleId: string) {
        return await this.commerceModuleService.getCommerceModuleById(commerceModuleId);
    }

    @Get('caid/:commerceAccountId')
    async getCommerceModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceModuleService.getCommerceModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceModule(@Body() createCommerceModuleDTO: CreateCommerceModuleDTO) {
        return this.commerceModuleService.createCommerceModule(createCommerceModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceModule(@Body() updateCommerceModuleDTO: UpdateCommerceModuleDTO) {
        return this.commerceModuleService.updateCommerceModule(updateCommerceModuleDTO);
    }

}