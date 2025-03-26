import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApplicationModuleService } from './application.module.service';
import { CreateApplicationModuleDTO } from './dto/application.module.dto';



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

    @Post()
    @UsePipes(new ValidationPipe())
    async createApplicationModule(@Body() createApplicationModuleDTO: CreateApplicationModuleDTO) {
        return this.applicationModuleService.createApplicationModule(createApplicationModuleDTO);
    }

}