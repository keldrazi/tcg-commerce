import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreatePOSVendorDTO, UpdatePOSVendorDTO, POSVendorDTO } from './dto/pos.vendor.dto';
import { POSVendorService } from './pos.vendor.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('pos/vendor')
export class POSVendorController {

    constructor(
        private posVendorService: POSVendorService,
    ) { }
    
    
    @Get('/id/:posVendorId')
    async getPOSVendor(@Param('posVendorId') posVendorId: string) {
        try {
            return await this.posVendorService.getPOSVendor(posVendorId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS vendor was not found');
            }
            throw new InternalServerErrorException('Failed to get POS vendor');
        }
    }

    @Get()
    async getPOSVendors() {
        try {
            return await this.posVendorService.getPOSVendors();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get POS vendors');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPOSVendor(@Body() createPOSVendorDTO: CreatePOSVendorDTO) {
        try {
            return await this.posVendorService.createPOSVendor(createPOSVendorDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create POS vendor');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePOSVendor(@Body() updatePOSVendorDTO: UpdatePOSVendorDTO) {
        try {
            return await this.posVendorService.updatePOSVendor(updatePOSVendorDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS vendor was not found');
            }
            throw new InternalServerErrorException('Failed to update POS vendor');
        }
    }

    

}