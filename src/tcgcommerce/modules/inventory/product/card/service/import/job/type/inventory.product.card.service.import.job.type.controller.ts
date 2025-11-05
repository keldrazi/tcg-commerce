import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateInventoryProductCardServiceImportJobTypeDTO, UpdateInventoryProductCardServiceImportJobTypeDTO, InventoryProductCardServiceImportJobTypeDTO } from './dto/inventory.product.card.service.import.job.type.dto';
import { InventoryProductCardServiceImportJobTypeService } from './inventory.product.card.service.import.job.type.service';



@Controller('inventory/product/card/service/import/job/type')
export class InventoryProductCardServiceImportJobTypeController {

    constructor(
        private inventoryProductCardServiceImportJobTypeService: InventoryProductCardServiceImportJobTypeService,
    ) { }
    

    @Get('/id/:inventoryProductCardServiceImportJobTypeId')
    async getInventoryProductCardServiceImportJobType(@Param('inventoryProductCardServiceImportJobTypeId') inventoryProductCardServiceImportJobTypeId: string) {
        return await this.inventoryProductCardServiceImportJobTypeService.getInventoryProductCardServiceImportJobTypeById(inventoryProductCardServiceImportJobTypeId);
    }

    @Get('/all')
    async getInventoryProductCardServiceImportJobTypes() {
        return await this.inventoryProductCardServiceImportJobTypeService.getInventoryProductCardServiceImportJobTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createInventoryProductCardServiceImportJobType(@Body() createInventoryProductCardServiceImportJobTypeDTO: CreateInventoryProductCardServiceImportJobTypeDTO) {
        return await this.inventoryProductCardServiceImportJobTypeService.createInventoryProductCardServiceImportJobType(createInventoryProductCardServiceImportJobTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateInventoryProductCardServiceImportJobType(@Body() updateInventoryProductCardServiceImportJobTypeDTO: UpdateInventoryProductCardServiceImportJobTypeDTO) {
        return await this.inventoryProductCardServiceImportJobTypeService.updateInventoryProductCardServiceImportJobType(updateInventoryProductCardServiceImportJobTypeDTO);
    }

} 