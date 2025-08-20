import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateImportSortCardTypeDTO, UpdateImportSortCardTypeDTO, ImportSortCardTypeDTO } from './dto/import.sort.card.type.dto';
import { ImportSortCardTypeService } from './import.sort.card.type.service';



@Controller('import/sort/card/type')
export class ImportSortCardTypeController {

    constructor(
        private importSortCardTypeService: ImportSortCardTypeService,
    ) { }
    
    
    @Get('/id/:importSortCardTypeId')
    async getImportSortCardType(@Param('importSortCardTypeId') importSortCardTypeId: string) {
        return await this.importSortCardTypeService.getImportSortCardType(importSortCardTypeId);
    }

    @Get('/all')
    async getImportSortCardTypes() {
        return await this.importSortCardTypeService.getImportSortCardTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createImportSortCardType(@Body() createImportSortTypeDTO: CreateImportSortCardTypeDTO) {
        return await this.importSortCardTypeService.createImportSortCardType(createImportSortTypeDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateImportSortCardType(@Body() updateImportSortTypeDTO: UpdateImportSortCardTypeDTO) {
        return await this.importSortCardTypeService.updateImportSortCardType(updateImportSortTypeDTO);
    }

}