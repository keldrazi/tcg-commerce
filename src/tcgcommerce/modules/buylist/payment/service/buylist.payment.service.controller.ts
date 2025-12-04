import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBuylistPaymentServiceDTO, UpdateBuylistPaymentServiceDTO } from './dto/buylist.payment.service.dto';
import { BuylistPaymentServiceService } from './buylist.payment.service.service';

@Controller('buylist/payment/service')
export class BuylistPaymentServiceController {

    constructor(
        private buylistPaymentServiceService: BuylistPaymentServiceService,
    ) { }
    
    
    @Get('/id/:buylistPaymentServiceId')
    async getBuylistPaymentServiceById(@Param('buylistPaymentServiceId') buylistPaymentServiceId: string) {
        return await this.buylistPaymentServiceService.getBuylistPaymentServiceById(buylistPaymentServiceId);
    }

    @Get('/all')
    async getBuylistPaymentServices() {
        return await this.buylistPaymentServiceService.getBuylistPaymentServices();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPaymentService(@Body() createBuylistPaymentServiceDTO: CreateBuylistPaymentServiceDTO) {
        return await this.buylistPaymentServiceService.createBuylistPaymentService(createBuylistPaymentServiceDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPaymentService(@Body() updateBuylistPaymentServiceDTO: UpdateBuylistPaymentServiceDTO) {
        return await this.buylistPaymentServiceService.updateBuylistPaymentService(updateBuylistPaymentServiceDTO);
    }

}