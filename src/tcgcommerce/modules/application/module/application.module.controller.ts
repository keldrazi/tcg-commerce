import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApplicationModuleService } from './application.module.service';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO } from './dto/application.module.dto';



@Controller('application/module')
export class ApplicationModuleController {

    constructor(
        private applicationModuleService: ApplicationModuleService,
    ) { }
    
    @Get('/all')
    async getApplicationModules() {
        return await this.applicationModuleService.getApplicationModules();
    }

    @Get('/:moduleId')
    async getApplicationModule(@Param('applicationModuleId') applicatioModuleId: string) {
        return await this.applicationModuleService.getApplicationModule(applicatioModuleId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createApplicationModule(@Body() createApplicationModuleDTO: CreateApplicationModuleDTO) {
        return this.applicationModuleService.createApplicationModule(createApplicationModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateApplicationModule(@Body() updateApplicationModuleDTO: UpdateApplicationModuleDTO) {
        return this.applicationModuleService.updateApplicationModule(updateApplicationModuleDTO);
    }

}