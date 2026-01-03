import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePOSVendorOptionPriceDTO, UpdatePOSVendorOptionPriceDTO } from './dto/pos.vendor.option.price.dto';
import { POSVendorOptionPriceService } from './pos.vendor.option.price.service';

@Controller('pos/vendor/option/price')
export class POSVendorOptionPriceController {

    constructor(
        private posVendorOptionPriceService: POSVendorOptionPriceService,
    ) { }
    
    
    @Get('/id/:posVendorOptionPriceId')
    async getPOSVendorOptionPrice(@Param('posVendorOptionPriceId') posVendorOptionPriceId: string) {
        return await this.posVendorOptionPriceService.getPOSVendorOptionPrice(posVendorOptionPriceId);
    }

    @Get('/all/:posVendorId')
    async getPOSVendorOptionPrices(@Param('posVendorId') posVendorId: string) {
        return await this.posVendorOptionPriceService.getPOSVendorOptionPrices(posVendorId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPOSVendorOptionPrice(@Body() createPOSVendorOptionPriceDTO: CreatePOSVendorOptionPriceDTO) {
        return await this.posVendorOptionPriceService.createPOSVendorOptionPrice(createPOSVendorOptionPriceDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePOSVendorOptionPrice(@Body() updatePOSVendorOptionPriceDTO: UpdatePOSVendorOptionPriceDTO) {
        return await this.posVendorOptionPriceService.updatePOSVendorOptionPrice(updatePOSVendorOptionPriceDTO);
    }

    

}