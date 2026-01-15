import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFullfilmentOrderTypeDTO, UpdateFullfilmentOrderTypeDTO } from './dto/fullfilment.order.type.dto';
import { FullfilmentOrderTypeService } from './fullfilment.order.type.service';

@Controller('fullfilment/order/type')
export class FullfilmentOrderTypeController {

    constructor(
        private fullfilmentOrderTypeService: FullfilmentOrderTypeService,
    ) { }
    
    
    @Get('/id/:fullfilmentOrderTypeId')
    async getFullfilmentOrderTypeById(@Param('fullfilmentOrderTypeId') fullfilmentOrderTypeId: string) {
        return await this.fullfilmentOrderTypeService.getFullfilmentOrderTypeById(fullfilmentOrderTypeId);
    }

    @Get()
    async getFullfilmentOrderTypes() {
        return await this.fullfilmentOrderTypeService.getFullfilmentOrderTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createFullfilmentOrderType(@Body() createFullfilmentOrderTypeDTO: CreateFullfilmentOrderTypeDTO) {
        return await this.fullfilmentOrderTypeService.createFullfilmentOrderType(createFullfilmentOrderTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateFullfilmentOrderType(@Body() updateFullfilmentOrderTypeDTO: UpdateFullfilmentOrderTypeDTO) {
        return await this.fullfilmentOrderTypeService.updateFullfilmentOrderType(updateFullfilmentOrderTypeDTO);
    }

}