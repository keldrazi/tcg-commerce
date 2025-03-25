import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommerceLocationService } from './commerce.module.service';
import { CreateCommerceLocationDTO } from './dto/commerce.module.dto';



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

    @Post()
    @UsePipes(new ValidationPipe())
    async createCommerceLocation(@Body() createCommerceLocationDTO: CreateCommerceLocationDTO) {
        return this.commerceLocationService.createCommerceLocation(createCommerceLocationDTO);
    }

}