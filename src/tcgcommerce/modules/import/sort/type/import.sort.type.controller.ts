import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateImportSortTypeDTO, UpdateImportSortTypeDTO, ImportSortTypeDTO } from './dto/import.sort.type.dto';
import { ImportSortTypeService } from './import.sort.type.service';



@Controller('import/sort/type')
export class ImportSortTypeController {

    constructor(
        private importSortTypeService: ImportSortTypeService,
    ) { }
    
    
    @Get('/id/:importSortTypeId')
    async getImportSortType(@Param('importSortTypeId') importSortTypeId: string) {
        return await this.importSortTypeService.getImportSortType(importSortTypeId);
    }

    @Get('/all')
    async getImportSortTypes() {
        return await this.importSortTypeService.getImportSortTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createImportSortType(@Body() createImportSortTypeDTO: CreateImportSortTypeDTO) {
        return await this.importSortTypeService.createImportSortType(createImportSortTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateImportSortType(@Body() updateImportSortTypeDTO: UpdateImportSortTypeDTO) {
        return await this.importSortTypeService.updateImportSortType(updateImportSortTypeDTO);
    }

}