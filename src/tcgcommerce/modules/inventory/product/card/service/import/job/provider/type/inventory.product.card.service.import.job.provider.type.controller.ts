import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateInventoryProductCardServiceImportJobProviderTypeDTO, UpdateInventoryProductCardServiceImportJobProviderTypeDTO, InventoryProductCardServiceImportJobProviderTypeDTO } from './dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderTypeService } from './inventory.product.card.service.import.job.provider.type.service';



@Controller('inventory/product/card/service/import/job/provider/type')
export class InventoryProductCardServiceImportJobProviderTypeController {

    constructor(
        private inventoryProductCardServiceImportJobProviderTypeService: InventoryProductCardServiceImportJobProviderTypeService,
    ) { }
    

    @Get('/id/:inventoryProductCardServiceImportJobProviderTypeId')
    async getInventoryProductCardServiceImportJobProviderType(@Param('inventoryProductCardServiceImportJobProviderTypeId') inventoryProductCardServiceImportJobProviderTypeId: string) {
        return await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderTypeId);
    }

    @Get('/all')
    async getInventoryProductCardServiceImportJobProviderTypes() {
        return await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createInventoryProductCardServiceImportJobProviderType(@Body() createInventoryProductCardServiceImportJobProviderTypeDTO: CreateInventoryProductCardServiceImportJobProviderTypeDTO) {
        return await this.inventoryProductCardServiceImportJobProviderTypeService.createInventoryProductCardServiceImportJobProviderType(createInventoryProductCardServiceImportJobProviderTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateInventoryProductCardServiceImportJobProviderType(@Body() updateInventoryProductCardServiceImportJobProviderTypeDTO: UpdateInventoryProductCardServiceImportJobProviderTypeDTO) {
        return await this.inventoryProductCardServiceImportJobProviderTypeService.updateInventoryProductCardServiceImportJobProviderType(updateInventoryProductCardServiceImportJobProviderTypeDTO);
    }

} 