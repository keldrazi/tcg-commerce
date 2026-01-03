import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePOSVendorOptionPriceTypeDTO, UpdatePOSVendorOptionPriceTypeDTO } from './dto/pos.vendor.option.price.type.dto';
import { POSVendorOptionPriceTypeService } from './pos.vendor.option.price.type.service';

@Controller('pos/vendor/option/price/type')
export class POSVendorOptionPriceTypeController {

    constructor(
        private posVendorOptionPriceTypeService: POSVendorOptionPriceTypeService,
    ) { }
    
    
    @Get('/id/:posVendorOptionPriceTypeId')
    async getPOSVendorOptionPriceType(@Param('posVendorOptionPriceTypeId') posVendorOptionPriceTypeId: string) {
        return await this.posVendorOptionPriceTypeService.getPOSVendorOptionPriceType(posVendorOptionPriceTypeId);
    }

    @Get('/all/:posVendorId')
    async getPOSVendorOptionPriceTypes(@Param('posVendorId') posVendorId: string) {
        return await this.posVendorOptionPriceTypeService.getPOSVendorOptionPriceTypes(posVendorId);
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPOSVendorOptionPriceType(@Body() createPOSVendorOptionPriceTypeDTO: CreatePOSVendorOptionPriceTypeDTO) {
        return await this.posVendorOptionPriceTypeService.createPOSVendorOptionPriceType(createPOSVendorOptionPriceTypeDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePOSVendorOptionPriceType(@Body() updatePOSVendorOptionPriceTypeDTO: UpdatePOSVendorOptionPriceTypeDTO) {
        return await this.posVendorOptionPriceTypeService.updatePOSVendorOptionPriceType(updatePOSVendorOptionPriceTypeDTO);
    }

    

}