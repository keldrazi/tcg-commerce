import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApplicationModuleService } from './application.module.service';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO } from './dto/application.module.dto';

@Controller('application/module')
export class ApplicationModuleController {

    constructor(
        private applicationModuleService: ApplicationModuleService,
    ) { }
    
    @Get()
    async getApplicationModules() {
        return await this.applicationModuleService.getApplicationModules();
    }

    @Get('id/:applicationModuleId')
    async getApplicationModuleById(@Param('applicationModuleId') applicationModuleId: string) {
        return await this.applicationModuleService.getApplicationModuleById(applicationModuleId);
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