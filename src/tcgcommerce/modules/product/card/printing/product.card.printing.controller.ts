import { Controller, Get, Post, Body, Put, Param, ParseIntPipe, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCardPrintingDTO, UpdateProductCardPrintingDTO, ProductCardPrintingDTO } from './dto/product.card.printing.dto';
import { ProductCardPrintingService } from './product.card.printing.service';

@Controller('product/card/printing')
export class ProductCardPrintingController {

    constructor(
        private productCardPrintingService: ProductCardPrintingService,
    ) { }
    
    
    @Get()
    async getProductCardPrintings() {
        return await this.productCardPrintingService.getProductCardPrintings();
    }

    @Get('/linecode/:productLineCode')
    async getProductCardPrintingsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardPrintingService.getProductCardPrintingsByProductLineCode(productLineCode.toUpperCase());
    }
    
    @Get('/create/:productLineCode')
    async createProductCardPrintingsByProductLineCode(@Param('productLineCode') productLineCode: string) {
        return await this.productCardPrintingService.createProductCardPrintingsByProductLineCode(productLineCode.toUpperCase());
    }  

    @Post()
    @UsePipes(new ValidationPipe())
    async createProductCardPrinting(@Body() createProductCardPrintingDTO: CreateProductCardPrintingDTO) {
        return await this.productCardPrintingService.createProductCardPrinting(createProductCardPrintingDTO);
    }

    @Put()
    @UsePipes(new ValidationPipe())
    async updateProductCardPrinting(@Body() updateProductCardPrintingDTO: UpdateProductCardPrintingDTO) {
        return await this.productCardPrintingService.updateProductCardPrinting(updateProductCardPrintingDTO);
    }


}