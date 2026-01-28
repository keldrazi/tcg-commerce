import { Controller, Get, Post, Body, Put, Param, UsePipes, ValidationPipe, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductCardPrintingDTO, UpdateProductCardPrintingDTO } from './dto/product.card.printing.dto';
import { ProductCardPrintingService } from './product.card.printing.service';
import { EntityNotFoundError } from 'typeorm';


@Controller('product/card/printing')
export class ProductCardPrintingController {

    constructor(
        private productCardPrintingService: ProductCardPrintingService,
    ) { }
    
    
    @Get()
    async getProductCardPrintings() {
        try {
            return await this.productCardPrintingService.getProductCardPrintings();
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product card printings');
        }
    }

    @Get('/plc/:productLineCode')
    async getProductCardPrintingsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardPrintingService.getProductCardPrintingsByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to get product card printings by product line code');
        }
    }
    
    @Post('/create/:productLineCode')
    async createProductCardPrintingsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        try {
            return await this.productCardPrintingService.createProductCardPrintingsByProductLineCode(productLineCode.toUpperCase());
        } catch (e) {
            throw new InternalServerErrorException('Failed to create product card printings by product line code');
        }
    }  

    @Post('/create')
    @UsePipes(new ValidationPipe())
    async createProductCardPrinting(@Body() createProductCardPrintingDTO: CreateProductCardPrintingDTO) {
        try {
            return await this.productCardPrintingService.createProductCardPrinting(createProductCardPrintingDTO);
        } catch (e) {
            if(e instanceof ConflictException) {
                throw e;
            }
            throw new InternalServerErrorException('Failed to create product card printing');
        }
    }

    @Put('/update')
    @UsePipes(new ValidationPipe())
    async updateProductCardPrinting(@Body() updateProductCardPrintingDTO: UpdateProductCardPrintingDTO) {
        try {
            return await this.productCardPrintingService.updateProductCardPrinting(updateProductCardPrintingDTO);
        } catch (e) {
            if(e instanceof EntityNotFoundError) {
                throw new NotFoundException('Product card printing not found');
            }
            throw new InternalServerErrorException('Failed to update product card printing');
        }
    }


}