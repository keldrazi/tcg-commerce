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

    @Get('/create/:productLineName')
    async createProductCardPrintingsByProductLineName(@Param('productLineName') productLineName: string) {
        return await this.productCardPrintingService.createProductCardPrintingsByProductLineName(productLineName);
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