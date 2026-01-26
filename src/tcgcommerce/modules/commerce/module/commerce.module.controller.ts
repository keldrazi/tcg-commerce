import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CommerceModuleService } from './commerce.module.service';
import { CreateCommerceModuleDTO, UpdateCommerceModuleDTO } from './dto/commerce.module.dto';
import { EntityNotFoundError } from 'typeorm';


@Controller('commerce/module')
export class CommerceModuleController {

    constructor(
        private commerceModuleService: CommerceModuleService,
    ) { }
    
    @Get()
    async getCommerceModules() {
        try {
            return await this.commerceModuleService.getCommerceModules();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get commerce modules');
        }
    }

    @Get('/id/:commerceModuleId')
    async getCommerceModuleById(@Param('commerceModuleId') commerceModuleId: string) {
        try {
            return await this.commerceModuleService.getCommerceModuleById(commerceModuleId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce module not found');
            }
            throw new InternalServerErrorException('Failed to get commerce module');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getCommerceModuleByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceModuleService.getCommerceModuleByCommerceAccountId(commerceAccountId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce module not found');
            }
            throw new InternalServerErrorException('Failed to get commerce module');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceModule(@Body() createCommerceModuleDTO: CreateCommerceModuleDTO) {
        try {
            return await this.commerceModuleService.createCommerceModule(createCommerceModuleDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create commerce module');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceModule(@Body() updateCommerceModuleDTO: UpdateCommerceModuleDTO) {
        try {
            return await this.commerceModuleService.updateCommerceModule(updateCommerceModuleDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce module not found');
            }
            throw new InternalServerErrorException('Failed to update commerce module');
        }
    }

}