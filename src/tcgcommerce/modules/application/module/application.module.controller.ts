import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { ApplicationModuleService } from './application.module.service';
import { CreateApplicationModuleDTO, UpdateApplicationModuleDTO } from './dto/application.module.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('application/module')
export class ApplicationModuleController {

    constructor(
        private applicationModuleService: ApplicationModuleService,
    ) { }
    
    @Get()
    async getApplicationModules() {
        try {
            return await this.applicationModuleService.getApplicationModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get application modules');
        }
    }

    @Get('/id/:applicationModuleId')
    async getApplicationModuleById(@Param('applicationModuleId') applicationModuleId: string) {
        try {
            return await this.applicationModuleService.getApplicationModuleById(applicationModuleId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Application module not found');
            }
            throw new InternalServerErrorException('Failed to get application module');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createApplicationModule(@Body() createApplicationModuleDTO: CreateApplicationModuleDTO) {
        try {
            return await this.applicationModuleService.createApplicationModule(createApplicationModuleDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create application module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateApplicationModule(@Body() updateApplicationModuleDTO: UpdateApplicationModuleDTO) {
        try {
            return await this.applicationModuleService.updateApplicationModule(updateApplicationModuleDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Application module not found');
            }
            throw new InternalServerErrorException('Failed to update application module');
        }
    }

}