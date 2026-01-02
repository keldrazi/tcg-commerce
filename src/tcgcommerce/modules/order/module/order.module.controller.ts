import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderModuleService } from './order.module.service';
import { CreateOrderModuleDTO, UpdateOrderModuleDTO } from './dto/order.module.dto';



@Controller('order/module')
export class OrderModuleController {

    constructor(
        private orderModuleService: OrderModuleService,
    ) { }
    
    @Get('/all')
    async getOrderModules() {
        return await this.orderModuleService.getOrderModules();
    }

    @Get('/:orderModuleId')
    async getOrderModule(@Param('orderModuleId') orderModuleId: string) {
        return await this.orderModuleService.getOrderModule(orderModuleId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createOrderModule(@Body() createOrderModuleDTO: CreateOrderModuleDTO) {
        return this.orderModuleService.createOrderModule(createOrderModuleDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateOrderModule(@Body() updateOrderModuleDTO: UpdateOrderModuleDTO) {
        return this.orderModuleService.updateOrderModule(updateOrderModuleDTO);
    }

}