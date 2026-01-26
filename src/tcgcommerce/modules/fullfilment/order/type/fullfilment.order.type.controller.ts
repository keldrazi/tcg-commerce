import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateFullfilmentOrderTypeDTO, UpdateFullfilmentOrderTypeDTO } from './dto/fullfilment.order.type.dto';
import { FullfilmentOrderTypeService } from './fullfilment.order.type.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('fullfilment/order/type')
export class FullfilmentOrderTypeController {

    constructor(
        private fullfilmentOrderTypeService: FullfilmentOrderTypeService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderTypeId')
    async getFullfilmentOrderTypeById(@Param('fullfilmentOrderTypeId') fullfilmentOrderTypeId: string) {
        try {
            return await this.fullfilmentOrderTypeService.getFullfilmentOrderTypeById(fullfilmentOrderTypeId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment order type not found');
            }
            throw new InternalServerErrorException('Failed to get fullfilment order type');
        }
    }

    @Get()
    async getFullfilmentOrderTypes() {
        try {
            return await this.fullfilmentOrderTypeService.getFullfilmentOrderTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get fullfilment order types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createFullfilmentOrderType(@Body() createFullfilmentOrderTypeDTO: CreateFullfilmentOrderTypeDTO) {
        try {
            return await this.fullfilmentOrderTypeService.createFullfilmentOrderType(createFullfilmentOrderTypeDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create fullfilment order type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateFullfilmentOrderType(@Body() updateFullfilmentOrderTypeDTO: UpdateFullfilmentOrderTypeDTO) {
        try {
            return await this.fullfilmentOrderTypeService.updateFullfilmentOrderType(updateFullfilmentOrderTypeDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('Fullfilment order type not found');
            }
            throw new InternalServerErrorException('Failed to update fullfilment order type');
        }
    }

}