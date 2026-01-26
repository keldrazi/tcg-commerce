import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateInventoryProductCardServiceImportJobProviderTypeDTO, UpdateInventoryProductCardServiceImportJobProviderTypeDTO, InventoryProductCardServiceImportJobProviderTypeDTO } from './dto/inventory.product.card.service.import.job.provider.type.dto';
import { InventoryProductCardServiceImportJobProviderTypeService } from './inventory.product.card.service.import.job.provider.type.service';



@Controller('inventory/product/card/service/import/job/provider/type')
export class InventoryProductCardServiceImportJobProviderTypeController {

    constructor(
        private inventoryProductCardServiceImportJobProviderTypeService: InventoryProductCardServiceImportJobProviderTypeService,
    ) { }
    

    @Get('/id/:inventoryProductCardServiceImportJobProviderTypeId')
    async getInventoryProductCardServiceImportJobProviderType(@Param('inventoryProductCardServiceImportJobProviderTypeId') inventoryProductCardServiceImportJobProviderTypeId: string) {
        try {
            return await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypeById(inventoryProductCardServiceImportJobProviderTypeId);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to get inventory product card service import job provider type');
        }
    }

    @Get()
    async getInventoryProductCardServiceImportJobProviderTypes() {
        try {
            return await this.inventoryProductCardServiceImportJobProviderTypeService.getInventoryProductCardServiceImportJobProviderTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get inventory product card service import job provider types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createInventoryProductCardServiceImportJobProviderType(@Body() createInventoryProductCardServiceImportJobProviderTypeDTO: CreateInventoryProductCardServiceImportJobProviderTypeDTO) {
        try {
            return await this.inventoryProductCardServiceImportJobProviderTypeService.createInventoryProductCardServiceImportJobProviderType(createInventoryProductCardServiceImportJobProviderTypeDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create inventory product card service import job provider type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateInventoryProductCardServiceImportJobProviderType(@Body() updateInventoryProductCardServiceImportJobProviderTypeDTO: UpdateInventoryProductCardServiceImportJobProviderTypeDTO) {
        try {
            return await this.inventoryProductCardServiceImportJobProviderTypeService.updateInventoryProductCardServiceImportJobProviderType(updateInventoryProductCardServiceImportJobProviderTypeDTO);
        } catch (e) {
            if (e instanceof NotFoundException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to update inventory product card service import job provider type');
        }
    }

} 