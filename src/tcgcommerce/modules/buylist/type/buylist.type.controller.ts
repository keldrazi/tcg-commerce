import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistTypeDTO, UpdateBuylistTypeDTO } from './dto/buylist.type.dto';
import { BuylistTypeService } from './buylist.type.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/type')
export class BuylistTypeController {

    constructor(
        private buylistTypeService: BuylistTypeService,
    ) { }
    
    
    @Get('/id/:buylistTypeId')
    async getBuylistTypeById(@Param('buylistTypeId') buylistTypeId: string) {
        try {
            return await this.buylistTypeService.getBuylistTypeById(buylistTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist type was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist type');
        }
    }

    @Get()
    async getBuylistTypes() {
        try {
            return await this.buylistTypeService.getBuylistTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistType(@Body() createBuylistTypeDTO: CreateBuylistTypeDTO) {
        try {
            return await this.buylistTypeService.createBuylistType(createBuylistTypeDTO);
        } catch (e) {
            if( e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistType(@Body() updateBuylistTypeDTO: UpdateBuylistTypeDTO) {
        try {
            return await this.buylistTypeService.updateBuylistType(updateBuylistTypeDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist type was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist type');
        }
    }

}