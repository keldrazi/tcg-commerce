import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPaymentTypeDTO, UpdateBuylistPaymentTypeDTO } from './dto/buylist.payment.type.dto';
import { BuylistPaymentTypeService } from './buylist.payment.type.service';

@Controller('buylist/payment/type')
export class BuylistPaymentTypeController {

    constructor(
        private buylistPaymentTypeService: BuylistPaymentTypeService,
    ) { }
    
    
    @Get('/id/:buylistPaymentTypeId')
    async getBuylistPaymentTypeById(@Param('buylistPaymentTypeId') buylistPaymentTypeId: string) {
        return await this.buylistPaymentTypeService.getBuylistPaymentTypeById(buylistPaymentTypeId);
    }

    @Get()
    async getBuylistPaymentTypes() {
        return await this.buylistPaymentTypeService.getBuylistPaymentTypes();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPaymentType(@Body() createBuylistPaymentTypeDTO: CreateBuylistPaymentTypeDTO) {
        return await this.buylistPaymentTypeService.createBuylistPaymentType(createBuylistPaymentTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPaymentType(@Body() updateBuylistPaymentTypeDTO: UpdateBuylistPaymentTypeDTO) {
        return await this.buylistPaymentTypeService.updateBuylistPaymentType(updateBuylistPaymentTypeDTO);
    }

}