import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceLocationService } from './commerce.location.service';
import { CreateCommerceLocationDTO, UpdateCommerceLocationDTO } from './dto/commerce.location.dto';

@Controller('commerce/location')
export class CommerceLocationController {

    constructor(
        private commerceLocationService: CommerceLocationService,
    ) { }
    
    @Get('/all/:commerceAccountId')
    async getCommerceLocations(@Param('commerceAccountId') commerceAccountId: string) {
        return await this.commerceLocationService.getCommerceLocations(commerceAccountId);
    }

    @Get('/:commerceLocationId')
    async getCommerceLocation(@Param('commerceLocationId') commerceLocationId: string) {
        return await this.commerceLocationService.getCommerceLocation(commerceLocationId);
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