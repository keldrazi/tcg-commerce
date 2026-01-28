import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreatePOSVendorOptionPriceTypeDTO, UpdatePOSVendorOptionPriceTypeDTO } from './dto/pos.vendor.option.price.type.dto';
import { POSVendorOptionPriceTypeService } from './pos.vendor.option.price.type.service';
import { EntityNotFoundError } from 'typeorm';

@Controller('pos/vendor/option/price/type')
export class POSVendorOptionPriceTypeController {

    constructor(
        private posVendorOptionPriceTypeService: POSVendorOptionPriceTypeService,
    ) { }
    
    
    @Get('/id/:posVendorOptionPriceTypeId')
    async getPOSVendorOptionPriceType(@Param('posVendorOptionPriceTypeId') posVendorOptionPriceTypeId: string) {
        try {
            return await this.posVendorOptionPriceTypeService.getPOSVendorOptionPriceType(posVendorOptionPriceTypeId);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS vendor option price type was not found');
            }
            throw new InternalServerErrorException('Failed to get POS vendor option price type');
        }
    }

    @Get('/:posVendorId')
    async getPOSVendorOptionPriceTypes(@Param('posVendorId') posVendorId: string) {
        try {
            return await this.posVendorOptionPriceTypeService.getPOSVendorOptionPriceTypes(posVendorId);
        } catch (e) {
            throw new InternalServerErrorException('Failed to get POS vendor option price types');
        }
    }

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createPOSVendorOptionPriceType(@Body() createPOSVendorOptionPriceTypeDTO: CreatePOSVendorOptionPriceTypeDTO) {
        try {
            return await this.posVendorOptionPriceTypeService.createPOSVendorOptionPriceType(createPOSVendorOptionPriceTypeDTO);
        } catch (e) {
            if (e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create POS vendor option price type');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updatePOSVendorOptionPriceType(@Body() updatePOSVendorOptionPriceTypeDTO: UpdatePOSVendorOptionPriceTypeDTO) {
        try {
            return await this.posVendorOptionPriceTypeService.updatePOSVendorOptionPriceType(updatePOSVendorOptionPriceTypeDTO);
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                throw new NotFoundException('POS vendor option price type was not found');
            }
            throw new InternalServerErrorException('Failed to update POS vendor option price type');
        }
    }

    

}