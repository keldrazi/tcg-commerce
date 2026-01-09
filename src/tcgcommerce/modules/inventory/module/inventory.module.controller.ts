import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryModuleService } from './inventory.module.service';
import { CreateInventoryModuleDTO, UpdateInventoryModuleDTO } from './dto/inventory.module.dto';



@Controller('inventory/module')
export class InventoryModuleController {

    constructor(
        private inventoryModuleService: InventoryModuleService,
    ) { }
    
    @Get()
    async getInventoryModules() {
        return await this.inventoryModuleService.getInventoryModules();
    }

    @Get('/id/:inventoryModuleId')
    async getInventoryModuleById(@Param('inventoryModuleId') inventoryModuleId: string) {
        return await this.inventoryModuleService.getInventoryModuleById(inventoryModuleId);
    }

    @Get('/caid/:commerceAccountId')
    async getInventoryModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.inventoryModuleService.getInventoryModuleByCommerceAccountId(commerceAccountId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createInventoryModule(@Body() createInventoryModuleDTO: CreateInventoryModuleDTO) {
        return this.inventoryModuleService.createInventoryModule(createInventoryModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateInventoryModule(@Body() updateInventoryModuleDTO: UpdateInventoryModuleDTO) {
        return this.inventoryModuleService.updateInventoryModule(updateInventoryModuleDTO);
    }

}