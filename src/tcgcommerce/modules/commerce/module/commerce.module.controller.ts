import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceModuleService } from './commerce.module.service';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO } from './dto/commerce.module.dto';



@Controller('commerce/module')
export class CommerceModuleController {

    constructor(
        private commerceModuleService: CommerceModuleService,
    ) { }
    
    @Get('/all')
    async getCommerceModules() {
        return await this.commerceModuleService.getCommerceModules();
    }

    @Get('/:commerceModuleId')
    async getCommerceModule(@Param('commerceModuleId') commerceModuleId: string) {
        return await this.commerceModuleService.getCommerceModule(commerceModuleId);
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