import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePOSVendorDTO, UpdatePOSVendorDTO, POSVendorDTO } from './dto/pos.vendor.dto';
import { POSVendorService } from './pos.vendor.service';

@Controller('pos/vendor')
export class POSVendorController {

    constructor(
        private posVendorService: POSVendorService,
    ) { }
    
    
    @Get('/id/:posVendorId')
    async getPOSVendor(@Param('posVendorId') posVendorId: string) {
        return await this.posVendorService.getPOSVendor(posVendorId);
    }

    @Get('/all')
    async getPOSVendors() {
        return await this.posVendorService.getPOSVendors();
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPOSVendor(@Body() createPOSVendorDTO: CreatePOSVendorDTO) {
        return await this.posVendorService.createPOSVendor(createPOSVendorDTO);
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePOSVendor(@Body() updatePOSVendorDTO: UpdatePOSVendorDTO) {
        return await this.posVendorService.updatePOSVendor(updatePOSVendorDTO);
    }

    

}