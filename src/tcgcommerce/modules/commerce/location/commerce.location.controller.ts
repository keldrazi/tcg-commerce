import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceLocationService } from './commerce.location.service';
import { CreateCommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';

@Controller('commerce/location')
export class CommerceLocationController {

    constructor(
        private commerceLocationService: CommerceLocationService,
    ) { }
    
    @Get('/caid/:commerceAccountId')
    async getCommerceLocations(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceLocationService.getCommerceLocationsByCommerceAccountId(commerceAccountId);
    }

    @Get('/id/:commerceLocationId')
    async getCommerceLocation(@Param('commerceLocationId') commerceLocationId: string) {
        return await this.commerceLocationService.getCommerceLocationById(commerceLocationId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createCommerceLocation(@Body() createCommerceLocationDTO: CreateCommerceLocationDTO) {
        return this.commerceLocationService.createCommerceLocation(createCommerceLocationDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateCommerceLocation(@Body() updateCommerceLocationDTO: UpdateCommerceLocationDTO) {
        return this.commerceLocationService.updateCommerceLocation(updateCommerceLocationDTO);
    }
}