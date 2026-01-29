import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateBuylistPaymentServiceDTO, UpdateBuylistPaymentServiceDTO } from './dto/buylist.payment.service.dto';
import { BuylistPaymentServiceService } from './buylist.payment.service.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('buylist/payment/service')
export class BuylistPaymentServiceController {

    constructor(
        private buylistPaymentServiceService: BuylistPaymentServiceService,
    ) { }
    
    
    @Get('/id/:buylistPaymentServiceId')
    async getBuylistPaymentServiceById(@Param('buylistPaymentServiceId') buylistPaymentServiceId: string) {
        try {
            return await this.buylistPaymentServiceService.getBuylistPaymentServiceById(buylistPaymentServiceId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist payment service was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist payment service');
        }
    }

    @Get()
    async getBuylistPaymentServices() {
        try {
            return await this.buylistPaymentServiceService.getBuylistPaymentServices();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist payment services');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPaymentService(@Body() createBuylistPaymentServiceDTO: CreateBuylistPaymentServiceDTO) {
        try {
            return await this.buylistPaymentServiceService.createBuylistPaymentService(createBuylistPaymentServiceDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist payment service');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPaymentService(@Body() updateBuylistPaymentServiceDTO: UpdateBuylistPaymentServiceDTO) {
        try {
            return await this.buylistPaymentServiceService.updateBuylistPaymentService(updateBuylistPaymentServiceDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist payment service was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist payment service');
        }
    }
}