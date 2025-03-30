import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImportModuleService } from './import.module.service';
import { CreateImportModuleDTO, UpdateImportModuleDTO } from './dto/import.module.dto';



@Controller('import/module')
export class ImportModuleController {

    constructor(
        private importModuleService: ImportModuleService,
    ) { }
    
    @Get('/all')
    async getImportModules() {
        return await this.importModuleService.getImportModules();
    }

    @Get('/:importModuleId')
    async getImportModule(@Param('importModuleId') importModuleId: string) {
        return await this.importModuleService.getImportModule(importModuleId);
    }

    @Get('/commerceAccount/:commerceAccountId')
    async getImportModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.importModuleService.getImportModuleByCommerceAccountId(commerceAccountId);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createImportModule(@Body() createImportModuleDTO: CreateImportModuleDTO) {
        return this.importModuleService.createImportModule(createImportModuleDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateImportModule(@Body() updateImportModuleDTO: UpdateImportModuleDTO) {
        return this.importModuleService.updateImportModule(updateImportModuleDTO);
    }

}