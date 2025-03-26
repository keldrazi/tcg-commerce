import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceModuleService } from './commerce.module.service';
import { CreateCommerceModuleDTO } from './dto/commerce.module.dto';



@Controller('commerce/module')
export class CommerceModuleController {

    constructor(
        private commerceModuleService: CommerceModuleService,
    ) { }
    
    @Get('/all')
    async getCommerceModules() {
        return await this.commerceModuleService.getCommerceModules();
    }

    @Get('/:moduleId')
    async getCommerceModule(@Param('commerceModuleId') applicatioModuleId: string) {
        return await this.commerceModuleService.getCommerceModule(applicatioModuleId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceModule(@Body() createCommerceModuleDTO: CreateCommerceModuleDTO) {
        return this.commerceModuleService.createCommerceModule(createCommerceModuleDTO);
    }

}