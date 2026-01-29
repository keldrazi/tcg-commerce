import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { CreateBuylistPaymentTypeDTO, UpdateBuylistPaymentTypeDTO } from './dto/buylist.payment.type.dto';
import { BuylistPaymentTypeService } from './buylist.payment.type.service';
import { EntityNotFoundError } from 'typeorm/browser/error/index.js';

@Controller('buylist/payment/type')
export class BuylistPaymentTypeController {

    constructor(
        private buylistPaymentTypeService: BuylistPaymentTypeService,
    ) { }
    
    
    @Get('/id/:buylistPaymentTypeId')
    async getBuylistPaymentTypeById(@Param('buylistPaymentTypeId') buylistPaymentTypeId: string) {
        try {
            return await this.buylistPaymentTypeService.getBuylistPaymentTypeById(buylistPaymentTypeId);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist payment type was not found');
            }
            throw new InternalServerErrorException('Failed to get buylist payment type');
        }
    }

    @Get()
    async getBuylistPaymentTypes() {
        try {
            return await this.buylistPaymentTypeService.getBuylistPaymentTypes();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get buylist payment types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createBuylistPaymentType(@Body() createBuylistPaymentTypeDTO: CreateBuylistPaymentTypeDTO) {
        try {
            return await this.buylistPaymentTypeService.createBuylistPaymentType(createBuylistPaymentTypeDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create buylist payment type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateBuylistPaymentType(@Body() updateBuylistPaymentTypeDTO: UpdateBuylistPaymentTypeDTO) {
        try {
            return await this.buylistPaymentTypeService.updateBuylistPaymentType(updateBuylistPaymentTypeDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Buylist payment type was not found');
            }
            throw new InternalServerErrorException('Failed to update buylist payment type');
        }
    }

}