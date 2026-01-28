import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { POSModuleService } from './pos.module.service';
import { CreatePOSModuleDTO, UpdatePOSModuleDTO } from './dto/pos.module.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('pos/module')
export class POSModuleController {

    constructor(
        private posModuleService: POSModuleService,
    ) { }
    
    @Get()
    async getPOSModules() {
        try {
            return await this.posModuleService.getPOSModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get POS modules');
        }
    }

    @Get('/id/:posModuleId')
    async getPOSModuleById(@Param('posModuleId') posModuleId: string) {
        try {
            return await this.posModuleService.getPOSModule(posModuleId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS module not found');
            }
            throw new InternalServerErrorException('Failed to get POS module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getPOSModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.posModuleService.getPOSModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS module not found');
            }
            throw new InternalServerErrorException('Failed to get POS module by commerce account');
        }
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createPOSModule(@Body() createPOSModuleDTO: CreatePOSModuleDTO) {
        try {
            return await this.posModuleService.createPOSModule(createPOSModuleDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create POS module');
        }
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updatePOSModule(@Body() updatePOSModuleDTO: UpdatePOSModuleDTO) {
        try {
            return await this.posModuleService.updatePOSModule(updatePOSModuleDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS module not found');
            }
            throw new InternalServerErrorException('Failed to update POS module');
        }
    }

}