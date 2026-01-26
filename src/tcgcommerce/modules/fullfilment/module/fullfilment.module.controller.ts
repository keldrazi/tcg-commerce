import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { FullfilmentModuleService } from './fullfilment.module.service';
import { CreateFullfilmentModuleDTO, UpdateFullfilmentModuleDTO } from './dto/fullfilment.module.dto';
import { EntityNotFoundError } from 'typeorm';



@Controller('fullfilment/module')
export class FullfilmentModuleController {

    constructor(
        private fullfilmentModuleService: FullfilmentModuleService,
    ) { }
    
    @Get()
    async getFullfilmentModules() {
        try {
            return await this.fullfilmentModuleService.getFullfilmentModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get fullfilment modules');
        }
    }

    @Get('/:fullfilmentModuleId')
    async getFullfilmentModule(@Param('fullfilmentModuleId') fullfilmentModuleId: string) {
        try {
            return await this.fullfilmentModuleService.getFullfilmentModule(fullfilmentModuleId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment module not found');
            }
            throw new InternalServerErrorException('Failed to get fullfilment module');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createFullfilmentModule(@Body() createFullfilmentModuleDTO: CreateFullfilmentModuleDTO) {
        try {
            return await this.fullfilmentModuleService.createFullfilmentModule(createFullfilmentModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create fullfilment module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateFullfilmentModule(@Body() updateFullfilmentModuleDTO: UpdateFullfilmentModuleDTO) {
        try {
            return await this.fullfilmentModuleService.updateFullfilmentModule(updateFullfilmentModuleDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment module not found');
            }
            throw new InternalServerErrorException('Failed to update fullfilment module');
        }
    }

}