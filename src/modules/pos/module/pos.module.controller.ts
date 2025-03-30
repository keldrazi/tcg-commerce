import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { POSModuleService } from './pos.module.service';
import { CreatePOSModuleDTO, UpdatePOSModuleDTO } from './dto/pos.module.dto';



@Controller('pos/module')
export class POSModuleController {

    constructor(
        private posModuleService: POSModuleService,
    ) { }
    
    @Get('/all')
    async getPOSModules() {
        return await this.posModuleService.getPOSModules();
    }

    @Get('/:posModuleId')
    async getPOSModule(@Param('posModuleId') posModuleId: string) {
        return await this.posModuleService.getPOSModule(posModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getPOSModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.posModuleService.getPOSModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPOSModule(@Body() createPOSModuleDTO: CreatePOSModuleDTO) {
        return this.posModuleService.createPOSModule(createPOSModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePOSModule(@Body() updatePOSModuleDTO: UpdatePOSModuleDTO) {
        return this.posModuleService.updatePOSModule(updatePOSModuleDTO);
    }

}