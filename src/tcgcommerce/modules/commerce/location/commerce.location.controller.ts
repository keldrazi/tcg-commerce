import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CommerceLocationService } from './commerce.location.service';
import { CreateCommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('commerce/location')
export class CommerceLocationController {

    constructor(
        private commerceLocationService: CommerceLocationService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceLocations(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.commerceLocationService.getCommerceLocationsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get commerce locations');
        }
    }

    @Get('/id/:commerceLocationId')
    async getCommerceLocation(@Param('commerceLocationId') commerceLocationId: string) {
        try {
            return await this.commerceLocationService.getCommerceLocationById(commerceLocationId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce location not found');
            }
            throw new InternalServerErrorException('Failed to get commerce location');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceLocation(@Body() createCommerceLocationDTO: CreateCommerceLocationDTO) {
        try {
            return await this.commerceLocationService.createCommerceLocation(createCommerceLocationDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create commerce location');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceLocation(@Body() updateCommerceLocationDTO: UpdateCommerceLocationDTO) {
        try {
            return await this.commerceLocationService.updateCommerceLocation(updateCommerceLocationDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Commerce location not found');
            }
            throw new InternalServerErrorException('Failed to update commerce location');
        }
    }
}