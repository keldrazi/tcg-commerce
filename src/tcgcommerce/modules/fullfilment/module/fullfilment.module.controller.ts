import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FullfilmentModuleService } from './fullfilment.module.service';
import { CreateFullfilmentModuleDTO, UpdateFullfilmentModuleDTO } from './dto/fullfilment.module.dto';



@Controller('fullfilment/module')
export class FullfilmentModuleController {

    constructor(
        private fullfilmentModuleService: FullfilmentModuleService,
    ) { }
    
    @Get()
    async getFullfilmentModules() {
        return await this.fullfilmentModuleService.getFullfilmentModules();
    }

    @Get('/:fullfilmentModuleId')
    async getFullfilmentModule(@Param('fullfilmentModuleId') fullfilmentModuleId: string) {
        return await this.fullfilmentModuleService.getFullfilmentModule(fullfilmentModuleId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createFullfilmentModule(@Body() createFullfilmentModuleDTO: CreateFullfilmentModuleDTO) {
        return this.fullfilmentModuleService.createFullfilmentModule(createFullfilmentModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateFullfilmentModule(@Body() updateFullfilmentModuleDTO: UpdateFullfilmentModuleDTO) {
        return this.fullfilmentModuleService.updateFullfilmentModule(updateFullfilmentModuleDTO);
    }

}