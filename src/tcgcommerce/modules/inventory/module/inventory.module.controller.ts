import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InventoryModuleService } from './inventory.module.service';
import { CreateInventoryModuleDTO, UpdateInventoryModuleDTO } from './dto/inventory.module.dto';
import { EntityNotFoundError } from 'typeorm';



@Controller('inventory/module')
export class InventoryModuleController {

    constructor(
        private inventoryModuleService: InventoryModuleService,
    ) { }
    
    @Get()
    async getInventoryModules() {
        try {
            return await this.inventoryModuleService.getInventoryModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory modules');
        }
    }

    @Get('/id/:inventoryModuleId')
    async getInventoryModuleById(@Param('inventoryModuleId') inventoryModuleId: string) {
        try {
            return await this.inventoryModuleService.getInventoryModuleById(inventoryModuleId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory module not found');
            }
            throw new InternalServerErrorException('Failed to get inventory module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getInventoryModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.inventoryModuleService.getInventoryModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory module not found');
            }
            throw new InternalServerErrorException('Failed to get inventory module');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createInventoryModule(@Body() createInventoryModuleDTO: CreateInventoryModuleDTO) {
        try {
            return await this.inventoryModuleService.createInventoryModule(createInventoryModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create inventory module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateInventoryModule(@Body() updateInventoryModuleDTO: UpdateInventoryModuleDTO) {
        try {
            return await this.inventoryModuleService.updateInventoryModule(updateInventoryModuleDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Inventory module not found');
            }
            throw new InternalServerErrorException('Failed to update inventory module');
        }
    }

}