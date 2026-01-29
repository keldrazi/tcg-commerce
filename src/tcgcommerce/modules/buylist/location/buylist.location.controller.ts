import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistLocationDTO, UpdateBuylistLocationDTO } from './dto/buylist.location.dto';
import { BuylistLocationService } from './buylist.location.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/location')
export class BuylistLocationController {

    constructor(
        private buylistLocationService: BuylistLocationService,
    ) { }
    
    
    @Get('/id/:buylistLocationId')
    async getBuylistLocationById(@Param('buylistLocationId') buylistLocationId: string) {
        try {
            return await this.buylistLocationService.getBuylistLocationById(buylistLocationId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist location was not found');
            }   
            throw new InternalServerErrorException('Failed to get buylist location');
        }
    }

    @Get('/caid/:commerceAccountId')
    async getBuylistLocationsByCommerceAccountId(@Param('commerceAccountId') commerceAccountId: string) {
        try {
            return await this.buylistLocationService.getBuylistLocationsByCommerceAccountId(commerceAccountId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist locations');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistLocation(@Body() createBuylistLocationDTO: CreateBuylistLocationDTO) {
        try {
            return await this.buylistLocationService.createBuylistLocation(createBuylistLocationDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist location');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistLocation(@Body() updateBuylistLocationDTO: UpdateBuylistLocationDTO) {
        try {
            return await this.buylistLocationService.updateBuylistLocation(updateBuylistLocationDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist location was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist location');
        }
    }
}